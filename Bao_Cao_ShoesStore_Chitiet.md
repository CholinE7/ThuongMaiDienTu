# BÁO CÁO ĐỒ ÁN MÔN HỌC: THƯƠNG MẠI ĐIỆN TỬ VÀ ỨNG DỤNG
**Đề tài:** Phân tích, Thiết kế và Triển khai Hệ thống TMĐT B2C cho ShoesStore

---

## CHƯƠNG 1. GIỚI THIỆU VÀ TỔNG QUAN VỀ THƯƠNG MẠI ĐIỆN TỬ

### 1.1. Khái quát về Thương mại điện tử (TMĐT)
Thương mại điện tử (E-commerce) không chỉ là việc tạo ra một website bán hàng trực tuyến mà là sự chuyển đổi toàn diện của các hoạt động thương mại dựa trên nền tảng kỹ thuật số và Internet. Các tổ chức trên thế giới đã đưa ra những định nghĩa khác nhau nhằm làm rõ bản chất của TMĐT:
- **Tổ chức Thương mại Thế giới (WTO):** Định nghĩa TMĐT bao gồm việc sản xuất, quảng cáo, bán hàng và phân phối sản phẩm được mua bán và thanh toán trên mạng Internet, nhưng được giao nhận một cách hữu hình hoặc thông qua số hóa.
- **Ủy ban Thương mại điện tử của APEC:** Nhấn mạnh TMĐT liên quan đến các giao dịch thương mại trao đổi hàng hóa và dịch vụ giữa các nhóm (cá nhân) mang tính điện tử chủ yếu thông qua các hệ thống có nền tảng dựa trên Internet.
- **Ủy ban Châu Âu (EU):** Cho rằng TMĐT là sự mua bán, trao đổi hàng hóa hay dịch vụ giữa các doanh nghiệp, gia đình, cá nhân thông qua mạng máy tính trung gian. Thuật ngữ này bao hàm cả quá trình vận chuyển và dịch vụ khách hàng trực tuyến.

Bản chất cốt lõi của TMĐT (E-Business) là việc ứng dụng công nghệ thông tin vào mọi hoạt động nghiệp vụ: từ quá trình mua bán, trao đổi dữ liệu nội bộ (Intrabusiness), chăm sóc khách hàng (Customer Service) cho đến hợp tác đối tác (Collaborative).

### 1.2. Lịch sử phát triển và bài học kinh điển từ Dell
Quá trình hình thành TMĐT bắt đầu từ những năm 1970 với hệ thống Chuyển tiền điện tử (EFT - Electronic Funds Transfer) và Trao đổi dữ liệu điện tử (EDI - Electronic Data Interchange). Đến thập niên 1990, với sự phổ cập của Internet, các khái niệm B2C và B2B mới thực sự bùng nổ, mở ra kỷ nguyên thương mại số.

**Bài học kinh điển từ Dell Computers:**
Năm 1984, Dell được thành lập với hệ thống đặt hàng qua mail và fax, cho phép khách hàng tự cấu hình máy tính (build-to-order). Tuy nhiên, đến năm 1993-1994, hệ thống truyền thống bộc lộ nhược điểm khiến công ty thua lỗ hàng trăm triệu USD trước sức ép của Compaq. Giải pháp cứu vãn của Dell chính là TMĐT. Bằng cách xây dựng website nhận đơn hàng, mở rộng sản phẩm (máy in, camera), tiếp thị trực tiếp trên Internet và ứng dụng hệ thống mua sắm điện tử (e-procurement) với đối tác (B2B), Dell đã đánh bại Compaq và vươn lên số 1 thế giới vào năm 2000. Đây là minh chứng rõ rệt cho việc ứng dụng TMĐT giúp tối ưu hóa chuỗi cung ứng và mở rộng thị trường vượt biên giới.

