# Các bước làm lại thanh toán payOS

## Bước 1: Xác định DB dùng bảng nào

Không tạo bảng mới. Không thêm cột mới. Không sửa enum DB.

Dùng đúng 6 bảng này:

| Bảng | Dữ liệu ghi/đọc |
| --- | --- |
| `courses` | Đọc khóa học, giá, trạng thái |
| `orders` | Ghi đơn hàng |
| `orderitems` | Ghi khóa học nằm trong đơn |
| `payments` | Ghi giao dịch payOS |
| `enrollments` | Ghi quyền học sau khi thanh toán xong |
| `vouchers` | Đọc mã giảm giá |

Các cột quan trọng:

```text
courses: course_id, title, base_price, status, is_deleted
orders: order_id, user_id, voucher_id, subtotal, discount_amount, total_amount, status
orderitems: order_id, course_id, original_price, price
payments: order_id, amount, currency, payment_method, transaction_id, status, paid_at
enrollments: course_id, user_id, order_id, enrolled_at, progress_percent
vouchers: code, discount_type, discount_value, minimum_order, maximum_discount_amount, usage_limit, used_count, start_date, end_date, is_active
```

Lưu ý:

- DB hiện chưa có `PAYOS` trong enum `payment_method`.
- Khi lưu DB, dùng tạm `payment_method = VNPAY`.
- Khi trả về frontend, vẫn trả `paymentMethod = "PAYOS"`.
- `payments.transaction_id` dùng để lưu `paymentLinkId` của payOS.

## Bước 1.1: Chuẩn bị dữ liệu DB trước khi test

Muốn bấm mua được thì DB phải có sẵn dữ liệu nền. Nếu DB trống thì tạo trước các dữ liệu này.

### Dữ liệu bắt buộc

| Dữ liệu | Bảng | Điều kiện |
| --- | --- | --- |
| User mua khóa học | `users` | User đăng nhập được, có JWT |
| Khóa học | `courses` | `status = PUBLISHED`, `is_deleted = false`, `base_price > 0` |
| Giảng viên của khóa học | `users` | Course phải có `instructor_id` hợp lệ |
| Bài học/section | `sections`, `lessons` | Không bắt buộc cho payment, nhưng nên có để vào học sau khi mua |

### Dữ liệu không được có sẵn

Trước khi test mua khóa học, user đó không được có enrollment của course đó:

```sql
SELECT *
FROM enrollments
WHERE user_id = <USER_ID>
AND course_id = <COURSE_ID>;
```

Nếu query có dữ liệu thì backend sẽ báo user đã mua khóa học rồi.

### Voucher có bắt buộc không?

Voucher không bắt buộc.

Nếu không test voucher thì frontend gửi:

```json
{
  "courseId": 1,
  "voucherCode": null
}
```

Nếu muốn test voucher thì bảng `vouchers` phải có mã hợp lệ:

```text
code = SALE10
is_active = true
start_date <= hiện tại
end_date >= hiện tại
used_count < usage_limit
minimum_order <= giá khóa học
```

Ví dụ kiểm tra voucher:

```sql
SELECT *
FROM vouchers
WHERE LOWER(code) = LOWER('SALE10');
```

Nếu không có voucher trong DB thì không nhập mã voucher khi test.

## Bước 2: Cấu hình payOS thật

Mở file:

```text
back_end/src/main/resources/application.properties
```

Nếu chưa có thì thêm:

```properties
payos.client-id=${PAYOS_CLIENT_ID}
payos.api-key=${PAYOS_API_KEY}
payos.checksum-key=${PAYOS_CHECKSUM_KEY}
payos.return-url=http://localhost:5173/payment/success
payos.cancel-url=http://localhost:5173/payment/cancel
```

Trong `.env` hoặc biến môi trường local phải có:

```env
PAYOS_CLIENT_ID=client_id_của_tài_khoản_payOS
PAYOS_API_KEY=api_key_của_tài_khoản_payOS
PAYOS_CHECKSUM_KEY=checksum_key_của_tài_khoản_payOS
```

Đây là QR tiền thật:

- Quét QR là chuyển tiền thật.
- Tiền về số tài khoản thật đã liên kết trong payOS.
- Trước khi test phải kiểm tra đúng số tài khoản nhận tiền.
- Nên test bằng số tiền nhỏ.
- Không commit key payOS lên Git.

## Bước 3: Chuẩn bị 4 file backend chính

Vào các file này:

```text
back_end/src/main/java/com/example/back_end/controller/PaymentController.java
back_end/src/main/java/com/example/back_end/service/PaymentService.java
back_end/src/main/java/com/example/back_end/service/PayOSService.java
back_end/src/main/java/com/example/back_end/repository/PaymentRepository.java
```

