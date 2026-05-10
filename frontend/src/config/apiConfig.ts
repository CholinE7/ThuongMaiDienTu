/**
 * Cấu hình các API Endpoints cho ứng dụng
 * Dễ dàng thay đổi URL khi deploy (Production vs Development)
 */

// Ưu tiên lấy từ biến môi trường, nếu không có thì dùng localhost
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const API_ENDPOINTS = {
    // Auth
    LOGIN: "/login",
    REGISTER: "/register/customers",
    ME: "/api/auth/me",
    FORGOT_PASSWORD: "/forgot-password",

    // Products
    PRODUCTS: "/api/products",
    BEST_SELLERS: "/api/products/best-sellers",
    
    // Cart
    CART: "/api/cart",
    CART_CLEAR: "/api/cart/clear",

    // Orders
    ORDERS: "/api/orders",
    MY_ORDERS: "/api/orders/my-orders",
    ORDER_CANCEL: (id: number | string) => `/api/orders/${id}/cancel`,
    ORDER_STATUS: "/api/orders/status",
    ORDER_STREAM: "/api/orders/stream",

    // Customers & Employers
    CUSTOMERS: "/api/customers",
    EMPLOYERS: "/api/employers",

    // Payment
    MOMO_CREATE: "/api/payment/momo/create_payment",
    MOMO_SYNC: "/api/payment/momo/sync",
};
