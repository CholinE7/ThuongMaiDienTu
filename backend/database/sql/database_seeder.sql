-- ÉP KIỂU MÃ HÓA TIẾNG VIỆT
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- XÓA DỮ LIỆU CŨ
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_SAFE_UPDATES = 0;

DELETE FROM cart_items;
DELETE FROM orders_details;
DELETE FROM product_variants;
DELETE FROM products;
DELETE FROM orders;
DELETE FROM brands;
DELETE FROM categories;
DELETE FROM customers;
DELETE FROM employers;

SET FOREIGN_KEY_CHECKS = 1;
SET SQL_SAFE_UPDATES = 1;

-- =========================================================
-- 1. SEED CHO BẢNG CATEGORIES
-- =========================================================
INSERT INTO categories (id, name, created_at) VALUES 
(1, 'Giày Thể Thao Nam', '2026-04-01 08:00:00'),
(2, 'Giày Thể Thao Nữ', '2026-04-01 08:00:00'),
(3, 'Giày Thời Trang & Unisex', '2026-04-01 08:00:00');

-- =========================================================
-- 2. SEED CHO BẢNG BRANDS
-- =========================================================
INSERT INTO brands (id, name, category_id, created_at) VALUES 
(1, 'Nike', 1, '2026-04-05 09:00:00'),
(2, 'Adidas', 2, '2026-04-05 09:10:00'),
(3, 'Puma', 1, '2026-04-05 09:20:00'),
(4, 'Converse', 1, '2026-04-05 09:30:00'),
(5, 'Vans', 2, '2026-04-05 09:40:00'),
(6, 'New Balance', 1, '2026-04-05 09:50:00'),
(7, 'Reebok', 2, '2026-04-05 10:00:00'),
(8, 'Jordan', 1, '2026-04-05 10:10:00'),
(9, 'Biti''s Hunter', 3, '2026-04-05 10:20:00'),
(10, 'MLB', 3, '2026-04-05 10:30:00');

-- =========================================================
-- 3. SEED CHO BẢNG PRODUCTS (GIÁ THỰC TẾ)
-- =========================================================
INSERT INTO products 
(id, name, description, price, quantity, image_url, brand_id, category_id, deleted, discount_percentage, rating) 
VALUES 

(1, 'Nike Air Max 270', 'Giày chạy bộ cực êm với đế khí thế hệ mới', 3590000.00, 49,
'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800',
1, 1, 0, 10, NULL),

(2, 'Adidas Ultraboost 22', 'Hoàn trả năng lượng tối ưu cho mỗi bước chạy', 4290000.00, 30,
'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=800',
2, 2, 0, 15, NULL),

(3, 'Puma Suede Classic', 'Mẫu giày da lộn huyền thoại của Puma', 2190000.00, 45,
'https://images.unsplash.com/photo-1741627872564-7d4b1cbd91ac?q=80&w=1171&auto=format&fit=crop',
3, 3, 0, 20, NULL),

(4, 'Converse Chuck Taylor 70', 'Giày vải canvas phong cách vintage', 1890000.00, 100,
'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800',
4, 1, 0, 10, NULL),

(5, 'Nike Air Force 1', 'Biểu tượng của phong cách đường phố', 3290000.00, 50,
'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800',
1, 1, 0, 25, NULL),

(8, 'Nike Dunk Low Panda', 'Sự kết hợp tối giản đen và trắng', 3890000.00, 20,
'https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=800',
1, 1, 0, 10, NULL),

(9, 'Puma RS-X', 'Công nghệ đệm RS tiên tiến, cực êm', 2790000.00, 30,
'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800',
3, 1, 0, 15, NULL),

(11, 'Vans Old Skool Blue', 'Giày trượt ván kinh điển với tông xanh', 1690000.00, 60,
'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800',
5, 1, 0, 20, NULL),

(13, 'Nike Zoom Fly 5', 'Giày chạy bộ chuyên nghiệp cho marathon', 4990000.00, 25,
'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800',
1, 1, 0, 10, NULL),

(16, 'Adidas Stan Smith', 'Đôi giày tối giản nhất mọi thời đại', 2490000.00, 50,
'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800',
2, 2, 0, 25, NULL),

