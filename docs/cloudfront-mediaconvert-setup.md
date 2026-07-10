# Hướng dẫn cấu hình CloudFront + MediaConvert (HLS) cho LearnOva  

Trước hết cần install winget: https://apps.microsoft.com/detail/9nblggh4nns1?hl=en-US&gl=VN  
Install openSSL: winget install -e --id ShiningLight.OpenSSL.Light

Tài liệu này hướng dẫn từng bước thao tác trên **AWS Console/CLI** để hoàn thiện 2 phần hạ tầng:

1. **CloudFront** đứng trước S3 — cache + tăng tốc phát video/ảnh, giữ bucket S3 hoàn toàn private, chỉ phục vụ qua Signed URL.
2. **MediaConvert** — encode video sang **HLS adaptive streaming** (nhiều mức chất lượng 1080p/720p/480p), giải quyết vấn đề video bitrate cao load chậm hơn hẳn so với video bitrate thấp.

Phần code (backend Java, frontend React) đã có sẵn trong repo. Tài liệu này **chỉ tập trung vào phần thao tác Console/CLI** để cấp đủ hạ tầng AWS cho code chạy được.

> Yêu cầu trước khi bắt đầu: đã cài [AWS CLI v2](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) và chạy `aws configure` với user/role có đủ quyền IAM, S3, CloudFront, MediaConvert.

---

## Phần 1 — CloudFront

### Bước 1.1 — Tạo cặp khóa RSA để ký URL

CloudFront không tự sinh private key, cần tự tạo bằng OpenSSL (chạy local, **không commit hay upload private key lên đâu cả**):

```bash
openssl genrsa -out cloudfront-private-key.pem 2048
openssl rsa -pubout -in cloudfront-private-key.pem -out cloudfront-public-key.pem
```

Backend dùng AWS SDK v2 (`CloudFrontUtilities`) để ký URL, SDK này yêu cầu private key ở định dạng **PKCS#8**, không phải PKCS#1 mặc định của `openssl genrsa`. Convert thêm 1 bước:

```bash
openssl pkcs8 -topk8 -nocrypt -in cloudfront-private-key.pem -out cloudfront-private-key-pkcs8.pem
```

Giữ file `cloudfront-private-key-pkcs8.pem` an toàn trên server chạy backend (ngoài repo git).

### Bước 1.2 — Upload Public Key & tạo Key Group

1. **CloudFront Console → Public keys → Create public key**.
   - Dán nội dung file `cloudfront-public-key.pem`.
   - Đặt tên, ví dụ `learnova-signing-key`.
   - Lưu lại **Key ID** hiện ra sau khi tạo — đây là giá trị cho biến `CLOUDFRONT_KEY_PAIR_ID`.
2. **CloudFront Console → Key groups → Create key group**.
   - Đặt tên, ví dụ `learnova-key-group`.
   - Chọn public key vừa tạo.

### Bước 1.3 — Tạo Origin Access Control (OAC)

1. **CloudFront Console → Origin access → Create control setting**.
2. Chọn loại **S3**, đặt tên (vd `learnova-s3-oac`), giữ mặc định "Sign requests".

### Bước 1.4 — Tạo CloudFront Distribution

1. **CloudFront Console → Distributions → Create distribution**.
2. **Origin domain**: chọn bucket S3 hiện tại (REST endpoint, không phải static-website endpoint).
3. **Origin access**: chọn **Origin access control settings** → chọn OAC ở Bước 1.3. Console sẽ đề nghị cập nhật bucket policy — bấm **Copy policy** hoặc **Update bucket policy** để nó tự áp dụng.
4. **Viewer protocol policy**: **Redirect HTTP to HTTPS**.
5. **Allowed HTTP methods**: chỉ cần **GET, HEAD** (upload không đi qua CloudFront).
6. **Cache policy**: **CachingOptimized**.
7. **Restrict viewer access**: **Yes** → **Trusted key groups** → chọn `learnova-key-group` ở Bước 1.2. Đây là bước bắt buộc để mọi request cần chữ ký hợp lệ mới xem được.
8. Các mục khác giữ mặc định. Bấm **Create distribution**, đợi trạng thái chuyển từ "Deploying" → "Enabled" (vài phút).

### Bước 1.5 — Kiểm tra Bucket Policy

