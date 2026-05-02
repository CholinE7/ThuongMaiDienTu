# BÁO CÁO ĐỒ ÁN MÔN HỌC: THƯƠNG MẠI ĐIỆN TỬ VÀ ỨNG DỤNG
**Đề tài:** Phân tích, thiết kế và triển khai hệ thống TMĐT B2C cho ShoesStore

---

## CHƯƠNG 1. GIỚI THIỆU & TỔNG QUAN THƯƠNG MẠI ĐIỆN TỬ

### 1.1. Khái niệm TMĐT
Thương mại điện tử (TMĐT - E-commerce) là việc tiến hành các hoạt động thương mại thông qua các phương tiện điện tử và mạng Internet. Theo Tổ chức Thương mại Thế giới (WTO), TMĐT bao gồm việc sản xuất, quảng cáo, bán hàng và phân phối sản phẩm được mua bán và thanh toán trực tuyến, nhưng quá trình giao nhận có thể hữu hình. Bản chất của TMĐT là một hệ thống tổng thể kết hợp giữa giao dịch, hệ thống xử lý thông tin và các bên tham gia (người bán, người mua, trung gian). Nó không chỉ dừng lại ở việc bán hàng qua website mà còn bao gồm cả các quy dịch dịch vụ khách hàng, cộng tác với đối tác và thực hiện các giao dịch điện tử trong nội bộ doanh nghiệp (E-Business).

### 1.2. Vai trò của TMĐT trong kinh doanh hiện đại
Trong kỷ nguyên số, TMĐT đóng vai trò là động lực chính thúc đẩy sự phát triển của doanh nghiệp bán lẻ:
- **Đối với doanh nghiệp (ShoesStore):** Giúp mở rộng thị trường không giới hạn địa lý, hoạt động liên tục 24/7/365. Nó giúp tối ưu hóa chi phí vận hành bằng cách giảm bớt sự phụ thuộc vào cửa hàng vật lý và đội ngũ nhân sự trực quầy. Đồng thời, TMĐT cho phép doanh nghiệp thu thập dữ liệu hành vi khách hàng chi tiết để cá nhân hóa dịch vụ.
- **Đối với người tiêu thụ:** Mang lại sự thuận tiện tối đa, tiết kiệm thời gian đi lại. Khách hàng dễ dàng tìm kiếm, so sánh giá cả từ nhiều nhà cung cấp và nhận được các khuyến mãi hấp dẫn thông qua các nền tảng số.
- **Đối với xã hội:** Góp phần giảm thiểu giao thông, nâng cao tiêu chuẩn cuộc sống và tạo điều kiện cho các sản phẩm vùng miền tiếp cận thị trường rộng lớn hơn.

### 1.3. Giới thiệu đề tài: ShoesStore
- **Mô tả doanh nghiệp:** ShoesStore là một doanh nghiệp giả định chuyên kinh doanh các dòng giày thời trang, giày sneaker và giày công sở chính hãng. Doanh nghiệp sở hữu danh mục sản phẩm đa dạng từ các thương hiệu lớn toàn cầu.
- **Tình hình kinh doanh hiện tại:** ShoesStore đang vận hành một cửa hàng vật lý nhỏ và bán hàng qua fanpage mạng xã hội. Tuy nhiên, việc quản lý đơn hàng còn thủ công, thường xuyên nhầm lẫn size giày cho khách và không có phương thức thanh toán tự động, dẫn đến tỷ lệ hủy đơn cao.
- **Mục tiêu tương lai:** Xây dựng một website TMĐT chuyên nghiệp để tự động hóa hoàn toàn quy trình từ khâu chọn giày, đặt hàng cho đến thanh toán và giao nhận. Mục tiêu đạt doanh thu tăng trưởng 30% sau 1 năm triển khai hệ thống mới.
- **Lý do cần thiết:** Chuyển đổi sang hệ thống TMĐT hoàn chỉnh là yêu cầu cấp thiết để chuyên nghiệp hóa hình ảnh thương hiệu, tăng tính bảo mật cho giao dịch tài chính và đáp ứng xu hướng mua sắm online "không tiếp xúc" của khách hàng hiện đại.

---

## CHƯƠNG 2. PHÂN TÍCH MÔ HÌNH THƯƠNG MẠI ĐIỆN TỬ

