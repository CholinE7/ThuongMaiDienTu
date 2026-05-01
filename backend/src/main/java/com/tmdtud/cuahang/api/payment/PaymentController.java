package com.tmdtud.cuahang.api.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tmdtud.cuahang.api.order.model.OrderStatus;
import com.tmdtud.cuahang.api.order.model.Orders;
import com.tmdtud.cuahang.api.order.service.OrderService;
import com.tmdtud.cuahang.common.config.MomoConfig;
import com.tmdtud.cuahang.common.response.ApiResponse;

import java.util.HashMap;
import java.util.Map;

import com.tmdtud.cuahang.common.service.SseService;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private SseService sseService;

    @GetMapping("/momo/create_payment")
    public com.tmdtud.cuahang.common.response.ApiResponse<Map<String, Object>> createMomoPayment(@RequestParam Long orderId) {
        Orders order = orderService.getById(orderId);
        if (order == null) {
            return com.tmdtud.cuahang.common.response.ApiResponse.error(404, "Đơn hàng không tồn tại");
        }

        String qrUrl = MomoConfig.getQrUrl(order.getTotalPrice().longValue(), order.getId().toString());
        
        Map<String, Object> data = new HashMap<>();
        data.put("qrUrl", qrUrl);
        data.put("phone", MomoConfig.MOMO_PHONE);
        data.put("accountName", MomoConfig.MOMO_ACCOUNT_NAME);
        data.put("amount", order.getTotalPrice());
        data.put("orderId", order.getId());

        return com.tmdtud.cuahang.common.response.ApiResponse.success(data);
    }

    @PostMapping("/momo/confirm")
    public com.tmdtud.cuahang.common.response.ApiResponse<String> confirmMomoPayment(@RequestParam Long orderId) {
        Orders order = orderService.getById(orderId);
        if (order == null) {
            return com.tmdtud.cuahang.common.response.ApiResponse.error(404, "Đơn hàng không tồn tại");
        }

        // Mô phỏng xác nhận thanh toán thành công
        order.setPaymentStatus("PAID");
        order.setStatus(OrderStatus.CONFIRMED);
        orderService.getOrderRepository().save(order);

        sseService.sendToAll(java.util.Map.of("orderId", order.getId(), "status", order.getStatus().toString()));

        return com.tmdtud.cuahang.common.response.ApiResponse.success("Thanh toán MoMo thành công!");
    }
}