(17, 'Puma Cali Star', 'Cảm hứng từ bờ biển California đầy nắng', 2290000.00, 45,
'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800',
3, 2, 0, 10, NULL),

(18, 'Vans Authentic Cream', 'Thiết kế đơn giản cho mọi trang phục', 1590000.00, 70,
'https://images.unsplash.com/photo-1560072810-1cffb09faf0f?q=80&w=800',
5, 2, 0, 15, NULL),

(19, 'Nike Court Vision Low', 'Dáng vẻ bóng rổ trong phong cách hàng ngày', 2390000.00, 55,
'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800',
1, 2, 0, 20, NULL),

(20, 'New Balance 574 Women', 'Cổ điển và thoải mái tuyệt đối', 3190000.00, 40,
'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800',
6, 2, 0, 10, NULL),

(22, 'Puma Mayze Wedge', 'Đế cao hack chiều cao cực chuẩn', 2890000.00, 30,
'https://images.unsplash.com/photo-1605408499391-6368c628ef42?q=80&w=800',
3, 2, 0, 25, NULL),

(24, 'Nike Zoom Air Pegasus', 'Hỗ trợ chạy bộ tối ưu cho phái đẹp', 4290000.00, 20,
'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=800',
1, 2, 0, 10, NULL),

(25, 'Nike Air Jordan 1 Pair', 'Cặp đôi huyền thoại cho chàng và nàng', 6990000.00, 10,
'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=800',
8, 3, 0, 15, NULL),

(26, 'Adidas Superstar Couple', 'Mũi giày vỏ sò gắn kết tình yêu', 3990000.00, 15,
'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=800',
2, 3, 0, 20, NULL),

(27, 'Vans Slip-On Classic Pair', 'Tiện lợi và thời trang cho cả hai', 2790000.00, 20,
'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800',
5, 3, 0, 10, NULL),

(28, 'Biti''s Hunter Street Pair', 'Tự hào thương hiệu Việt, bền bỉ', 1790000.00, 30,
'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800',
9, 3, 0, 25, NULL),

(31, 'Nike Blazer Mid Pair', 'Kiểu dáng vintage cá tính cho couple', 4590000.00, 10,
'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800',
1, 3, 0, NULL, NULL),

(32, 'Adidas Gazelle Pair', 'Chất liệu da lộn sang trọng', 3790000.00, 18,
'https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=800',
2, 3, 0, NULL, NULL),

(33, 'New Balance 327 Pair', 'Thiết kế chữ N lớn phá cách', 5290000.00, 10,
'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=800',
6, 3, 0, NULL, NULL),

(34, 'Puma Roma Classic Pair', 'Vẻ đẹp cổ điển từ nước Đức', 2590000.00, 15,
'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800',
3, 3, 0, NULL, NULL),

(35, 'Nike Air Zoom Pegasus 39', 'Giày chạy bộ quốc dân với độ bền cực cao', 4690000.00, 50,
'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800',
1, 1, 0, NULL, NULL),

(36, 'Adidas Forum Low', 'Phong cách bóng rổ cổ điển thập niên 84', 3290000.00, 40,
'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800',
2, 2, 0, NULL, NULL),

(37, 'Puma Slipstream', 'Sự trở lại của huyền thoại bóng rổ', 3590000.00, 35,
'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800',
3, 1, 0, NULL, NULL),

(38, 'Converse Run Star Hike', 'Đế platform răng cưa phá cách', 2990000.00, 25,
'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800',
4, 1, 0, NULL, NULL),

(39, 'Vans Knu Skool', 'Xu hướng Puffy cực hot cho giới trẻ', 2190000.00, 60,
'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800',
5, 2, 0, NULL, NULL),

(40, 'New Balance 2002R', 'Sự kết hợp hoàn hảo giữa retro và hiện đại', 6590000.00, 20,
'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800',
6, 1, 0, NULL, NULL),

(41, 'Reebok Club C 85', 'Vẻ đẹp tối giản không bao giờ lỗi mốt', 1990000.00, 45,
'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800',
7, 2, 0, NULL, NULL),

