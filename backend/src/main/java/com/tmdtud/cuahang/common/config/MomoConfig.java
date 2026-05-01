package com.tmdtud.cuahang.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MomoConfig {
    // === CẤU HÌNH MOMO SANDBOX (OFFICIAL API) ===
    public static final String PARTNER_CODE = "MOMOBKUN20180529";
    public static final String ACCESS_KEY = "klm056883M97063";
    
    @Value("${app.momo.secret}")
    private String secretKey;
    
    public static final String ENDPOINT = "https://test-payment.momo.vn/v2/gateway/api/create";
    public static final String REDIRECT_URL = "http://localhost:3000/payment/momo";
    public static final String NOTIFY_URL = "http://localhost:8080/api/payment/momo/confirm";

    // === THÔNG TIN TÀI KHOẢN CÁ NHÂN (VIETQR - DÙNG CHO QUÉT MÃ NHANH) ===
    public String momoPhone = "0769505807";
    public String momoAccountName = "Hồ Quốc Đạt";
    
    // Link API tạo QR (Sử dụng VietQR cho MoMo rất phổ biến và chuyên nghiệp)
    public String getQrUrl(long amount, String orderId) {
        String addInfo = "THANH TOAN DON HANG " + orderId;
        // Chuyển đổi tên sang format URL (không dấu, %20 cho khoảng trắng)
        String encodedName = "HO%20QUOC%20DAT";
        return String.format("https://img.vietqr.io/image/momo-%s-compact2.jpg?amount=%d&addInfo=%s&accountName=%s", 
                             momoPhone, amount, addInfo.replace(" ", "%20"), encodedName);
    }

    public String getSecretKey() {
        System.out.println(secretKey);
        return secretKey;
    }
}
