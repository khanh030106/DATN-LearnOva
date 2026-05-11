
## Yêu cầu

- [PostgreSQL 18](https://www.postgresql.org/download/) đã được cài đặt
- [Java 25+](https://www.oracle.com/java/technologies/downloads/) đã được cài đặt

---

##  Lần đầu tiên (chỉ làm 1 lần)

### Bước 1 — Clone project

#### 1. Tạo folder ở chỗ muốn để DATN (đặt tên là DATN hay chi đó)
#### 2. Lấy Path của folder đó: Click chuột phải vào foler chọn Copy as path  
![img.png](img.png)

```powershell


```

---

### Bước 2 — Tạo database trống

Mở **pgAdmin** → click phải vào **Databases** → **Create** → **Database** → đặt tên `DATN` → nhấn **Save**.

```
### Bước 4 — Chạy app lần đầu

```powershell
./mvnw spring-boot:run
```

Flyway sẽ **tự động tạo toàn bộ bảng** trong DB

Log thành công sẽ trông như này:

```
Successfully validated 1 migration
Successfully baselined schema with version: 1
Started BackEndApplication in X seconds
```

---

## Các lần sau (làm mỗi ngày)

### Trường hợp 1 — Không có thay đổi schema

Chỉ cần chạy thẳng:

```powershell
./mvnw spring-boot:run
```

---

### Trường hợp 2 — Có thay đổi schema mới

```powershell
pull project again
./mvnw spring-boot:run
```

Flyway tự động phát hiện file migration mới và cập nhật DB. Không cần làm gì thêm!


>  **Lưu ý:** Mỗi người dùng password PostgreSQL của máy mình. Không dùng chung password.
>
>  **Không tự ý thay đổi cấu trúc DB.**