(42, 'Air Jordan 4 Retro', 'Cơn sốt không bao giờ hạ nhiệt', 10990000.00, 15,
'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800',
8, 1, 0, NULL, NULL),

(43, 'Biti''s Hunter X Dusk', 'Phiên bản nâng cấp cực ngầu từ Biti''s', 1890000.00, 70,
'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800',
9, 3, 0, NULL, NULL),

(44, 'MLB Chunky Liner', 'Phong cách thời trang Hàn Quốc', 2890000.00, 50,
'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800',
10, 3, 0, NULL, NULL),

(45, 'Nike Air Max Pre-Day', 'Cảm hứng từ những năm 70', 3890000.00, 40,
'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800',
1, 1, 0, NULL, NULL),

(46, 'Adidas NMD R1', 'Đôi giày của những kẻ du hành', 4290000.00, 30,
'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=800',
2, 2, 0, NULL, NULL),

(47, 'Puma Suede Mayu', 'Thiết kế đế bánh mì thời thượng', 2490000.00, 25,
'https://images.unsplash.com/photo-1605408499391-6368c628ef42?q=80&w=800',
3, 2, 0, NULL, NULL),

(48, 'Converse Chuck 70 Plus', 'Sự biến tấu đầy tính nghệ thuật', 2990000.00, 30,
'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800',
4, 1, 0, NULL, NULL),

(49, 'Vans Sk8-Hi', 'Giày cổ cao huyền thoại', 2290000.00, 50,
'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800',
5, 2, 0, NULL, NULL),

(50, 'New Balance 550', 'Mẫu giày đang làm mưa làm gió', 5990000.00, 15,
'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=800',
6, 1, 0, NULL, NULL),

(51, 'Reebok Nano X2', 'Giày tập luyện đa năng tốt nhất', 3590000.00, 20,
'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800',
7, 2, 0, NULL, NULL),

(52, 'Air Jordan 11 Cherry', 'Sắc đỏ nổi bật cho kỳ nghỉ lễ', 12990000.00, 10,
'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800',
8, 1, 0, NULL, NULL),

(53, 'Biti''s Hunter Street Heritage', 'Tôn vinh giá trị đường phố Việt', 1690000.00, 100,
'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800',
9, 3, 0, NULL, NULL),

(54, 'MLB Big Ball Chunky A', 'Đôi giày quốc dân cho giới trẻ', 3190000.00, 45,
'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800',
10, 3, 0, NULL, NULL),
(55, 'Nike Cortez', 'Mẫu giày chạy bộ đầu tiên của Nike', 2490000.00, 40,
'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800',
1, 2, 0, NULL, NULL),

(56, 'Adidas Gazelle Bold', 'Đế cao 3 tầng cá tính cho nữ', 3590000.00, 25,
'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800',
2, 2, 0, NULL, NULL),

(57, 'Puma Palermo', 'Phong cách terrace từ những năm 80', 2790000.00, 30,
'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800',
3, 1, 0, NULL, NULL),

(58, 'Converse Weapon', 'Sự trở lại của giày bóng rổ biểu tượng', 3990000.00, 20,
'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800',
4, 1, 0, NULL, NULL),

(59, 'Vans Era', 'Thiết kế đơn giản, bền bỉ', 1590000.00, 80,
'https://images.unsplash.com/photo-1560072810-1cffb09faf0f?q=80&w=800',
5, 2, 0, NULL, NULL),

(60, 'New Balance 9060', 'Sự phá cách đầy táo bạo', 7490000.00, 10,
'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=800',
6, 1, 0, NULL, NULL),

(61, 'Reebok Classic Leather', 'Phong cách vintage thanh lịch', 2190000.00, 50,
'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800',
7, 2, 0, NULL, NULL),

(62, 'Air Jordan 3 White Cement', 'Một trong những phối màu đẹp nhất', 13990000.00, 5,
'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800',
8, 1, 0, NULL, NULL),

(63, 'Biti''s Hunter Street Black Line', 'Đơn giản nhưng đầy cuốn hút', 1790000.00, 60,
'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800',
9, 3, 0, NULL, NULL),

(64, 'MLB Chunky High', 'Giày cổ cao phong cách trẻ trung', 3390000.00, 35,
'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800',
10, 3, 0, NULL, NULL),

