// src/services/api.ts
const API_URL = "http://localhost:8080";

export const apiRequest = async (endpoint: string, method: string = "GET", body: any = null) => {
    // Lấy token từ localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
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