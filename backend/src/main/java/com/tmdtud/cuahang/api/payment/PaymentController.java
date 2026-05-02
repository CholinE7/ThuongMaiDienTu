package com.tmdtud.cuahang.api.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.tmdtud.cuahang.api.order.model.OrderStatus;
import com.tmdtud.cuahang.api.order.model.Orders;
import com.tmdtud.cuahang.api.order.service.OrderService;
import com.tmdtud.cuahang.common.config.MomoConfig;
import com.tmdtud.cuahang.common.response.ApiResponse;
import com.tmdtud.cuahang.common.service.SseService;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private SseService sseService;

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/momo/create_payment")
    public ApiResponse<Map<String, Object>> createMomoPayment(@RequestParam Long orderId) {
        Orders order = orderService.getById(orderId);
        if (order == null) {
            return ApiResponse.error(404, "Đơn hàng không tồn tại");
        }

        String requestId = UUID.randomUUID().toString();
        String orderInfo = "Thanh toan don hang #" + order.getId();
        String amount = String.valueOf(order.getTotalPrice().longValue());
        String orderReference = order.getId().toString();
        String extraData = ""; // Có thể dùng để gửi thêm thông tin nếu cần

        // Tạo chữ ký (Signature) theo chuẩn MoMo
        // rawSignature: accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        String rawSignature = "accessKey=" + MomoConfig.ACCESS_KEY
                + "&amount=" + amount
                + "&extraData=" + extraData
                + "&ipnUrl=" + MomoConfig.NOTIFY_URL
                + "&orderId=" + orderReference
                + "&orderInfo=" + orderInfo
                + "&partnerCode=" + MomoConfig.PARTNER_CODE
                + "&redirectUrl=" + MomoConfig.REDIRECT_URL
                + "&requestId=" + requestId
                + "&requestType=captureWallet";

        String signature = MomoConfig.hmacSha256(rawSignature, MomoConfig.SECRET_KEY);

        // Tạo Request Body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("partnerCode", MomoConfig.PARTNER_CODE);
        requestBody.put("partnerName", "Test");
        requestBody.put("storeId", "MomoTestStore");
        requestBody.put("requestId", requestId);
        requestBody.put("amount", amount);
        requestBody.put("orderId", orderReference);
        requestBody.put("orderInfo", orderInfo);
        requestBody.put("redirectUrl", MomoConfig.REDIRECT_URL);
        requestBody.put("ipnUrl", MomoConfig.NOTIFY_URL);
        requestBody.put("lang", "vi");
        requestBody.put("extraData", extraData);
        requestBody.put("requestType", "captureWallet");
        requestBody.put("signature", signature);

        try {
            // Gọi API MoMo
            ResponseEntity<Map> response = restTemplate.postForEntity(MomoConfig.ENDPOINT, requestBody, Map.class);
            Map<String, Object> responseBody = response.getBody();

            if (responseBody != null && responseBody.get("payUrl") != null) {
                Map<String, Object> result = new HashMap<>();
                result.put("qrUrl", responseBody.get("payUrl")); // MoMo trả về link thanh toán (chứa QR)
                result.put("orderId", order.getId());
                result.put("amount", order.getTotalPrice());
                return ApiResponse.success(result);
            } else {
                return ApiResponse.error(500, "Lỗi từ MoMo: " + (responseBody != null ? responseBody.get("message") : "Unknown"));
            }
        } catch (Exception e) {
            return ApiResponse.error(500, "Lỗi kết nối MoMo: " + e.getMessage());
        }
    }

    /**
     * Endpoint nhận thông báo Webhook (IPN) từ MoMo
     */
    @PostMapping("/momo/confirm")
    public ResponseEntity<Void> confirmMomoPayment(@RequestBody Map<String, Object> payload) {
        System.out.println("MoMo IPN Payload: " + payload);

        // 1. Kiểm tra mã kết quả (resultCode = 0 là thành công)
        Object resultCodeObj = payload.get("resultCode");
        if (resultCodeObj != null && "0".equals(resultCodeObj.toString())) {
            String orderIdStr = (String) payload.get("orderId");
            Long orderId = Long.parseLong(orderIdStr);

            Orders order = orderService.getById(orderId);
            if (order != null && !"PAID".equals(order.getPaymentStatus())) {
                // 2. Cập nhật trạng thái đơn hàng
                order.setPaymentStatus("PAID");
                order.setStatus(OrderStatus.CONFIRMED);
                orderService.getOrderRepository().save(order);

                // 3. Thông báo Realtime cho Frontend qua SSE
                sseService.sendToAll(Map.of(
                    "orderId", order.getId(),
                    "status", "PAID",
                    "message", "MoMo payment successful"
                ));
            }
        }

        // Trả về 204 No Content cho MoMo
        return ResponseEntity.noContent().build();
    }
}