(65, 'Nike Vomero 5', 'Giày chạy bộ Retro đang cực hot', 5690000.00, 20,
'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800',
1, 1, 0, NULL, NULL),

(66, 'Adidas Samba OG Black', 'Mẫu giày must-have của năm', 3290000.00, 50,
'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=800',
2, 2, 0, NULL, NULL),

(67, 'Puma Deviate Nitro', 'Công nghệ carbon hỗ trợ tốc độ', 6990000.00, 15,
'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800',
3, 1, 0, NULL, NULL),

(68, 'Converse AS-1 Pro', 'Giày trượt ván chuyên nghiệp', 2490000.00, 25,
'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800',
4, 1, 0, NULL, NULL),

(69, 'Vans Half Cab', 'Thiết kế cổ lửng đặc trưng', 1990000.00, 30,
'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800',
5, 2, 0, NULL, NULL),

(70, 'New Balance 1906R', 'Sự trở lại của thiết kế kỹ thuật', 6290000.00, 18,
'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=800',
6, 1, 0, NULL, NULL),

(71, 'Reebok BB 4000 II', 'Giày bóng rổ cổ điển thời trang', 2790000.00, 40,
'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800',
7, 2, 0, NULL, NULL),

(72, 'Air Jordan 1 Mid Ice Blue', 'Màu xanh dịu mát cho mùa hè', 7490000.00, 12,
'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800',
8, 1, 0, NULL, NULL),

(73, 'Biti''s Hunter Street Sunrise', 'Lấy cảm hứng từ bình minh rực rỡ', 1890000.00, 50,
'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800',
9, 3, 0, NULL, NULL),

(74, 'MLB Playball Origin', 'Thiết kế canvas đơn giản tinh tế', 2590000.00, 55,
'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800',
10, 3, 0, NULL, NULL);

-- =========================================================
-- 4. SEED CHO BẢNG PRODUCT_VARIANTS
-- =========================================================

INSERT INTO product_variants (product_id, color, size, quantity) VALUES 

(1, 'Đen', '39', 10),
(1, 'Đen', '40', 10),
(1, 'Đen', '41', 10),
(1, 'Đen', '42', 10),
(1, 'Đen', '43', 9),

(1, 'Trắng', '39', 5),
(1, 'Trắng', '40', 5),
(1, 'Trắng', '41', 5),
(1, 'Trắng', '42', 5),
(1, 'Trắng', '43', 5),

(2, 'Trắng', '39', 10),
(2, 'Trắng', '40', 10),
(2, 'Trắng', '41', 10),

(2, 'Đỏ', '39', 5),
(2, 'Đỏ', '40', 5),

(3, 'Nâu', '41', 15),
(3, 'Nâu', '42', 15),

(3, 'Kem', '41', 10),
(3, 'Kem', '42', 5),

(4, 'Trắng', '39', 20),
(4, 'Trắng', '40', 20),
(4, 'Trắng', '41', 20),
(4, 'Trắng', '42', 20),
(4, 'Trắng', '43', 20),

(5, 'Trắng', '39', 10),
(5, 'Trắng', '40', 10),
(5, 'Trắng', '41', 10),
(5, 'Đen', '39', 10),
(5, 'Đen', '40', 10),

(8, 'Đen', '39', 5),
(8, 'Đen', '40', 5),
(8, 'Trắng', '39', 5),
(8, 'Trắng', '40', 5),

(9, 'Xám', '41', 15),
(9, 'Đỏ', '41', 15),

(11, 'Be', '39', 30),
(11, 'Trắng', '39', 30),

(13, 'Đỏ', '42', 10),
(13, 'Trắng', '42', 15),

(16, 'Trắng', '39', 25),
(16, 'Kem', '39', 25),

(17, 'Kem', '38', 20),
(17, 'Trắng', '38', 25),

(18, 'Trắng', '37', 35),
(18, 'Nâu', '37', 35),

(19, 'Trắng', '39', 25),
(19, 'Đen', '39', 30),

(20, 'Xám', '38', 20),
(20, 'Kem', '38', 20),

(22, 'Kem', '37', 15),
(22, 'Trắng', '37', 15),