Nếu file chưa có:

```text
Tạo file mới đúng package.
```

Nếu file đang bị comment bằng `//` toàn bộ:

```text
Bỏ comment toàn file.
```

Nếu đã có code cũ bị lỗi:

```text
Giữ tên class.
Giữ đúng package.
Sửa lại theo các bước bên dưới.
```

4 file này làm việc như sau:

| File | Nhiệm vụ |
| --- | --- |
| `PaymentController` | Nhận request từ frontend và payOS |
| `PaymentService` | Xử lý order, payment, enrollment |
| `PayOSService` | Gọi API payOS, tạo QR, verify chữ ký |
| `PaymentRepository` | Tìm payment trong DB |

## Bước 4: Tạo DTO nếu chưa có

Package của project là:

```text
com.example.back_end.dto.resquest
```

### 4.1 CreatePaymentRequest

File:

```text
back_end/src/main/java/com/example/back_end/dto/resquest/CreatePaymentRequest.java
```

Nếu chưa có thì tạo:

```java
package com.example.back_end.dto.resquest;

import java.util.List;

public record CreatePaymentRequest(
        Long courseId,
        List<Long> courseIds,
        String voucherCode
) {}
```

Frontend chỉ gửi:

```json
{
  "courseId": 1,
  "voucherCode": "SALE10"
}
```

Không gửi giá tiền từ frontend.

### 4.2 CreatePaymentResponse

File:

```text
back_end/src/main/java/com/example/back_end/dto/response/CreatePaymentResponse.java
```

Nếu chưa có thì tạo record có các field này:

```text
orderId
paymentId
courseId
courseTitle
subtotal
discountAmount
totalAmount
paymentMethod
paymentStatus
orderStatus
checkoutUrl
qrCode
paymentLinkId
expiresAt
```

### 4.3 PaymentStatusResponse

File:

```text
back_end/src/main/java/com/example/back_end/dto/response/PaymentStatusResponse.java
```

Nếu chưa có thì tạo record có các field này:

```text
orderId
paymentId
orderStatus
paymentStatus
paidAt
courseId
courseTitle
totalAmount
```

## Bước 5: Làm repository

### 5.1 PaymentRepository

File:

```text
back_end/src/main/java/com/example/back_end/repository/PaymentRepository.java
```

Nếu chưa có hoặc đang bị comment thì để nội dung như sau:

```java
package com.example.back_end.repository;

import com.example.back_end.entity.Payment;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findFirstByOrderIdOrderByIdDesc(Long orderId);

    Optional<Payment> findByTransactionId(String transactionId);
}
```

Method dùng để:

```text
findFirstByOrderIdOrderByIdDesc: lấy payment mới nhất của order
findByTransactionId: tìm payment bằng paymentLinkId payOS
```

### 5.2 Các repository khác

Nếu các method dưới đây chưa có thì thêm vào file tương ứng.

File:

```text
back_end/src/main/java/com/example/back_end/repository/OrderRepository.java
```

Thêm:

```java
@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT o FROM Order o JOIN FETCH o.user WHERE o.id = :orderId")
Optional<Order> findByIdForPaymentUpdate(@Param("orderId") Long orderId);
```

File:

```text
back_end/src/main/java/com/example/back_end/repository/OrderitemRepository.java
```

Thêm:

```java
@Query("SELECT oi FROM Orderitem oi JOIN FETCH oi.course WHERE oi.order.id = :orderId ORDER BY oi.id ASC")
List<Orderitem> findByOrderIdWithCourse(@Param("orderId") Long orderId);
```

File:

```text
back_end/src/main/java/com/example/back_end/repository/EnrollmentRepository.java
```

Thêm:

```java
boolean existsByIdCourseIdAndIdUserId(Long courseId, Long userId);
```

File:

```text
back_end/src/main/java/com/example/back_end/repository/VoucherRepository.java
```

Thêm:

```java
Optional<Voucher> findByCodeIgnoreCase(String code);
```

## Bước 6: Làm PayOSService

File:

```text
back_end/src/main/java/com/example/back_end/service/PayOSService.java
```

Nếu chưa có thì tạo class:

```text
package com.example.back_end.service
class PayOSService
annotation @Service
```

Service này chỉ làm 3 việc:

```text
1. Tạo payment link payOS
2. Verify webhook signature
3. Đọc trạng thái thành công/thất bại từ webhook
```

Trong class cần đọc 5 config:

```java
@Value("${payos.client-id}")
private String clientId;

@Value("${payos.api-key}")
private String apiKey;

@Value("${payos.checksum-key}")
private String checksumKey;

@Value("${payos.return-url}")
private String returnUrl;

@Value("${payos.cancel-url}")
private String cancelUrl;
```

Method cần có:

```text
createPaymentLink(Order order, List<Course> courses, long amount)
verifyWebhook(JsonNode body)
isSuccessfulWebhook(JsonNode body)
```

Trong `createPaymentLink`:

```text
Gửi POST tới https://api-merchant.payos.vn/v2/payment-requests
Header x-client-id = clientId
Header x-api-key = apiKey
Body có orderCode, amount, description, returnUrl, cancelUrl, items, signature
```

Body cần gửi:

```text
orderCode = order.id
amount = tổng tiền dạng số nguyên VND
description = ORDER + order.id
returnUrl = returnUrl
cancelUrl = cancelUrl
items = tên khóa học, quantity 1, price amount
signature = chữ ký HMAC_SHA256
```

payOS trả về thì lấy:

```text
checkoutUrl
qrCode
paymentLinkId
expiredAt nếu có
```

Trong `verifyWebhook`:

```text
Lấy body.data
Lấy body.signature
Sort các field trong data theo alphabet
Nối thành chuỗi key=value&key=value
Tạo HMAC_SHA256 bằng checksumKey
So sánh với signature payOS gửi lên
```

Trong `isSuccessfulWebhook`:

```text
success = true
hoặc code = "00"
```

Nếu code có `getFirst()` mà build lỗi, đổi thành:

```java
list.get(0)
```

## Bước 7: Làm PaymentService

File:

```text
back_end/src/main/java/com/example/back_end/service/PaymentService.java
```

Nếu chưa có thì tạo class:

```text
package com.example.back_end.service
class PaymentService
annotation @Service
annotation @RequiredArgsConstructor
```

Inject các repository/service này:

```text
CourseRepository
VoucherRepository
OrderRepository
OrderitemRepository
PaymentRepository
EnrollmentRepository
UserRepository
PayOSService
```

Class cần có 4 method:

```text
createPayment
getPaymentStatus
verifyPayOSWebhook
handlePayOSWebhook
```

### 7.1 createPayment

Method này được frontend gọi khi bấm mua.

Input:

```text
courseId
voucherCode
JWT user hiện tại
```

DB sẽ ghi:

```text
orders: PENDING
orderitems: khóa học đang mua
payments: PENDING
```

Không ghi:

```text
enrollments
```

Thứ tự làm:

```text
1. Lấy currentUser từ SecurityContext.
2. Lấy courseId từ request.
3. Tìm course theo courseId.
4. Nếu không có course thì lỗi.
5. Nếu course.status không phải PUBLISHED thì lỗi.
6. Nếu course.isDeleted = true thì lỗi.
7. Nếu user đã có enrollment khóa này thì lỗi.
8. subtotal = course.basePrice.
9. Nếu có voucherCode thì validate voucher.
10. Nếu không có voucherCode thì discountAmount = 0.
11. totalAmount = subtotal - discountAmount.
12. Nếu totalAmount <= 0 thì lỗi.
13. Nếu totalAmount không phải số nguyên VND thì lỗi.
14. Tạo Order status PENDING.
15. Tạo Orderitem.
16. Tạo Payment status PENDING, paidAt = null, paymentMethod = VNPAY.
17. Gọi payOS tạo payment link.
18. Lưu paymentLinkId vào payments.transaction_id.
19. Trả CreatePaymentResponse cho frontend.
```

Response trả về phải có:

```text
paymentMethod = PAYOS
paymentStatus = PENDING
orderStatus = PENDING
checkoutUrl
qrCode
paymentLinkId
```

Method này phải có:

```java
@Transactional
```

Nếu gọi payOS lỗi thì rollback, không để lại order rác.

### 7.2 validate voucher

Chỉ chạy khi request có `voucherCode`.

Thứ tự check:

```text
1. Tìm voucher bằng code, không phân biệt hoa thường.
2. Không có thì lỗi.
3. is_active phải true.
4. Hiện tại phải nằm giữa start_date và end_date.
5. used_count phải nhỏ hơn usage_limit.
6. subtotal phải lớn hơn hoặc bằng minimum_order.
7. Nếu Percent: discount = subtotal * discount_value / 100.
8. Nếu có maximum_discount_amount thì discount không vượt quá số này.
9. Nếu Fixed: discount = discount_value.
10. discount không được lớn hơn subtotal.
```

### 7.3 getPaymentStatus

Method này được frontend gọi lặp lại khi đang mở modal QR.

Input:

```text
orderId
JWT user hiện tại
```

