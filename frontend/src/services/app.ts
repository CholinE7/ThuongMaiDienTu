// src/services/api.ts
const API_URL = "http://localhost:8080";

export const apiRequest = async (endpoint: string, method: string = "GET", body: any = null) => {
    // Lấy token từ localStorage
    let token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    
    // Làm sạch token (loại bỏ dấu ngoặc kép nếu có)
    if (token) {
        token = token.replace(/^["'](.+)["']$/, '$1').trim();
    }
    
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token && token !== "fail" ? { "Authorization": `Bearer ${token}` } : {}),
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        });
        return response;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};