**S3 Console → chọn bucket → Permissions → Bucket policy** — xác nhận chỉ `cloudfront.amazonaws.com` (giới hạn theo `AWS:SourceArn` = ARN của distribution) được phép đọc. **Block Public Access** vẫn phải bật — bucket luôn private, chỉ CloudFront được đọc.

### Bước 1.6 — Test nhanh

```bash
curl -I "https://<distribution-domain>.cloudfront.net/<fileKey>"
```

Kỳ vọng: **403 Forbidden** với lỗi `MissingKey` — xác nhận CloudFront + OAC + Trusted key group hoạt động đúng (chặn truy cập không có chữ ký). Sau khi backend chạy và set đủ biến môi trường, backend sẽ tự sinh URL có chữ ký hợp lệ.

---

## Phần 2 — MediaConvert (HLS)

### Bước 2.1 — Tạo cặp khóa RSA (tái sử dụng ở bước encode)

Không cần khóa riêng cho MediaConvert — MediaConvert chỉ cần 1 IAM Role để đọc/ghi S3.

### Bước 2.2 — Tạo IAM Role cho MediaConvert

1. **IAM Console → Roles → Create role**.
2. **Trusted entity type**: **AWS service** → **Use case**: gõ tìm và chọn **MediaConvert**.
3. Ở bước gắn policy, bấm **Create policy** (tab mới), dán JSON sau (thay `<your-bucket-name>` bằng tên bucket S3 thật):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": ["s3:GetObject", "s3:PutObject"],
            "Resource": "arn:aws:s3:::<your-bucket-name>/*"
        }
    ]
}
```

Đặt tên policy (vd `MediaConvertS3AccessPolicy`), tạo xong quay lại tab Create role, refresh, chọn policy vừa tạo.

4. Đặt tên role, ví dụ `MediaConvertRole` → **Create role**.
5. Vào lại role → tab **Trust relationships** → xác nhận principal là `mediaconvert.amazonaws.com` (AWS tự điền đúng khi chọn use case ở bước 2).
6. Copy **ARN** của role (dạng `arn:aws:iam::<account-id>:role/MediaConvertRole`) — giá trị cho biến `MEDIACONVERT_ROLE_ARN`.

> ⚠️ Đặt tên role gì cũng được, nhưng **phải nhớ chính xác tên đó** khi set `MEDIACONVERT_ROLE_ARN` — nhầm tên role là nguyên nhân phổ biến nhất gây lỗi `ForbiddenException: The service does not have permission to assume the IAM role`.

### Bước 2.3 — Lấy MediaConvert account endpoint

Mỗi tài khoản AWS có 1 endpoint MediaConvert riêng, lấy bằng lệnh:

```bash
aws mediaconvert describe-endpoints --region <your-region>
```

Kết quả trả về dạng:
```json
{
    "Endpoints": [
        { "Url": "https://xxxxxxxx.mediaconvert.<region>.amazonaws.com" }
    ]
}
```

Giá trị `Url` này là `MEDIACONVERT_ENDPOINT`.

### Bước 2.4 — Cấp quyền IAM cho backend

User/role mà backend đang dùng để gọi AWS (cùng credential provider chain đang dùng cho S3/CloudFront) cần thêm quyền:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "mediaconvert:CreateJob",
                "mediaconvert:GetJob",
                "mediaconvert:DescribeEndpoints"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": "iam:PassRole",
            "Resource": "arn:aws:iam::<account-id>:role/MediaConvertRole"
        }
    ]
}
```

Gắn policy này vào IAM user/role của backend (**IAM Console → Users → chọn user → Add permissions → Create inline policy**, dán JSON trên, đặt tên vd `MediaConvertBackendAccess`).

### Bước 2.5 — Test nhanh (khuyến nghị trước khi chạy migrate hàng loạt)

Submit thử 1 job encode HLS thật để xác nhận Role + quyền hoạt động đúng, tránh phát hiện lỗi khi đã chạy migrate cho toàn bộ video:

```bash
aws mediaconvert create-job \
  --region <your-region> \
  --endpoint-url <MEDIACONVERT_ENDPOINT> \
  --role arn:aws:iam::<account-id>:role/MediaConvertRole \
  --settings file://job-settings.json
```

(File `job-settings.json` mẫu — input 1 video test, output 3 rendition HLS 1080p/720p/480p — có thể lấy cấu trúc y hệt logic trong `MediaConvertService.java` phần backend.)