Chỉ đọc DB, không tự mở khóa học.

Thứ tự làm:

```text
1. Tìm order theo orderId.
2. Nếu order không tồn tại thì lỗi.
3. Nếu user không phải chủ order và không phải admin thì lỗi 403.
4. Tìm payment mới nhất của order.
5. Tìm orderitem và course của order.
6. Trả PaymentStatusResponse.
```

Frontend sẽ nhìn:

```text
orderStatus = PAID
hoặc paymentStatus = SUCCESS
```

để biết thanh toán xong.

### 7.4 verifyPayOSWebhook

Method này rất ngắn:

```text
Gọi payOSService.verifyWebhook(body)
Trả true hoặc false
```

### 7.5 handlePayOSWebhook

Method này do payOS gọi gián tiếp qua controller.

Input:

```text
body webhook payOS
```

Chỉ method này được:

```text
set orders.status = PAID
set payments.status = SUCCESS
set payments.paid_at = now
insert enrollments
```

Thứ tự làm:

```text
1. Đọc paymentLinkId trong body.data.paymentLinkId.
2. Đọc orderCode trong body.data.orderCode.
3. Tìm payment bằng transaction_id = paymentLinkId.
4. Nếu không tìm được thì tìm payment theo orderCode.
5. Lock order bằng findByIdForPaymentUpdate.
6. Nếu order đã PAID và payment đã SUCCESS thì return luôn.
7. Nếu order/payment không còn PENDING thì không xử lý tiếp.
8. Nếu webhook thành công thì tạo enrollment.
9. Update order thành PAID.
10. Update payment thành SUCCESS và set paidAt.
11. Nếu webhook thất bại nhưng signature đúng thì set FAILED.
```

Khi tạo enrollment:

```text
course_id = course trong orderitems
user_id = order.user_id
order_id = order.order_id
enrolled_at = now
progress_percent = 0
```

Trước khi insert enrollment phải check chưa tồn tại:

```text
existsByIdCourseIdAndIdUserId(courseId, userId) = false
```

Method này phải có:

```java
@Transactional
```

## Bước 8: Làm PaymentController

File:

```text
back_end/src/main/java/com/example/back_end/controller/PaymentController.java
```

Nếu chưa có thì tạo class:

```text
package com.example.back_end.controller
class PaymentController
annotation @RestController
annotation @RequiredArgsConstructor
annotation @RequestMapping("/api/learnova/payments")
```

Controller có 3 API:

| API | Ai gọi | Gọi service nào |
| --- | --- | --- |
| `POST /create` | Frontend | `paymentService.createPayment` |
| `GET /status/{orderId}` | Frontend | `paymentService.getPaymentStatus` |
| `POST /webhook` | payOS | verify rồi gọi `paymentService.handlePayOSWebhook` |

Webhook phải làm đúng:

```text
1. Nhận body.
2. Gọi verifyPayOSWebhook.
3. Nếu false thì trả 401.
4. Nếu true thì gọi handlePayOSWebhook.
5. Trả 200.
```

## Bước 9: Mở webhook trong SecurityConfig

Mở file:

```text
back_end/src/main/java/com/example/back_end/config/SecurityConfig.java
```

Trong `.authorizeHttpRequests(...)`, nếu chưa có thì thêm:

```java
.requestMatchers(HttpMethod.POST, "/api/learnova/payments/webhook").permitAll()
```

Chỉ webhook được `permitAll`.

Các API còn lại vẫn cần JWT:

```text
POST /api/learnova/payments/create
GET /api/learnova/payments/status/{orderId}
```

## Bước 10: Làm frontend PaymentApi

File:

```text
front_end/src/api/PaymentApi.js
```

Nếu chưa có thì tạo.

Cần 2 function:

```js
export const createPaymentApi = async (axiosPrivate, payload, accessToken) => {
  const response = await axiosPrivate.post("/payments/create", payload, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });
  return response.data;
};

export const getPaymentStatusApi = async (axiosPrivate, orderId, accessToken) => {
  const response = await axiosPrivate.get(`/payments/status/${orderId}`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });
  return response.data;
};
```

## Bước 11: Gắn nút mua trong CourseDetail

File:

```text
front_end/src/page/home/courses/CourseDetail.jsx
```

Khi user bấm `Buy Now`, làm đúng thứ tự:

```text
1. Nếu chưa đăng nhập thì báo lỗi.
2. Nếu đã mua khóa học rồi thì chuyển sang trang khóa học của tôi.
3. Gọi createPaymentApi.
4. Lưu response vào state activePayment.
5. Mở PaymentModal.
```

Payload gửi lên backend:

