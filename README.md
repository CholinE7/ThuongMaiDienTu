# 👟 TMDT & UD Shop - Dự án Shop Giày (ShoesStore)

Chào mừng bạn đến với dự án Shop Giày! Đây là một trang web bán hàng hoàn chỉnh, nơi bạn có thể xem sản phẩm, bỏ vào giỏ hàng và đặt mua như một trang thương mại điện tử thực thụ (giống Shopee hay Lazada).

---

## 🌟 Dự án này có gì?

Dự án được chia làm 2 phần chính:
1.  **Phần nhìn thấy (Frontend):** Là cái giao diện đẹp đẽ mà bạn dùng để bấm chọn giày, xem giá. (Sử dụng công nghệ Next.js 16 mới nhất).
2.  **Bộ não xử lý (Backend):** Nơi lưu trữ danh sách giày, thông tin khách hàng và xử lý đơn hàng. (Sử dụng Spring Boot).
3.  **Kho dữ liệu (Database):** Nơi cất giữ tất cả thông tin về sản phẩm và người dùng. (Sử dụng MySQL).

---

## 🚀 Cách để "đưa web lên mạng" (Cho người mới)

Hiện tại, dự án đang được triển khai theo cách: **Máy chủ chạy tại nhà (Ngrok)** và **Giao diện chạy trên mạng (Vercel)**.

### 1. Chuẩn bị "Bộ não" (Backend)
*   **Mở database:** Bạn cần mở XAMPP và khởi động MySQL.
*   **Chạy code Backend:** Mở thư mục `backend` bằng phần mềm lập trình (như VS Code) và nhấn chạy. Máy chủ sẽ chạy tại địa chỉ `localhost:8080`.

### 2. Mở "Cổng kết nối" (Ngrok)
Vì máy chủ chạy ở máy bạn, nên người ngoài không thấy được. Chúng ta dùng Ngrok để tạo một "đường ống" ra internet:
*   Mở Terminal và gõ: `ngrok http 8080 --domain=punk-caucasian-hangnail.ngrok-free.dev`
*   Bây giờ, "đường ống" của bạn có tên là: `https://punk-caucasian-hangnail.ngrok-free.dev`

### 3. Đưa "Giao diện" lên mạng (Vercel)
*   Bạn chỉ cần vào thư mục `frontend` và gõ lệnh: `vercel --prod`.
*   Trang web của bạn sẽ có một địa chỉ cố định trên internet để bất kỳ ai cũng có thể vào xem.

---

## 🛠 Các tính năng cực hay

### 🛒 Dành cho người mua (Khách hàng)
*   **Xem và chọn:** Có hàng trăm mẫu giày với đủ size, màu sắc.
*   **Giỏ hàng:** Chọn giày xong thì bỏ vào giỏ, có thể tăng giảm số lượng.
*   **Thanh toán:** Có 2 cách:
    *   Trả tiền khi nhận hàng (COD).
    *   **Quét mã MoMo:** Trả tiền qua ví điện tử siêu nhanh.
*   **Trang cá nhân:** Xem lại mình đã từng mua những gì, đơn hàng đang ở đâu.

### ⚙️ Dành cho chủ shop (Admin)
*   **Quản lý kho:** Thêm giày mới, sửa giá, cập nhật số lượng tồn kho.
*   **Duyệt đơn:** Xem khách nào đặt hàng để chuẩn bị giao.
*   **Quản lý nhân viên:** Tạo tài khoản cho nhân viên để cùng quản lý shop.

---

## 📝 Lưu ý quan trọng cho bạn
*   **Next.js 16:** Dự án đã được nâng cấp lên bản Next.js 16 để bảo mật hơn và chạy nhanh hơn.
*   **Link Ngrok:** Mỗi khi bạn muốn người khác vào web, bạn **bắt buộc** phải mở máy tính của mình và chạy lệnh Ngrok cho Backend. Nếu bạn tắt máy, "đường ống" sẽ bị đóng và web sẽ không lấy được dữ liệu.

---
*Dự án được thực hiện bởi nhóm TMDT & UD. Chúc bạn có trải nghiệm tuyệt vời với Shop Giày!*
