-- Database Schema for MySQL (XAMPP)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS orders_details;
DROP TABLE IF EXISTS purchase_orders_details;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS purchase_orders;
DROP TABLE IF EXISTS brands;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS suppliers;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS employers;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Categories
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Brands
CREATE TABLE brands (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    category_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_brands_categories FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 3. Suppliers
CREATE TABLE suppliers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- 4. Products
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    price DECIMAL(19, 2),
    quantity INTEGER,
    description TEXT,
    image_url VARCHAR(255),
    discount_percentage DECIMAL(5, 2) DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0,
    deleted INTEGER DEFAULT 0,
    category_id BIGINT,
    brand_id BIGINT,
    CONSTRAINT fk_products_categories FOREIGN KEY (category_id) REFERENCES categories(id),
    CONSTRAINT fk_products_brands FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- 5. Customers (Thêm street, ward, city)
CREATE TABLE customers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(255),
    street VARCHAR(255),
    ward VARCHAR(255),
    city VARCHAR(255),
    date_of_birth VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 6. Employers (Thêm street, ward, city)
CREATE TABLE employers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(255),
    street VARCHAR(255),
    ward VARCHAR(255),
    city VARCHAR(255),
    date_of_birth VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    salary DECIMAL(19, 2),
    status INTEGER DEFAULT 1
);

-- 7. Orders
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    method VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    total_price DECIMAL(19, 2),
    status VARCHAR(255),
    payment_status VARCHAR(255) DEFAULT 'PENDING',
    deleted INTEGER DEFAULT 0,
    employer_id BIGINT,
    customer_id BIGINT NOT NULL,
    CONSTRAINT fk_orders_employers FOREIGN KEY (employer_id) REFERENCES employers(id),
    CONSTRAINT fk_orders_customers FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- 8. Orders Details
CREATE TABLE orders_details (
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    cost DECIMAL(19, 2) NOT NULL,
    total DECIMAL(19, 2) NOT NULL,
    PRIMARY KEY (order_id, product_id),
    CONSTRAINT fk_orders_details_orders FOREIGN KEY (order_id) REFERENCES orders(id),
    CONSTRAINT fk_orders_details_products FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 9. Purchase Orders
CREATE TABLE purchase_orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    method VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    total_price DECIMAL(19, 2),
    status VARCHAR(255),
    deleted INTEGER DEFAULT 0,
    employer_id BIGINT NOT NULL,
    supplier_id BIGINT NOT NULL,
    CONSTRAINT fk_purchase_orders_employers FOREIGN KEY (employer_id) REFERENCES employers(id),
    CONSTRAINT fk_purchase_orders_suppliers FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

-- 10. Purchase Orders Details
CREATE TABLE purchase_orders_details (
    purchase_order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    cost DECIMAL(19, 2) NOT NULL,
    total DECIMAL(19, 2) NOT NULL,
    PRIMARY KEY (purchase_order_id, product_id),
    CONSTRAINT fk_po_details_orders FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id),
    CONSTRAINT fk_po_details_products FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 11. Cart Items
CREATE TABLE cart_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    size VARCHAR(50),
    color VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cart_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 12. Indexes for Performance
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_cart_customer ON cart_items(customer_id);
