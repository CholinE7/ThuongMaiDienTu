package com.tmdtud.cuahang.common.config;

public class MomoConfig {
    // Thông tin tài khoản nhận tiền của bạn
    public static String MOMO_PHONE = "0769505807";
    public static String MOMO_ACCOUNT_NAME = "Hồ Quốc Đạt";
    
    // Link API tạo QR (Sử dụng VietQR cho MoMo rất phổ biến và chuyên nghiệp)
    public static String getQrUrl(long amount, String orderId) {
        String addInfo = "THANH TOAN DON HANG " + orderId;
        // Chuyển đổi tên sang format URL (không dấu, %20 cho khoảng trắng)
        String encodedName = "HO%20QUOC%20DAT";
        return String.format("https://img.vietqr.io/image/momo-%s-compact2.jpg?amount=%d&addInfo=%s&accountName=%s", 
                             MOMO_PHONE, amount, addInfo.replace(" ", "%%20"), encodedName);
    }
}