Theo dõi job:
```bash
aws mediaconvert get-job --region <your-region> --endpoint-url <MEDIACONVERT_ENDPOINT> --id <job-id> --query "Job.Status"
```

Job `COMPLETE` → kiểm tra output trong S3 tại `s3://<bucket>/course-video-hls/<uuid>/` — sẽ thấy `index.m3u8` (master playlist), `index_1080p.m3u8`/`720p`/`480p` (variant playlist), và các file `.ts` (segment).

---

## Phần 3 — Biến môi trường cần set cho backend

| Biến | Giá trị lấy từ |
|---|---|
| `AWS_REGION` | Region đang dùng (vd `ap-southeast-1`) |
| `AWS_S3_BUCKET_NAME` | Tên bucket S3 |
| `CLOUDFRONT_DOMAIN` | Domain của CloudFront distribution (Bước 1.4) |
| `CLOUDFRONT_KEY_PAIR_ID` | Key ID của Public key (Bước 1.2) |
| `CLOUDFRONT_PRIVATE_KEY_PATH` | Đường dẫn tuyệt đối tới file `cloudfront-private-key-pkcs8.pem` trên server (Bước 1.1) |
| `MEDIACONVERT_ROLE_ARN` | ARN của IAM Role cho MediaConvert (Bước 2.2) |
| `MEDIACONVERT_ENDPOINT` | Endpoint riêng của tài khoản (Bước 2.3) |

Set xong, restart backend — Flyway sẽ tự chạy migration liên quan (thêm cột `hls_status`, `media_convert_job_id`, `hls_playlist_key` vào bảng `lessons`), không cần thao tác DB thủ công.

---

## Phần 4 — Kiểm thử end-to-end sau khi backend chạy

1. Gọi `GET /api/learnova/courses/video-url?fileKey=<key-video-cũ>` — nếu lesson đó chưa migrate HLS, sẽ trả về CloudFront Signed URL cho file MP4 gốc (bình thường, không phải lỗi).
2. Migrate toàn bộ video cũ sang HLS: gọi `POST /api/learnova/admin/hls-migration` (cần JWT hợp lệ, không phải endpoint public).
3. Đợi encode xong (theo dõi log `HlsJobStatusScheduler`, poll mỗi 30s), gọi lại `GET /courses/video-url` — sẽ trả về URL `.m3u8` (`/api/learnova/courses/hls/<uuid>/master.m3u8`).
4. Mở URL master trên trình duyệt/`curl` → xác nhận playlist hợp lệ, các dòng variant trỏ đúng endpoint proxy backend, các dòng segment trong variant là CloudFront Signed URL mở được trực tiếp.
5. Phát thử video trên trang `CourseDetail.jsx` (dùng `hls.js`) → xác nhận phát mượt, tự đổi chất lượng khi throttle băng thông (DevTools → Network → Slow 3G).
6. Upload video mới qua flow bình thường (dạy học tạo lesson mới) → xác nhận tự động trigger encode HLS mà không cần gọi lại endpoint migrate.

---

## Ghi chú / lỗi thường gặp

- **`ForbiddenException: does not have permission to assume the IAM role`**: sai tên/ARN role trong `MEDIACONVERT_ROLE_ARN`, hoặc role chưa có trust policy đúng cho `mediaconvert.amazonaws.com`. Kiểm tra lại Bước 2.2.
- **CloudFront trả `MissingKey`**: đúng hành vi khi truy cập URL chưa ký — không phải lỗi, chỉ cần backend sinh Signed URL đúng cách.
- **Video vẫn load chậm dù đã có CloudFront**: kiểm tra `X-Cache` response header — nếu là `Hit from cloudfront` thì CDN đã hoạt động đúng, nguyên nhân chậm thường là **bitrate gốc của video quá cao** (nên dùng HLS ở Phần 2 để giải quyết) chứ không phải do CDN.
- **`spring.main.web-application-type=none` làm gãy Spring Security**: nếu viết thêm tool nội bộ chạy qua Spring profile, không nên tắt hẳn web application type vì `AuthenticationManager` cần web context — thay vào đó dùng `server.port=0` để chạy ở cổng ngẫu nhiên, tránh đụng port ứng dụng chính.