```js
{
  courseId: Number(course.courseId || course.id || id),
  voucherCode: appliedVoucher?.code || null,
}
```

Không gửi:

```text
userId
amount
subtotal
totalAmount
```

## Bước 12: Làm PaymentModal

File:

```text
front_end/src/component/payment/PaymentModal.jsx
```

Nếu chưa có thì tạo component.

Modal nhận prop:

```text
payment
onClose
onPaid
```

Modal hiển thị:

```text
courseTitle
subtotal
discountAmount
totalAmount
qrCode
checkoutUrl
trạng thái PENDING
```

Sau khi mở modal:

```text
Gọi getPaymentStatusApi mỗi 2 hoặc 3 giây.
```

Nếu status trả về:

```text
orderStatus = PAID
hoặc paymentStatus = SUCCESS
```

thì:

```text
Hiện thành công.
Đóng modal.
Chuyển sang /learnova/user/profile/courses.
```

Không tạo nút giả lập thành công.

## Bước 13: Làm trang success/cancel

File route:

```text
front_end/src/route/AppRoutes.jsx
```

Nếu chưa có thì thêm:

```text
/payment/success
/payment/cancel
```

File page:

```text
front_end/src/page/home/payment/PaymentSuccess.jsx
front_end/src/page/home/payment/PaymentCancel.jsx
```

Trang success chỉ để hiển thị sau khi payOS redirect về.

Trang success không được tự set DB thành công.

Nếu cần thì trang success chỉ gọi status API để đọc lại trạng thái.

## Bước 14: Test tạo payment

Chạy backend và frontend.

Trên frontend:

```text
1. Đăng nhập.
2. Vào khóa học đã PUBLISHED.
3. Bấm Buy Now.
4. Modal QR hiện ra.
```

Kiểm tra DB:

```sql
SELECT * FROM orders ORDER BY order_id DESC;
SELECT * FROM orderitems ORDER BY order_item_id DESC;
SELECT * FROM payments ORDER BY payment_id DESC;
```

Kết quả đúng:

```text
orders.status = PENDING
payments.status = PENDING
payments.paid_at = null
payments.transaction_id có paymentLinkId
orderitems có course vừa mua
```

## Bước 15: Test thanh toán thật

Trước khi quét QR:

```text
Kiểm tra số tiền.
Kiểm tra số tài khoản nhận tiền.
Chỉ test số tiền nhỏ.
```

Sau khi thanh toán, kiểm tra DB:

```sql
SELECT * FROM orders ORDER BY order_id DESC;
SELECT * FROM payments ORDER BY payment_id DESC;
SELECT * FROM enrollments ORDER BY enrolled_at DESC;
```

Kết quả đúng:

```text
orders.status = PAID
payments.status = SUCCESS
payments.paid_at khác null
enrollments có record mới
```

Frontend đúng:

```text
Modal tự thấy SUCCESS.
Đóng modal.
Chuyển sang /learnova/user/profile/courses.
```

## Bước 16: Test doanh thu

Chỉ tính đơn đã thanh toán thật:

```sql
SELECT
o.order_id,
o.user_id,
c.course_id,
c.title,
c.instructor_id,
o.subtotal,
o.discount_amount,
o.total_amount,
p.payment_method,
p.status AS payment_status,
o.status AS order_status,
p.paid_at
FROM orders o
JOIN orderitems oi ON oi.order_id = o.order_id
JOIN courses c ON c.course_id = oi.course_id
JOIN payments p ON p.order_id = o.order_id
WHERE o.status = 'PAID'
AND p.status = 'SUCCESS'
ORDER BY o.order_id DESC;
```

Theo prompt:

```text
Doanh thu hệ thống = orders.total_amount
Hoa hồng website = totalAmount * 0.3
Doanh thu giảng viên = totalAmount * 0.7
```

Không tạo bảng payout. Không thêm cột payout.

## Bước 17: Lỗi thì dò theo bảng này

| Lỗi | Kiểm tra |
| --- | --- |
| Backend không build | 4 file payment đã bỏ comment chưa, import có đúng `dto.resquest` chưa |
| Lỗi `getFirst()` | Đổi `getFirst()` thành `get(0)` |
| Không tạo được payment | Key payOS, course `PUBLISHED`, user chưa enrolled, `totalAmount > 0` |
| Webhook không chạy | Webhook URL trên payOS có trỏ đúng backend đang chạy không |
| Webhook 401 | `PAYOS_CHECKSUM_KEY` có đúng không, verify có dùng `body.data` không |
| Thanh toán xong chưa mở khóa | Order/payment trước webhook có `PENDING` không, orderitems có dữ liệu không |
