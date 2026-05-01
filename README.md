# TMDT & UD Shop - Dự án Thương mại điện tử

Dự án này là một ứng dụng thương mại điện tử hoàn chỉnh bao gồm Backend (Spring Boot) và Frontend (Next.js).

## 📌 Cấu trúc dự án

- **backend/**: Chứa mã nguồn của máy chủ, được xây dựng bằng Spring Boot.
- **frontend/**: Chứa mã nguồn của giao diện người dùng, được xây dựng bằng Next.js.
- **database/**: Chứa các script SQL để khởi tạo cấu trúc bảng và dữ liệu mẫu.

## 🚀 Công nghệ sử dụng

### Backend
- **Ngôn ngữ:** Java 21
- **Framework:** Spring Boot 3.5.10
- **Bảo mật:** Spring Security & JWT (JSON Web Token)
- **Database:** PostgreSQL / MySQL (Hỗ trợ H2 cho testing)
- **Công cụ hỗ trợ:** Lombok, MapStruct, Maven
- **Lưu trữ dữ liệu:** Spring Data JPA

### Frontend
- **Framework:** Next.js 16.1.6 (React 19)
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **API Client:** Axios
- **Ngôn ngữ:** TypeScript

## 🛠 Hướng dẫn thiết lập

### 1. Chuẩn bị
- Cài đặt **JDK 21**
- Cài đặt **Node.js** (Phiên bản v20 trở lên)
- Cài đặt **Maven** (Hoặc dùng `mvnw` có sẵn trong folder backend)
- Cài đặt hệ quản trị cơ sở dữ liệu (**PostgreSQL** hoặc **MySQL**)

### 2. Thiết lập Database
1. Tạo một database mới (ví dụ: `tmdt_db`).
2. Chạy file `backend/database/sql/database_schema.sql` để tạo cấu trúc bảng.
3. Chạy file `backend/database/sql/database_seeder.sql` để nạp dữ liệu mẫu (tùy chọn).

### 3. Cấu hình & Chạy Backend
1. Truy cập thư mục `backend/src/main/resources/`.
2. Tạo file `application.properties` (nếu chưa có) và cấu hình kết nối database:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/tmdt_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```
3. Mở terminal tại thư mục `backend` và chạy lệnh:
   ```bash
   ./mvnw spring-boot:run
   ```
   *Mặc định backend sẽ chạy tại port 8080.*

### 4. Thiết lập & Chạy Frontend
1. Mở terminal tại thư mục `frontend`.
2. Cài đặt các dependencies:
   ```bash
   npm install
   ```
3. Khởi chạy server development:
   ```bash
   npm run dev
   ```
4. Truy cập giao diện tại: [http://localhost:3000](http://localhost:3000)

## 📋 Tính năng chính
- **Quản lý sản phẩm:** Xem danh sách, chi tiết sản phẩm, tìm kiếm và lọc theo danh mục.
- **Giỏ hàng & Thanh toán:** Thêm/xóa sản phẩm, cập nhật số lượng, tích hợp thanh toán (Momo).
- **Hệ thống người dùng:** Đăng ký, đăng nhập, quản lý hồ sơ cá nhân.
- **Quản trị (Admin Dashboard):** Quản lý đơn hàng, người dùng, sản phẩm và thống kê doanh thu.
- **Bảo mật:** Phân quyền người dùng (Customer/Admin) sử dụng JWT.

---
*Dự án được phát triển cho mục đích học tập và ứng dụng thực tế.*