### 1.3. Sự chuyển dịch từ Kinh doanh Truyền thống sang TMĐT
Sự phát triển của Smartphone, mạng xã hội, và các hệ thống thanh toán điện tử đã thay đổi hành vi người tiêu dùng một cách sâu sắc. Khách hàng ngày nay có xu hướng so sánh giá, đọc đánh giá (social proof), và yêu cầu giao hàng tận nơi.

| Tiêu chí | Kinh doanh truyền thống | Thương mại điện tử (ShoesStore) |
| --- | --- | --- |
| **Không gian & Thời gian** | Cửa hàng vật lý, giới hạn giờ hành chính | Online 24/7/365, không biên giới |
| **Phạm vi hoạt động** | Địa phương, khu vực | Toàn quốc, toàn cầu |
| **Công nghệ hỗ trợ** | Sổ sách thủ công, tiền mặt | Hệ thống Web, AI, Thanh toán số, JWT |
| **Chi phí mặt bằng** | Rất cao | Tối ưu, linh hoạt qua Cloud Hosting |

### 1.4. Giới thiệu dự án: Cửa hàng Giày dép trực tuyến (ShoesStore)
- **Doanh nghiệp:** ShoesStore là một doanh nghiệp bán lẻ chuyên phân phối các loại giày thời trang, giày thể thao chính hãng.
- **Hiện trạng:** Trước đây, doanh nghiệp kinh doanh chủ yếu qua cửa hàng vật lý và fanpage Facebook, gặp nhiều hạn chế trong việc quản lý tồn kho theo kích cỡ (size), màu sắc, không tự động hóa được khâu thanh toán và khó đo lường hiệu quả các chiến dịch Marketing.
- **Mục tiêu dự án:** Thiết kế, xây dựng và triển khai một nền tảng TMĐT độc lập (e-store) với mô hình B2C. Website ShoesStore không chỉ trưng bày sản phẩm mà còn sở hữu hệ thống Giỏ hàng, Checkout, Thanh toán điện tử (MoMo/VNPAY) và quản trị đơn hàng tự động, giúp doanh nghiệp kiểm soát toàn diện quy trình kinh doanh.

---

## CHƯƠNG 2. PHÂN TÍCH MÔ HÌNH THƯƠNG MẠI ĐIỆN TỬ

### 2.1. Khái niệm và Phân loại Mô hình TMĐT
Mô hình TMĐT là cách doanh nghiệp tổ chức hoạt động mua bán trên môi trường điện tử, xác định rõ "Ai bán - Ai mua - Thông qua nền tảng nào". Các chủ thể chính bao gồm Doanh nghiệp (B - Business), Người tiêu dùng (C - Consumer) và Chính phủ (G - Government).
Các mô hình phổ biến bao gồm:
1. **B2C (Business-to-Consumer):** Doanh nghiệp bán hàng trực tiếp cho người tiêu dùng cuối. Ví dụ: Tiki, Lazada, Netflix.
2. **B2B (Business-to-Business):** Giao dịch giữa các doanh nghiệp. Ví dụ: Alibaba, Amazon Business.
3. **C2C (Consumer-to-Consumer):** Người dùng bán hàng cho người dùng thông qua nền tảng trung gian. Ví dụ: Chợ Tốt, Shopee (C2C).
4. **Các mô hình khác:** B2G (Hệ thống đấu thầu công), C2B (Freelancer, Upwork).

### 2.2. Đặc trưng của Mô hình B2C
Mô hình B2C đặc trưng bởi khối lượng khách hàng cực kỳ lớn nhưng giá trị mỗi đơn hàng lại ở mức nhỏ đến trung bình. Lợi nhuận của doanh nghiệp đến từ số lượng đơn lớn (Economies of Scale). Trong B2C, trải nghiệm người dùng (UI/UX), tốc độ trang web và chiến lược Marketing ngắn hạn đóng vai trò sống còn. Có hai hình thức B2C phổ biến:
- **Gian hàng trên sàn TMĐT:** Bán hàng qua Shopee, Tiki (phụ thuộc vào luật chơi của sàn, khó xây dựng thương hiệu độc lập).
- **Website bán hàng riêng (e-store):** Doanh nghiệp tự xây dựng website, làm chủ 100% dữ liệu khách hàng, tự do triển khai các chiến dịch Marketing và cá nhân hóa (Personalization).