(24, 'Đỏ', '38', 10),
(24, 'Trắng', '38', 10),

(25, 'Đỏ', '40', 5),
(25, 'Đen', '40', 5),

(26, 'Trắng', '41', 8),
(26, 'Đen', '41', 7),

(27, 'Trắng', '39', 10),
(27, 'Xám', '39', 10),

(28, 'Be', '42', 15),
(28, 'Xám', '42', 15),

(31, 'Trắng', '41', 5),
(31, 'Đỏ', '41', 5),

(32, 'Nâu', '40', 9),
(32, 'Be', '40', 9),

(33, 'Xám', '42', 5),
(33, 'Trắng', '42', 5),

(34, 'Trắng', '41', 8),
(34, 'Kem', '41', 7),

(35, 'Trắng', '40', 25),
(35, 'Đen', '41', 25),

(36, 'Trắng', '38', 20),
(36, 'Xanh', '39', 20),

(37, 'Trắng', '41', 15),
(37, 'Đen', '42', 20),

(38, 'Trắng', '40', 10),
(38, 'Đen', '41', 15),

(39, 'Trắng', '39', 30),
(39, 'Xám', '40', 30),

(40, 'Xám', '41', 10),
(40, 'Kem', '42', 10),

(41, 'Trắng', '38', 20),
(41, 'Kem', '39', 25),

(42, 'Trắng', '41', 5),
(42, 'Đen', '42', 10),

(43, 'Đen', '40', 35),
(43, 'Xám', '41', 35),

(44, 'Trắng', '40', 25),
(44, 'Đen', '41', 25),

(45, 'Trắng', '41', 20),
(45, 'Xám', '42', 20),

(46, 'Trắng', '38', 15),
(46, 'Đen', '39', 15),

(47, 'Trắng', '37', 10),
(47, 'Kem', '38', 15),

(48, 'Trắng', '40', 15),
(48, 'Đen', '41', 15),

(49, 'Trắng', '39', 25),
(49, 'Đen', '40', 25),

(50, 'Trắng', '41', 5),
(50, 'Xám', '42', 10),

(51, 'Trắng', '38', 10),
(51, 'Đen', '39', 10),

(52, 'Đỏ', '41', 5),
(52, 'Trắng', '42', 5),

(53, 'Trắng', '40', 50),
(53, 'Đen', '41', 50),

(54, 'Trắng', '40', 20),
(54, 'Kem', '41', 25),

(55, 'Trắng', '38', 20),
(55, 'Đen', '39', 20),

(56, 'Trắng', '37', 10),
(56, 'Xanh', '38', 15),

(57, 'Xanh', '41', 15),
(57, 'Vàng', '42', 15),

(58, 'Trắng', '41', 10),
(58, 'Đen', '42', 10),

(59, 'Trắng', '39', 40),
(59, 'Đen', '40', 40),

(60, 'Xám', '41', 5),
(60, 'Kem', '42', 5),

(61, 'Trắng', '38', 25),
(61, 'Đen', '39', 25),

(62, 'Trắng', '41', 2),
(62, 'Đen', '42', 3),

(63, 'Đen', '40', 30),
(63, 'Trắng', '41', 30),

(64, 'Trắng', '40', 15),
(64, 'Đen', '41', 20),

(65, 'Trắng', '41', 10),
(65, 'Bạc', '42', 10),

(66, 'Đen', '38', 25),
(66, 'Trắng', '39', 25),

(67, 'Trắng', '41', 5),
(67, 'Đỏ', '42', 10),

(68, 'Trắng', '40', 10),
(68, 'Đen', '41', 15),

(69, 'Trắng', '39', 15),
(69, 'Đen', '40', 15),

(70, 'Trắng', '41', 8),
(70, 'Xám', '42', 10),

(71, 'Trắng', '38', 20),
(71, 'Đen', '39', 20),

(72, 'Xanh', '41', 6),
(72, 'Trắng', '42', 6),

(73, 'Cam', '40', 25),
(73, 'Vàng', '41', 25),

(74, 'Trắng', '40', 25),
(74, 'Đen', '41', 30);


