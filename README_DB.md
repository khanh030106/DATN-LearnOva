
## Yêu cầu

- [PostgreSQL 18](https://www.postgresql.org/download/) đã được cài đặt
- [Java 25+](https://www.oracle.com/java/technologies/downloads/) đã được cài đặt
- Đã clone project về máy

---

##  Lần đầu tiên (chỉ làm 1 lần)

### Bước 1 — Clone project

```powershell
git clone <link_repo>
cd <tên_thư_mục_project>
```

---

### Bước 2 — Tạo database trống

Mở **pgAdmin** → click phải vào **Databases** → **Create** → **Database** → đặt tên `DATN` → nhấn **Save**.

Hoặc dùng psql:

```sql
CREATE DATABASE "DATN";
```
### Bước 4 — Chạy app lần đầu

```powershell
./mvnw spring-boot:run
```

Flyway sẽ **tự động tạo toàn bộ bảng** trong DB. Không cần làm gì thêm! ✅

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

### Trường hợp 2 — Có thay đổi schema mới (có file V2, V3... được push lên)

```powershell
git pull
./mvnw spring-boot:run
```

Flyway tự động phát hiện file migration mới và cập nhật DB. Không cần làm gì thêm! ✅

---

## Gặp lỗi?

| Lỗi | Nguyên nhân | Cách fix |
|-----|-------------|----------|
| `password authentication failed` | Sai password hoặc chưa set biến môi trường | Kiểm tra lại Bước 3, nhớ mở lại PowerShell |
| `database "DATN" does not exist` | Chưa tạo DB | Làm lại Bước 2 |
| `Connection refused` | PostgreSQL chưa chạy | Mở Services → khởi động PostgreSQL |
| `checksum mismatch` | File migration bị sửa | Liên hệ người quản lý DB |

---

>  **Lưu ý:** Mỗi người dùng password PostgreSQL của máy mình. Không dùng chung password.
>
> ⚠️ **Không tự ý thay đổi cấu trúc DB.** Mọi thay đổi schema phải do người quản lý DB thực hiện.