### 2.3. Lựa chọn Mô hình B2C cho ShoesStore
Đối với ShoesStore, mô hình **Website bán hàng riêng (e-store) theo cấu trúc B2C** là sự lựa chọn tối ưu nhất.
- **Tính khả thi:** Doanh nghiệp trực tiếp nhập giày từ nhà sản xuất (hoặc sản xuất gia công) và bán lẻ cho người dùng cuối.
- **Mức độ chủ động:** Thay vì dựa vào lượng truy cập tự nhiên trên sàn TMĐT (nơi cạnh tranh về giá cực kỳ khốc liệt), việc sở hữu Website riêng giúp ShoesStore triển khai các chiến dịch Marketing đặc thù, tích hợp hệ thống điểm thưởng (Loyalty) và duy trì mối quan hệ trực tiếp, lâu dài với khách hàng.
- **Nguồn lực hạn chế:** Mặc dù chi phí xây dựng website ban đầu (CAPEX) cao hơn việc mở gian hàng trên sàn, nhưng về dài hạn, việc không mất 10-15% phí hoa hồng/đơn hàng sẽ tối ưu hóa lợi nhuận ròng.

### 2.4. Đối tượng khách hàng mục tiêu của ShoesStore
- **Nhân khẩu học:** Độ tuổi từ 16 - 45, bao gồm học sinh, sinh viên và dân văn phòng.
- **Tâm lý & Hành vi:** Những người có thói quen mua sắm trực tuyến, sử dụng smartphone thường xuyên, ưu tiên sự tiện lợi, có khả năng thanh toán qua thẻ tín dụng hoặc ví điện tử (MoMo, ZaloPay). Họ thường bị ảnh hưởng bởi hiệu ứng bầy đàn (Tâm lý Social Proof) khi ra quyết định mua sắm: có xu hướng đọc các đánh giá, bình luận trước khi chọn size và đặt hàng.

---

## CHƯƠNG 3. PHÂN TÍCH HỆ THỐNG VÀ CƠ SỞ HẠ TẦNG

### 3.1. Phân biệt Hạ tầng và Kiến trúc trong TMĐT
- **Hạ tầng (Infrastructure):** Là tập hợp các thành phần kỹ thuật hữu hình và vô hình cho phép giao dịch diễn ra, bao gồm Phần cứng (Servers, Routers), Mạng truyền thông (Internet, LAN, VPN) và Phần mềm hệ thống (OS, DBMS).
- **Kiến trúc (Architecture):** Là bản vẽ thiết kế, cách thức tổ chức, sắp xếp và kết nối các thành phần hạ tầng nhằm giải quyết bài toán kinh doanh. Kiến trúc quyết định khả năng mở rộng (Scalability), tính bảo mật (Security) và hiệu suất (Performance) của hệ thống.

### 3.2. Hạ tầng Mạng và Máy chủ (Servers)
Hệ thống TMĐT dựa trên giao thức TCP/IP và dịch vụ WWW để kết nối người mua (Client) với máy chủ (Server).
- **Mô hình Client-Server:** Điện thoại hoặc trình duyệt máy tính của khách hàng (Client) gửi yêu cầu (Request) thông qua HTTP/HTTPS. Máy chủ web (Web Server) tiếp nhận, xử lý và phản hồi (Response) dữ liệu.
- **Cloud Computing (Điện toán đám mây):** ShoesStore lựa chọn triển khai hệ thống trên Cloud (PaaS và IaaS) thay vì On-premise (máy chủ vật lý tại công ty) nhằm tiết kiệm chi phí đầu tư ban đầu, tận dụng khả năng tự động mở rộng (Auto-scaling) trong những dịp "Flash Sale" hay "Black Friday".
- **CDN (Content Delivery Network):** Để giải quyết độ trễ do tải hình ảnh giày dép dung lượng cao, ShoesStore sử dụng CDN để lưu bộ đệm (cache) hình ảnh tại nhiều máy chủ đặt ở nhiều khu vực khác nhau.