-- 5. SEED CHO BẢNG CUSTOMERS
INSERT INTO customers (id, username, password, full_name, email, phone, street, ward, city, status, created_at, date_of_birth) VALUES 
(1, 'hahodat1958@gmail.com', '$2a$12$oTc8gPWL89pAAYHqie.FcuvIWdgbqZLgEN7RNYCuckCSsXuPDC0Vu', 'quốc Đạt', 'hahodat1958@gmail.com', '0769505807', '138 nguyen van cu', '1', 'Ho Chi Minh', 1, '2026-05-01 09:40:05', '2026-05-09'),
(2, 'user2@gmail.com', '$2a$12$oTc8gPWL89pAAYHqie.FcuvIWdgbqZLgEN7RNYCuckCSsXuPDC0Vu', 'Trần Thị Người Dùng', 'user2@gmail.com', '0918889990', '456 Tây Sơn', 'Phường Quang Trung', 'Hà Nội', 1, '2026-05-01 10:00:00', NULL),
(3, 'user3@gmail.com', '$2a$12$oTc8gPWL89pAAYHqie.FcuvIWdgbqZLgEN7RNYCuckCSsXuPDC0Vu', 'Lê Hoàng Cường', 'user3@gmail.com', '0923456789', '78 Nguyễn Văn Linh', 'Phường Nam Dương', 'Đà Nẵng', 1, '2026-05-01 10:30:00', NULL);

-- 6. SEED CHO BẢNG EMPLOYERS
INSERT INTO employers (id, username, password, full_name, email, phone, street, ward, city, salary, status, created_at, date_of_birth) VALUES 
(1, 'admin@gmail.com', '$2a$12$oTc8gPWL89pAAYHqie.FcuvIWdgbqZLgEN7RNYCuckCSsXuPDC0Vu', 'Admin Hệ Thống', 'admin@gmail.com', '0988888888', '789 Nguyễn Huệ', 'Phường Bến Nghé', 'TP.HCM', 20000000.00, 1, '2026-04-01 08:00:00', NULL),
(2, 'staff@gmail.com', '$2a$12$oTc8gPWL89pAAYHqie.FcuvIWdgbqZLgEN7RNYCuckCSsXuPDC0Vu', 'Nhân Viên Bán Hàng', 'staff@gmail.com', '0977777777', '101 Trần Phú', 'Phường Hải Châu', 'Đà Nẵng', 10000000.00, 1, '2026-04-10 08:00:00', NULL);

-- 7. SEED CHO BẢNG ORDERS
INSERT INTO orders (id, customer_id, total_price, status, method, employer_id, city, full_name, phone, street, ward, payment_status, created_at, updated_at, deleted) VALUES 
(1, 1, 100000.00, 'PENDING', 'COD', 1, NULL, NULL, NULL, NULL, NULL, 'PENDING', '2026-05-01 10:00:00', '2026-05-01 10:00:00', 0),
(2, 2, 90000.00, 'DELIVERED', 'MOMO', 1, NULL, NULL, NULL, NULL, NULL, 'PAID', '2026-05-01 11:00:00', '2026-05-01 11:00:00', 0),
(6, 3, 125000.00, 'PENDING', 'COD', NULL, 'Ho Chi Minh', 'quốc Đạt', '0769505807', 'NG', '1', 'PENDING', '2026-05-01 10:24:45', '2026-05-01 10:24:45', 0),
(7, 3, 105000.00, 'DELIVERED', 'MOMO', 1, 'Ho Chi Minh', 'quốc Đạt', '0769505807', '138 nguyen van cu', '1', 'PAID', '2026-05-01 10:25:11', '2026-05-01 10:55:45', 0);

-- 8. SEED CHO BẢNG ORDERS_DETAILS
INSERT INTO orders_details (order_id, product_id, quantity, cost, total) VALUES 
(1, 1, 1, 100000.00, 100000.00),
(2, 3, 1, 90000.00, 90000.00),
(6, 2, 1, 120000.00, 120000.00),
(7, 1, 1, 100000.00, 100000.00);

-- 9. SEED CHO BẢNG CART_ITEMS
INSERT INTO cart_items (id, color, quantity, size, customer_id, product_id) VALUES
(6, 'Đen', 1, '39', 3, 1);