### 2.1. Phân loại mô hình TMĐT
Dựa trên đối tượng tham gia và mối quan hệ mua - bán, TMĐT được chia thành các mô hình chính:
- **B2C (Business-to-Consumer):** Doanh nghiệp bán hàng cho người tiêu dùng cá nhân. Đây là mô hình phổ biến nhất hiện nay.
- **B2B (Business-to-Business):** Giao dịch giữa các doanh nghiệp với nhau (chiếm 80% doanh số TMĐT toàn cầu).
- **C2C (Consumer-to-Consumer):** Cá nhân bán cho cá nhân thông qua sàn trung gian (như Chợ Tốt).
- **B2G/G2C:** Giao dịch liên quan đến Chính phủ và dịch vụ công.

### 2.2. Lý do doanh nghiệp lựa chọn mô hình B2C
ShoesStore lựa chọn mô hình **B2C** vì những lý do chiến lược sau:
- **Trực tiếp tiếp cận khách hàng:** ShoesStore muốn xây dựng mối quan hệ trực tiếp với người yêu giày, hiểu rõ sở thích của họ để tư vấn và chăm sóc hậu mãi tốt hơn.
- **Kiểm soát giá cả và thương hiệu:** Khác với việc bán sỉ (B2B), mô hình B2C cho phép doanh nghiệp tự quyết định giá bán lẻ, triển khai các chương trình khuyến mãi linh hoạt và xây dựng lòng trung thành (Loyalty) với thương hiệu ShoesStore.
- **Phù hợp với đặc thù sản phẩm:** Giày dép là mặt hàng thời trang cá nhân, yêu cầu sự đa dạng về mẫu mã và kích cỡ, phù hợp với hành vi mua sắm lẻ của người tiêu dùng trên các nền tảng web/app.

### 2.3. Đối tượng khách hàng mục tiêu
- **Nhân khẩu học:** Nam và nữ, độ tuổi từ 18 đến 40, là sinh viên hoặc nhân viên văn phòng có thu nhập ổn định.
- **Hành vi mua sắm:** Thích trải nghiệm giao diện đẹp, tốc độ load trang nhanh, thường xuyên sử dụng ví điện tử và quan tâm đến các đánh giá (Review) từ cộng đồng.
- **Nhu cầu:** Tìm kiếm các sản phẩm giày chất lượng, phong cách, có đầy đủ thông tin về chất liệu và bảng size rõ ràng.

---

## CHƯƠNG 3. PHÂN TÍCH HỆ THỐNG & CƠ SỞ HẠ TẦNG

### 3.1. Kiến trúc tổng thể hệ thống
Hệ thống ShoesStore được thiết kế theo kiến trúc **3 lớp (3-tier Architecture)** hiện đại:
1. **Lớp Giao diện (Frontend):** Là phần người dùng trực tiếp nhìn thấy và tương tác. Sử dụng Next.js để tối ưu hiệu năng và SEO.
2. **Lớp Nghiệp vụ (Backend):** Sử dụng Spring Boot để xử lý các logic phức tạp như quản lý giỏ hàng, tính toán đơn hàng, xác thực người dùng qua JWT và kết nối cổng thanh toán. Giao tiếp với Frontend qua REST API.
3. **Lớp Dữ liệu (Database):** Sử dụng MySQL để lưu trữ dữ liệu sản phẩm, người dùng và đơn hàng một cách nhất quán và an toàn.

### 3.2. Công nghệ sử dụng
- **Ngôn ngữ & Framework:** Java (Spring Boot), TypeScript (Next.js 15).
- **Styling:** Tailwind CSS (cho giao diện Responsive linh hoạt).
- **Xác thực:** Spring Security & JSON Web Token (JWT) để bảo mật phiên làm việc stateless.
- **Hệ quản trị CSDL:** MySQL (với JPA/Hibernate để ánh xạ dữ liệu).
- **Hạ tầng Cloud:** Triển khai thử nghiệm trên Vercel (Frontend) và Render (Backend).

### 3.3. Sơ đồ luồng dữ liệu (DFD) mức 0
- **Tác nhân:** Khách hàng, Admin.
- **Luồng dữ liệu:**
  1. Khách hàng gửi yêu cầu tìm kiếm/xem giày -> Hệ thống ShoesStore trả về thông tin sản phẩm.
  2. Khách hàng gửi thông tin đơn hàng & thanh toán -> Hệ thống ShoesStore xác thực và lưu trữ.
  3. Cổng thanh toán (MoMo) gửi kết quả thanh toán -> Hệ thống cập nhật trạng thái đơn hàng.
  4. Admin cập nhật thông tin giày/quản lý đơn hàng -> Hệ thống lưu dữ liệu và hiển thị báo cáo.

---

## CHƯƠNG 4. THIẾT KẾ & XÂY DỰNG WEBSITE

