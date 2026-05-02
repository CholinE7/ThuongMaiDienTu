package com.tmdtud.cuahang.common.config;

<<<<<<< Updated upstream
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
=======
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Formatter;

>>>>>>> Stashed changes
public class MomoConfig {
    // === CẤU HÌNH MOMO SANDBOX (OFFICIAL API) ===
    public static final String PARTNER_CODE = "MOMOBKUN20180529";
    public static final String ACCESS_KEY = "klm056883M97063";
    
    @Value("${app.momo.secret}")
    private String secretKey;
    
    public static final String ENDPOINT = "https://test-payment.momo.vn/v2/gateway/api/create";
    
    // Khi deploy lên Render/Railway, hãy đổi domain này thành domain thật của bạn
    public static final String REDIRECT_URL = "http://localhost:3000/orders"; 
    public static final String NOTIFY_URL = "http://localhost:8080/api/payment/momo/confirm";

    // === THÔNG TIN TÀI KHOẢN CÁ NHÂN (VIETQR - DÙNG CHO QUÉT MÃ NHANH) ===
    public String momoPhone = "0769505807";
    public String momoAccountName = "Hồ Quốc Đạt";
    
<<<<<<< Updated upstream
    // Link API tạo QR (Sử dụng VietQR cho MoMo rất phổ biến và chuyên nghiệp)
    public String getQrUrl(long amount, String orderId) {
=======
    public static String getQrUrl(long amount, String orderId) {
>>>>>>> Stashed changes
        String addInfo = "THANH TOAN DON HANG " + orderId;
        String encodedName = "HO%20QUOC%20DAT";
        return String.format("https://img.vietqr.io/image/momo-%s-compact2.jpg?amount=%d&addInfo=%s&accountName=%s", 
                             momoPhone, amount, addInfo.replace(" ", "%20"), encodedName);
    }

    public String getSecretKey() {
        System.out.println(secretKey);
        return secretKey;
    }

    // === HÀM TẠO CHỮ KÝ HMAC SHA256 ===
    public static String hmacSha256(String data, String key) {
        try {
            byte[] keyBytes = key.getBytes(StandardCharsets.UTF_8);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret_key = new SecretKeySpec(keyBytes, "HmacSHA256");
            sha256_HMAC.init(secret_key);
            
            byte[] hashBytes = sha256_HMAC.doFinal(dataBytes);
            return toHexString(hashBytes);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi tạo chữ ký HMAC SHA256", e);
        }
    }

    private static String toHexString(byte[] bytes) {
        Formatter formatter = new Formatter();
        for (byte b : bytes) {
            formatter.format("%02x", b);
        }
        return formatter.toString();
    }
}
