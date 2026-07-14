# HƯỚNG DẪN LẤY PAYOS KEY

Mục đích: Lấy Client ID, API Key, Checksum Key từ PayOS để tích hợp thanh toán vào LearnOva

---

## BƯỚC 1: ĐĂNG KÝ TÀI KHOẢN PAYOS

1. Truy cập https://payos.vn/
2. Bấm "Đăng ký" hoặc "Sign Up"
3. Nhập email, mật khẩu, xác nhận mật khẩu
4. Bấm "Đăng ký"
5. Kiểm tra email và bấm link xác thực
6. Đăng nhập vào PayOS

Kết quả: Tài khoản PayOS được tạo, bạn thấy dashboard

---

## BƯỚC 2: CHỌN LOẠI TÀI KHOẢN

PayOS sẽ yêu cầu chọn loại tài khoản

Chọn: "Tài khoản cá nhân / Hộ kinh doanh"

Lý do: Đây là lựa chọn cho LearnOva

---

## BƯỚC 3: XÁC THỰC KYC (CCCD)

1. Nhập số CCCD (12 chữ số)
2. Nhập tên đầy đủ giống trên CCCD (in hoa)
   Ví dụ: ĐOÀN TẤN HIỆU
3. Bấm "Kiểm tra"
4. Chờ xác thực (1-2 phút)

Kết quả: Danh tính được xác thực

---

## BƯỚC 4: CÀI AUTHENTICATOR

Trước khi tạo kênh, bạn cần cài ứng dụng Authenticator để lấy mã xác thực 2FA

Ứng dụng Authenticator có thể dùng:
- Google Authenticator
- Microsoft Authenticator
- Authy

Cách cài:
1. Tải ứng dụng trên điện thoại (iOS/Android)
2. Mở ứng dụng
3. Trên PayOS dashboard, tìm "Cài đặt bảo mật" hoặc "Security Settings"
4. Bấm "Cài Authenticator" hoặc "Enable 2FA"
5. Quét mã QR bằng ứng dụng Authenticator
6. Ứng dụng sẽ sinh mã 6 chữ số
7. Nhập mã vào PayOS để xác nhận

Lưu ý: Lưu mã backup ở nơi an toàn

Kết quả: Authenticator đã được liên kết

---

## BƯỚC 5: TẠO KÊNH THANH TOÁN

1. Trên dashboard PayOS, bấm "Kênh thanh toán"
2. Bấm nút "+ Tạo kênh thanh toán"
3. Chọn loại nhận tiền: "Website"
4. Nhập thông tin:
   Tên kênh: LearnOva Course Enrollment
   Logo kênh: Upload logo LearnOva (tùy chọn)
5. Bấm "Tiếp tục"

Kết quả: Kênh được lưu, tiếp tục sang bước chọn ngân hàng

---

## BƯỚC 6: CHỌN NGÂN HÀNG TÍCH HỢP

Danh sách ngân hàng hỗ trợ:

VietQH Pro - 99.98%
ACB - 99.99%
BEV - 99.98%
CODA - 100%
Đặc khác - 99.99%
Liên Việt - 100%
MB - 100%
Vietcombank - 100%

Cách chọn:
1. Xem bạn có tài khoản ở ngân hàng nào
2. Tìm ngân hàng đó trong danh sách
3. Bấm checkbox chọn ngân hàng
4. Bấm "Tiếp tục"

Lưu ý: Chỉ chọn ngân hàng mà bạn có tài khoản

Kết quả: Ngân hàng được liên kết

---

## BƯỚC 7: HOÀN TẤT TẠO KÊNH

PayOS sẽ hiển thị bước 3/3 - Xác nhận tích hợp website

1. Website đã được chọn sẵn
2. Bấm "Hoàn tất"

Kết quả: Kênh thanh toán được tạo thành công

---

## BƯỚC 8: LẤY PAYOS KEYS

Sau khi hoàn tất, PayOS sẽ hiển thị trang "Thông tin kênh thanh toán"

Trên trang này bạn sẽ thấy 4 thông tin cần thiết:

Client ID:
- Mục đích: Xác định kênh thanh toán ở PayOS
- Cách lấy: Bấm icon copy bên cạnh
- Lưu ở: .env PAYOS_CLIENT_ID

API Key:
- Mục đích: Xác thực request từ backend LearnOva
- Cách lấy: Bấm icon copy bên cạnh
- Ví dụ: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (32-48 ký tự)
- Lưu ở: .env PAYOS_API_KEY
- Lưu ý: BẢO MẬT - Không share công khai, không commit lên Git

Checksum Key:
- Mục đích: Xác minh tính toàn vẹn của webhook
- Cách lấy: Bấm icon copy bên cạnh
- Ví dụ: xxxxxxxxxxxxxxxxxxxxxxxx (24-32 ký tự)
- Lưu ở: .env PAYOS_CHECKSUM_KEY
- Lưu ý: BẢO MẬT - Không share công khai, không commit lên Git

Webhook URL:
- Mục đích: PayOS gọi URL này để thông báo kết quả thanh toán
- Ví dụ: https://api.learnova.com/api/learnova/payments/webhook

Cách copy:
1. Bấm icon copy bên cạnh mỗi field
2. Key được copy vào clipboard
3. Paste vào file .env hoặc nơi cần lưu

Kết quả: Bạn đã có 3 keys cần thiết để tích hợp PayOS vào LearnOva