### 4.1. Thiết kế giao diện (Wireframe / Screenshot)
Giao diện ShoesStore tập trung vào trải nghiệm mua sắm mượt mà:
- **Trang chủ:** Banner trượt (Hero Slider) giới thiệu các mẫu giày hot, danh mục thương hiệu (Nike, Adidas...) và top sản phẩm mới.
- **Trang Sản phẩm:** Lưới hiển thị giày với bộ lọc size, màu sắc và giá.
- **Trang Chi tiết:** Hình ảnh giày đa góc độ, mô tả sản phẩm, đánh giá từ khách hàng và nút "Thêm vào giỏ".
- **Trang Quản trị:** Dashboard thống kê doanh thu theo biểu đồ, bảng quản lý Product và Order chi tiết.

### 4.2. Mô tả các chức năng chính
- **Nhóm chức năng hỗ trợ sản phẩm:** Tìm kiếm giày theo tên, lọc sản phẩm theo thương hiệu/danh mục, phân trang kết quả tìm kiếm.
- **Nhóm chức năng khách hàng:** Đăng ký/đăng nhập (JWT), xem thông tin tài khoản, quản lý địa chỉ giao hàng mặc định.
- **Nhóm chức năng mua hàng:** Giỏ hàng thông minh (đồng bộ dữ liệu), quy trình Checkout rút gọn, theo dõi lịch sử đơn hàng và trạng thái từng đơn.
- **Nhóm chức năng Admin:** Quản lý danh mục sản phẩm (CRUD), quản lý người dùng (khóa/mở tài khoản), xử lý trạng thái đơn hàng (Xác nhận, Giao hàng, Hoàn tất).

### 4.3. Phân công công việc trong nhóm
(Giả định nhóm 6 thành viên)
- **Thành viên 1 (Nhóm trưởng):** Quản lý chung, thiết kế kiến trúc hệ thống, phân tích Database. (20%)
- **Thành viên 2:** Phát triển Backend API (Product, Brand, Category). (16%)
- **Thành viên 3:** Phát triển Backend API (Order, Payment MoMo, Auth). (16%)
- **Thành viên 4:** Phát triển Frontend (Trang chủ, Danh mục, Sản phẩm). (16%)
- **Thành viên 5:** Phát triển Frontend (Giỏ hàng, Checkout, Profile). (16%)
- **Thành viên 6:** Kiểm thử (Testing), viết báo cáo và chuẩn bị Slide thuyết trình. (16%)

---

## CHƯƠNG 5. MARKETING & TIẾP THỊ ĐIỆN TỬ

### 5.1. Chiến lược Marketing Online
ShoesStore tập trung vào việc xây dựng lòng tin và tăng tỷ lệ chuyển đổi (Conversion Rate):
- **Giai đoạn nhận biết:** Sử dụng nội dung hình ảnh/video bắt mắt về các mẫu giày trend để thu hút traffic.
- **Giai đoạn cân nhắc:** Tận dụng **Social Proof** bằng cách hiển thị các đánh giá thật và số lượng giày đã bán để khách hàng yên tâm về chất lượng.
- **Giai đoạn hành động:** Sử dụng các chương trình Flash Sale theo giờ để thúc đẩy khách hàng hoàn tất thanh toán.

### 5.2. SEO, Mạng xã hội, Email Marketing
- **SEO (Search Engine Optimization):** Tối ưu hóa từ khóa như "giày sneaker nam đẹp", "giày thể thao giá rẻ" trên các trang sản phẩm. Sử dụng Next.js SSR để đảm bảo Google Index dữ liệu nhanh chóng.
- **Mạng xã hội:** Tích hợp các nút chia sẻ sản phẩm lên Facebook/Instagram. Chạy quảng cáo Facebook Ads nhắm mục tiêu vào đối tượng quan tâm đến thời trang và thể thao.
- **Email Marketing:** Tự động gửi email xác nhận khi khách đặt hàng thành công. Gửi thông báo nhắc nhở nếu khách hàng bỏ quên sản phẩm trong giỏ hàng quá 24h.

---

## CHƯƠNG 6. THANH TOÁN ĐIỆN TỬ

### 6.1. Lựa chọn cổng thanh toán
Hệ thống ShoesStore tích hợp cổng thanh toán **MoMo (Sandbox)**. Đây là phương thức thanh toán ví điện tử phổ biến nhất tại Việt Nam, mang lại trải nghiệm nhanh chóng bằng mã QR Code và độ bảo mật cao cho cả người mua và người bán.