### 3.3. Kiến trúc Phần mềm của ShoesStore
Dự án ShoesStore được xây dựng dựa trên **Kiến trúc 3 lớp (3-tier Architecture)** tách biệt hoàn toàn để đảm bảo khả năng bảo trì và nâng cấp trong tương lai.

1. **Lớp Giao diện (Presentation Tier / Frontend):**
   - Được phát triển bằng **Next.js (React Framework)** và **TypeScript**. Next.js hỗ trợ Server-Side Rendering (SSR) giúp tối ưu hóa SEO (Search Engine Optimization), một tiêu chí sống còn để thu hút Traffic tự nhiên từ Google. Giao diện được thiết kế Mobile-friendly bằng TailwindCSS.
2. **Lớp Nghiệp vụ (Logic Tier / Backend):**
   - Sử dụng **Java Spring Boot**. Backend đóng vai trò như "bộ não" của hệ thống, cung cấp các API RESTful. Nó chịu trách nhiệm xử lý logic tính toán giá trị đơn hàng, áp dụng mã khuyến mãi, xác thực người dùng qua JWT (JSON Web Token), và giao tiếp an toàn với cổng thanh toán (Webhook/IPN).
3. **Lớp Dữ liệu (Data Tier / Database):**
   - Sử dụng hệ quản trị cơ sở dữ liệu quan hệ **MySQL**. Do tính chất giao dịch tài chính (Order, Payment) yêu cầu tính toàn vẹn dữ liệu cực kỳ cao (ACID properties), MySQL là lựa chọn lý tưởng để đảm bảo không bị thất thoát đơn hàng trong điều kiện truy cập đồng thời (Concurrency).

### 3.4. Dữ liệu trung tâm của Hệ thống
Mọi hoạt động của ShoesStore xoay quanh dữ liệu. Các thực thể chính bao gồm:
- **Product:** Lưu trữ `ProductID`, `Name`, `Price`, `Description`, `Images`.
- **Category & Brand:** Hỗ trợ phân loại giày theo loại (Sneaker, Oxford) và thương hiệu (Nike, Converse).
- **Customer:** Lưu trữ `CustomerID`, `Name`, `Email`, thông tin địa chỉ giao hàng.
- **Order & OrderItem:** Ghi nhận lịch sử giao dịch, liên kết giữa khách hàng và các đôi giày họ mua.
- **Payment:** Ghi nhận trạng thái thanh toán từ MoMo (`TxnRef`, `PaymentStatus`).

---

## CHƯƠNG 4. THIẾT KẾ VÀ XÂY DỰNG WEBSITE

### 4.1. Thiết kế Giao diện và Trải nghiệm Người dùng (UI/UX)
Mục tiêu tối thượng của thiết kế là giảm thiểu tỷ lệ bỏ dở giỏ hàng (Cart Abandonment Rate) thông qua một cấu trúc trực quan, số bước mua hàng ngắn nhất (Luồng điều hướng rõ ràng).
- **Trang chủ (Homepage):** Giới thiệu bộ sưu tập mới, hiển thị các thương hiệu đối tác lớn, banner khuyến mãi thu hút ánh nhìn ngay từ giây đầu tiên.
- **Trang Danh mục & Tìm kiếm:** Cung cấp chức năng Search mạnh mẽ, bộ lọc (Filter) theo giá, size, màu sắc và thương hiệu.
- **Trang Chi tiết Sản phẩm (Product Detail):** Trưng bày hình ảnh sản phẩm sắc nét, mô tả vật liệu, hướng dẫn chọn size chuẩn, và tính năng "Sản phẩm liên quan" (Related Products) để Upsell/Cross-sell.

