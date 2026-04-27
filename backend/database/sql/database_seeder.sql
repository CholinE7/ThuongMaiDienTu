-- ÉP KIỂU MÃ HÓA TIẾNG VIỆT
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- XÓA DỮ LIỆU CŨ (Để nạp mới hoàn toàn)
SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM orders_details;
DELETE FROM purchase_orders_details;
DELETE FROM products;
DELETE FROM orders;
DELETE FROM purchase_orders;
DELETE FROM brands;
DELETE FROM categories;
DELETE FROM suppliers;
DELETE FROM customers;
DELETE FROM employers;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. SEED CHO BẢNG CATEGORIES
INSERT INTO categories (id, name) VALUES 
(1, 'mens-shoes'),
(2, 'womens-shoes'),
(3, 'sport-shoes'),
(4, 'sneakers');

-- 2. SEED CHO BẢNG BRANDS
INSERT INTO brands (id, name, category_id) VALUES 
(1, 'Nike', 1),
(2, 'Adidas', 2),
(3, 'Puma', 3),
(4, 'Converse', 4),
(5, 'Vans', 4);

-- 3. SEED CHO BẢNG SUPPLIERS
INSERT INTO suppliers (id, name) VALUES 
(1, 'Công ty giày Thượng Đình'),
(2, 'Tổng kho sỉ Miền Nam'),
(3, 'Nhà cung cấp quốc tế Global');

-- 4. SEED CHO BẢNG PRODUCTS
INSERT INTO products (id, name, description, price, quantity, image_url, brand_id, category_id, deleted) VALUES 
(1, 'Nike Air Max 270', 'Giày chạy bộ cực êm với đế khí thế hệ mới', 3500000, 50, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800', 1, 1, 0),
(2, 'Adidas Ultraboost 22', 'Hoàn trả năng lượng tối ưu cho mỗi bước chạy', 4200000, 30, 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=800', 2, 3, 0),
(3, 'Puma Suede Classic', 'Mẫu giày da lộn huyền thoại của Puma', 1800000, 45, 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/352634/03/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Men''s-Sneakers', 3, 4, 0),
(4, 'Converse Chuck Taylor 70', 'Giày vải canvas phong cách vintage', 1500000, 100, 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800', 4, 4, 0);

-- 5. SEED CHO BẢNG CUSTOMERS
INSERT INTO customers (id, username, password, full_name, email, phone, street, ward, city, status) VALUES 
(1, 'user1@gmail.com', '$2a$12$uYf/v1.fL9A6Mv8.D8vV6h1Ipxp6Wv0nUvMv6Xv6Xv6Xv6Xv6Xv6X', 'Nguyễn Khách Hàng', 'user1@gmail.com', '0901112223', '123 Lê Lợi', 'Phường Bến Nghé', 'TP.HCM', 1),
(2, 'user2@gmail.com', '$2a$12$uYf/v1.fL9A6Mv8.D8vV6h1Ipxp6Wv0nUvMv6Xv6Xv6Xv6Xv6Xv6X', 'Trần Thị Người Dùng', 'user2@gmail.com', '0918889990', '456 Tây Sơn', 'Phường Quang Trung', 'Hà Nội', 1);

-- 6. SEED CHO BẢNG EMPLOYERS
INSERT INTO employers (id, username, password, full_name, email, phone, street, ward, city, salary, status) VALUES 
(1, 'admin@gmail.com', '$2a$12$uYf/v1.fL9A6Mv8.D8vV6h1Ipxp6Wv0nUvMv6Xv6Xv6Xv6Xv6Xv6X', 'Admin Hệ Thống', 'admin@gmail.com', '0988888888', '789 Nguyễn Huệ', 'Phường Bến Nghé', 'TP.HCM', 20000000, 1),
(2, 'staff@gmail.com', '$2a$12$uYf/v1.fL9A6Mv8.D8vV6h1Ipxp6Wv0nUvMv6Xv6Xv6Xv6Xv6Xv6X', 'Nhân Viên Bán Hàng', 'staff@gmail.com', '0977777777', '101 Trần Phú', 'Phường Hải Châu', 'Đà Nẵng', 10000000, 1);

-- 7. SEED CHO BẢNG ORDERS
INSERT INTO orders (id, customer_id, total_price, status, method, employer_id) VALUES 
(1, 1, 3500000, 'PENDING', 'COD', 1),
(2, 2, 1800000, 'DELIVERED', 'MOMO', 1);

-- 8. SEED CHO BẢNG ORDERS_DETAILS
INSERT INTO orders_details (order_id, product_id, quantity, cost, total) VALUES 
(1, 1, 1, 3500000, 3500000),
(2, 3, 1, 1800000, 1800000);

-- 9. SEED CHO BẢNG PURCHASE_ORDERS
INSERT INTO purchase_orders (id, employer_id, supplier_id, total_price, status, method) VALUES 
(1, 1, 1, 5000000, 'COMPLETED', 'CASH'),
(2, 2, 2, 8000000, 'PENDING', 'BANK_TRANSFER');

-- 10. SEED CHO BẢNG PURCHASE_ORDERS_DETAILS
INSERT INTO purchase_orders_details (purchase_order_id, product_id, quantity, cost, total) VALUES 
(1, 1, 2, 2500000, 5000000),
(2, 2, 2, 4000000, 8000000);