### 6.2. Mô tả luồng thanh toán
1. Khách hàng nhấn "Thanh toán" tại trang Checkout.
2. Backend tạo đơn hàng tạm thời, sau đó gọi API MoMo để lấy `payUrl`.
3. Website chuyển hướng khách hàng sang trang thanh toán của MoMo.
4. Khách hàng quét mã QR hoặc đăng nhập để thanh toán.
5. MoMo gửi kết quả về qua `NotifyUrl` (IPN). Backend xác thực chữ ký (Signature) và cập nhật trạng thái đơn hàng.
6. Khách hàng được chuyển hướng về trang `ReturnUrl` trên website ShoesStore để xem thông báo kết quả.

### 6.3. Mô tả các trạng thái xử lý đơn hàng
- **Pending (Chờ thanh toán):** Đơn hàng vừa tạo, chưa có kết quả từ MoMo.
- **Paid (Đã thanh toán):** Thanh toán thành công, Admin bắt đầu chuẩn bị giày.
- **Processing (Đang xử lý):** Giày đang được đóng gói và bàn giao đơn vị vận chuyển.
- **Shipping (Đang giao):** Hàng đang trên đường tới khách.
- **Delivered (Hoàn tất):** Khách đã nhận hàng thành công.
- **Cancelled/Failed:** Đơn bị hủy do khách hàng không thanh toán hoặc lỗi giao dịch.

---

## CHƯƠNG 7. BẢO MẬT & PHÁP LÝ

### 7.1. Các rủi ro bảo mật
- **Tấn công Injection:** Nguy cơ hacker can thiệp SQL thông qua các ô tìm kiếm sản phẩm.
- **XSS (Cross-Site Scripting):** Chèn mã độc vào phần bình luận/đánh giá giày.
- **Payment Fraud:** Can thiệp sửa đổi giá tiền đơn hàng trước khi gửi sang cổng thanh toán.
- **Broken Access Control:** Người dùng thông thường cố tình truy cập vào trang `/admin`.

### 7.2. Giải pháp bảo mật
- **HTTPS:** Mã hóa toàn bộ dữ liệu trên đường truyền SSL/TLS.
- **Xác thực JWT:** Sử dụng token có thời hạn và được ký bằng Secret Key bí mật ở Server.
- **HMAC-SHA512:** Sử dụng thuật toán băm cực mạnh để tạo chữ ký số cho các giao dịch thanh toán MoMo, chống sửa đổi giá tiền (Data Integrity).
- **Phân quyền Role-based:** Kiểm tra quyền `ROLE_ADMIN` chặt chẽ ở cả Frontend (Middleware) và Backend (Spring Security).

### 7.3. Tuân thủ pháp luật TMĐT
ShoesStore cam kết tuân thủ Nghị định 52/2013/NĐ-CP và Nghị định 85/2021/NĐ-CP của Chính phủ Việt Nam:
- Công khai thông tin doanh nghiệp, chính sách bảo mật thông tin cá nhân khách hàng.
- Minh bạch cơ chế giải quyết tranh chấp và chính sách đổi trả hàng hóa trong vòng 7 ngày.

---

## CHƯƠNG 8. ĐÁNH GIÁ & HƯỚNG PHÁT TRIỂN

### 8.1. Kết quả đạt được
- Hoàn thiện hệ thống ShoesStore với đầy đủ quy trình B2C từ lúc chọn giày đến khi thanh toán MoMo thành công.
- Giao diện hiện đại, tối ưu cho di động, tốc độ tải trang dưới 2 giây.
- Hệ thống quản trị đơn hàng giúp doanh nghiệp vận hành chuyên nghiệp, giảm 90% các thao tác thủ công.

### 8.2. Hạn chế của hệ thống
- Chưa tích hợp đa dạng các đơn vị vận chuyển (hiện vẫn đang xử lý trạng thái thủ công).
- Hệ thống gợi ý sản phẩm còn đơn giản, chưa áp dụng trí tuệ nhân tạo (AI).
- Chưa có tính năng Chatbot hỗ trợ tư vấn size giày tự động 24/7.

### 8.3. Định hướng mở rộng
- **Phát triển Mobile App:** Xây dựng ứng dụng ShoesStore trên iOS/Android bằng React Native để tăng sự gắn kết khách hàng.
- **Tích hợp AI:** Áp dụng Machine Learning để phân tích sở thích khách hàng và đưa ra gợi ý sản phẩm "Bạn cũng có thể thích" một cách chính xác hơn.
- **Hệ thống Loyalty:** Xây dựng tính năng tích điểm đổi quà và hạng thành viên (Vip, Gold, Platinum) để giữ chân khách hàng lâu dài.

---
*Kết thúc báo cáo.*