### 4.2. Xây dựng Dòng chức năng cốt lõi
Hệ thống TMĐT ShoesStore không chỉ là giao diện mà là quá trình xử lý nghiệp vụ sâu sắc phía sau:
1. **Catalog Management (Trưng bày sản phẩm):** Quản lý toàn bộ danh sách sản phẩm. Backend Java trả về dữ liệu JSON, Frontend Next.js render (hiển thị) thành các thẻ (cards) đẹp mắt.
2. **Shopping Cart (Giỏ hàng):** Nơi lưu trữ tạm thời các đôi giày khách hàng chọn. Giỏ hàng có thể được lưu trữ qua `Cookies/LocalStorage` ở máy Client hoặc đồng bộ với Database ở Server để giữ lại giỏ hàng khi người dùng đổi thiết bị.
3. **Transaction Processing (Xử lý giao dịch - Checkout):** Đây là bước quan trọng nhất. Giao diện thu thập thông tin nhận hàng, chọn phương thức thanh toán, tính toán tổng tiền (kể cả phí vận chuyển, thuế). Nếu thành công, hệ thống sinh ra một `OrderID` duy nhất để truyền sang bên Thanh toán.

### 4.3. Quản trị hệ thống (Admin Dashboard)
Website cần có một không gian dành riêng cho Ban quản trị (Cần đăng nhập với quyền ROLE_ADMIN).
- **Quản lý sản phẩm:** Thêm mới, chỉnh sửa thông tin, giá cả và hình ảnh của giày.
- **Xử lý đơn hàng:** Xem danh sách đơn hàng, cập nhật trạng thái từ `Pending` (Chờ xử lý) sang `Shipping` (Đang giao) và `Delivered` (Đã giao).
- **Thống kê (Analytics):** Theo dõi số lượng đơn hàng, tổng doanh thu theo tháng, và danh sách các sản phẩm bán chạy nhất để điều chỉnh chiến lược nhập hàng.

---

## CHƯƠNG 5. MARKETING VÀ TIẾP THỊ ĐIỆN TỬ

### 5.1. Vai trò của Marketing Điện tử
"Website tốt không tự sinh ra khách hàng". Marketing là chiếc cầu nối quyết định lượng Traffic (Lượt truy cập) và Conversion Rate (Tỷ lệ chuyển đổi mua hàng) của ShoesStore.
Công thức đo lường doanh thu cơ bản: **Doanh thu = Traffic × Conversion Rate × Giá trị trung bình đơn hàng (AOV)**.

### 5.2. Phễu chuyển đổi (Conversion Funnel) và Hành vi người tiêu dùng
Hành vi mua sắm trực tuyến đối với mặt hàng giày dép có nhiều khác biệt so với offline: Khách hàng không được trực tiếp chạm vào vật lý sản phẩm hay thử size. Do đó, rủi ro nhận thức là rất cao.
Phễu Marketing của ShoesStore đi qua các giai đoạn:
1. **Nhận biết (Awareness):** Thu hút khách hàng qua quảng cáo Facebook Ads, Google Search.
2. **Quan tâm & Cân nhắc (Interest & Consideration):** Khách hàng xem trang chi tiết sản phẩm. Ở giai đoạn này, **Social Proof (Bằng chứng xã hội)** là yếu tố quyết định. Hệ thống hiển thị Rating (đánh giá sao) và Review (bình luận) từ những người mua trước để giảm rủi ro tâm lý.
3. **Hành động (Action):** Thúc đẩy khách hàng nhấn "Thanh toán" bằng các mã giảm giá giới hạn thời gian (FOMO).
4. **Trung thành (Loyalty):** Chăm sóc khách hàng sau mua thông qua Email Marketing tự động (gửi mã giảm giá cho lần mua tiếp theo), từ đó giảm chi phí Customer Acquisition Cost (CAC).

### 5.3. Chiến lược Marketing Ngắn hạn vs Dài hạn
- **Ngắn hạn (SEM, PPC):** Sử dụng các công cụ trả phí như Google Ads, quảng cáo Facebook để lập tức đẩy lượng truy cập vào các mẫu giày mới ra mắt. Ưu điểm là có kết quả nhanh, nhưng ngừng chi tiền là ngừng có khách.
- **Dài hạn (SEO, Cá nhân hóa):** Tối ưu hóa công cụ tìm kiếm (SEO) thông qua kiến trúc Next.js SSR. Áp dụng "Tiếp thị 1-1" (1-to-1 Marketing): Dựa trên dữ liệu tài khoản (`Customer Profile`), hệ thống tự động gợi ý các mẫu giày thể thao cho khách hàng từng mua giày chạy bộ (Personalization).

---

## CHƯƠNG 6. THANH TOÁN ĐIỆN TỬ

### 6.1. Tổng quan các hình thức Thanh toán Điện tử
Thanh toán là bước then chốt biến một thao tác trên website thành doanh thu thực tế.
- **COD (Cash On Delivery):** Thanh toán khi nhận hàng. Phổ biến tại Việt Nam, mang lại cảm giác an toàn cho khách hàng nhưng rủi ro cao cho doanh nghiệp (tỷ lệ hoàn đơn, bom hàng cao, tốn chi phí logistics).
- **Thanh toán trực tuyến:** Thẻ tín dụng, chuyển khoản ngân hàng, hoặc Ví điện tử (E-wallet). Các hình thức này giúp doanh nghiệp tự động hóa quá trình xử lý, đảm bảo doanh thu ngay khi đơn hàng được đặt.

### 6.2. Kiến trúc Hệ thống Thanh toán tại ShoesStore
Để giảm thiểu rủi ro lưu trữ thông tin thẻ nhạy cảm và đơn giản hóa thủ tục pháp lý, ShoesStore KHÔNG tự xây dựng bộ xử lý tài chính riêng. Thay vào đó, dự án tích hợp với **Payment Gateway (Cổng thanh toán trung gian)** như **MoMo / VNPAY** (sử dụng môi trường Sandbox để giả lập).

Các thành phần tham gia:
1. **Customer (Khách hàng):** Thao tác trên Web ShoesStore.
2. **Merchant (ShoesStore):** Hệ thống Backend Java tạo yêu cầu thanh toán.
3. **Payment Gateway (MoMo):** Hệ thống trung gian mã hóa, tiếp nhận và chuyển tiếp thông tin tới ngân hàng.
4. **Issuing Bank (Ngân hàng khách hàng):** Trừ tiền từ tài khoản.
5. **Acquiring Bank (Ngân hàng ShoesStore):** Ghi có doanh thu.

### 6.3. Quy trình Xử lý Thanh toán bằng Chữ ký số và Webhook (IPN)
Đây là quy trình kỹ thuật phức tạp và quan trọng nhất của hệ thống:
1. **Tạo URL Thanh toán (Authorization):**
   Khách hàng nhấn nút Checkout. Backend Java thu thập các tham số của đơn hàng (`OrderId`, `Amount`, `ReturnUrl`, `NotifyUrl`). Để tránh việc khách hàng dùng công cụ (như Burp Suite) sửa tham số (ví dụ sửa giá tiền từ 1.000.000đ xuống 10.000đ), Backend phải băm tất cả các tham số này cùng với một **Secret Key** (chỉ có Backend và MoMo biết) bằng thuật toán **HMAC-SHA256**. Kết quả mã băm (Signature) được đính kèm vào URL chuyển hướng.
2. **Khách hàng thanh toán trên nền tảng MoMo:**
   Giao diện MoMo mở ra, người dùng quét mã QR hoặc đăng nhập để chuyển tiền.
3. **Webhook / IPN (Instant Payment Notification):**
   Sau khi ngân hàng trừ tiền thành công, máy chủ MoMo gọi trực tiếp (Server-to-Server) một API Endpoint (ví dụ: `/api/payment/momo-ipn`) trên Backend ShoesStore.
   - *Bảo mật IPN:* Backend tiếp nhận thông báo, tính toán lại chữ ký số (Signature) dựa trên dữ liệu MoMo gửi sang và Secret Key của mình. Nếu hai chữ ký khớp nhau (Integrity) và địa chỉ IP gửi tới hợp lệ (IP Whitelisting), Backend sẽ cập nhật trạng thái đơn hàng trong Database từ `Pending` thành `Paid`.
   - *Tính Lũy đẳng (Idempotency):* Backend kiểm tra trạng thái đơn hàng trước khi cập nhật. Nếu đơn hàng đã "Paid", nó sẽ bỏ qua yêu cầu (phòng trường hợp mạng lag khiến MoMo gửi IPN nhiều lần), đảm bảo không bị cộng tiền sai.

---

## CHƯƠNG 7. BẢO MẬT VÀ PHÁP LÝ

### 7.1. Tư duy Bảo mật "Security by Design" và Tam giác CIA
Hệ thống TMĐT của ShoesStore được thiết kế theo nguyên tắc "Bảo mật từ khâu thiết kế" tuân theo Tam giác bảo mật CIA:
- **Confidentiality (Tính bảo mật):** Chỉ người dùng có thẩm quyền mới được truy cập dữ liệu. Mật khẩu khách hàng được mã hóa băm bằng thuật toán `Bcrypt` trước khi lưu vào Database.
- **Integrity (Tính toàn vẹn):** Đảm bảo dữ liệu không bị sửa đổi trái phép trên đường truyền thông qua Cơ chế Checksum (HMAC) trong quá trình thanh toán.
- **Availability (Tính sẵn sàng):** Website phải luôn hoạt động 24/7, kể cả trong các đợt bùng nổ truy cập (Sale).

### 7.2. Các Lỗ hổng Phổ biến và Giải pháp kỹ thuật tại ShoesStore
1. **SQL Injection:**
   Hacker chèn mã SQL độc hại vào các ô tìm kiếm hoặc đăng nhập nhằm xóa bảng dữ liệu hoặc vượt qua xác thực.
   *Giải pháp:* Backend sử dụng Spring Data JPA (Hibernate) với cơ chế Parameterized Queries, tự động mã hóa tham số truyền vào để vô hiệu hóa hoàn toàn SQL Injection.
2. **XSS (Cross-Site Scripting):**
   Hacker chèn mã JavaScript độc hại vào phần đánh giá (Review) sản phẩm. Khi Admin hoặc người dùng khác tải trang, script sẽ chạy và đánh cắp Token bảo mật.
   *Giải pháp:* React/Next.js tự động thoát (Escape) các ký tự đặc biệt (`<`, `>`, `&`) trước khi hiển thị (Sanitize Input).
3. **Broken Access Control (Lỗi phân quyền) & IDOR:**
   Người dùng A đổi ID trên URL để xem đơn hàng của Người dùng B.
   *Giải pháp:* Backend luôn kết hợp kiểm tra `OrderID` với `CustomerID` (được trích xuất từ JWT của người dùng hiện tại) để đảm bảo nguyên tắc đặc quyền tối thiểu (Least Privilege).

### 7.3. Xác thực Không Trạng thái (Stateless) với JWT
Thay vì sử dụng Session/Cookie truyền thống tốn tài nguyên RAM của Server và gặp khó khăn với lỗi CORS khi phân tách Frontend - Backend, ShoesStore áp dụng **JSON Web Token (JWT)**.
- Khi người dùng đăng nhập thành công, Backend tạo ra một JWT (chứa thông tin không nhạy cảm như `UserID`, `Role`, thời hạn `Exp`) và ký nó bằng Secret Key.
- Frontend lưu JWT này vào `LocalStorage` hoặc `HTTPOnly Cookie`.
- Ở các Request tiếp theo (ví dụ xem giỏ hàng), Frontend đính kèm JWT vào `Header: Authorization`. Backend dùng Secret Key kiểm tra tính hợp lệ của chữ ký để cấp quyền truy cập. Cơ chế này giúp Backend giảm tải hoàn toàn và dễ dàng mở rộng (Scale).

### 7.4. Bảo vệ Dữ liệu Truyền tải với HTTPS
Tất cả các API Endpoints và giao diện Website bắt buộc phải chạy trên giao thức HTTPS (HTTP + SSL/TLS). Điều này ngăn chặn cuộc tấn công Man-In-The-Middle (Hacker nghe lén trên đường truyền mạng). Trong môi trường phát triển (Local), có thể dùng công cụ như `Ngrok` để tạo một đường hầm HTTPS tạm thời, giúp nhận tín hiệu Webhook từ MoMo một cách an toàn.

---

## CHƯƠNG 8. ĐÁNH GIÁ, KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN

### 8.1. Đánh giá Kết quả Dự án
Dự án ShoesStore đã phân tích và thiết kế thành công một hệ thống TMĐT B2C hoàn chỉnh, đáp ứng đầy đủ các tiêu chuẩn kỹ thuật số hiện đại.
- **Về công nghệ:** Sự kết hợp giữa Next.js (đảm bảo SEO và tốc độ tải trang cực nhanh qua SSR) và Java Spring Boot (đảm bảo tính nhất quán, bảo mật chặt chẽ) tạo nên một nền tảng vững chắc.
- **Về chức năng:** Hệ thống xử lý trơn tru quy trình từ trưng bày sản phẩm, quản lý giỏ hàng, đặt hàng cho đến thanh toán trực tuyến qua Ví điện tử MoMo. Cơ chế IPN được xử lý chính xác, đảm bảo không có rủi ro về thất thoát tài chính.
- **Về bảo mật:** Hệ thống tuân thủ chặt chẽ các nguyên tắc bảo vệ quyền riêng tư người dùng, mã hóa dữ liệu nhạy cảm và phòng chống các lỗi bảo mật Web phổ biến theo tiêu chuẩn OWASP.

### 8.2. Hạn chế của Hệ thống Hiện tại
Dù đã hoàn thiện các tính năng cốt lõi, dự án vẫn còn một số điểm giới hạn:
- **Tích hợp Logistics:** Đơn hàng hiện tại mới chỉ được cập nhật trạng thái thủ công bởi Admin. Chưa có sự liên kết API với các đơn vị vận chuyển bên thứ ba (như Giao Hàng Nhanh, Viettel Post) để khách hàng tự động theo dõi mã vận đơn (Tracking).
- **Hỗ trợ khách hàng:** Thiếu vắng các công cụ giao tiếp thời gian thực như Live Chat hoặc Chatbot để hỗ trợ giải đáp thắc mắc về size giày.

### 8.3. Định hướng Phát triển và Mở rộng
Để nâng cao năng lực cạnh tranh và tối đa hóa trải nghiệm người dùng, hệ thống ShoesStore cần tập trung phát triển các hạng mục sau trong tương lai:
1. **Mở rộng Kiến trúc Microservices:** Khi quy mô tăng lên, thay vì duy trì khối Backend Monolithic, hệ thống có thể chia nhỏ thành các Service độc lập (Product Service, Order Service, Payment Service). Áp dụng hệ thống Message Queue (như RabbitMQ/Kafka) để xử lý bất đồng bộ các tác vụ như gửi Email xác nhận, giúp hệ thống chịu tải tốt hơn trong các đợt Flash Sale.
2. **Ứng dụng Trí tuệ Nhân tạo (AI):** Tích hợp thuật toán Recommendation System phân tích lịch sử mua hàng, lịch sử truy cập để cá nhân hóa việc gợi ý sản phẩm cho từng khách hàng, từ đó gia tăng Giá trị trung bình đơn hàng (AOV).
3. **Phát triển Đa kênh (Omnichannel):** Xây dựng ứng dụng di động (Mobile App) song song với Web, kết hợp điểm thưởng (Loyalty Program) dùng chung cho cả mua sắm Online và Offline tại cửa hàng vật lý, tạo ra trải nghiệm mua sắm đồng nhất và liền mạch.

---
*Báo cáo kết thúc.*