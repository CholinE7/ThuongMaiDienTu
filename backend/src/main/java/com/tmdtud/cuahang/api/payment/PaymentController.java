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

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/momo/create_payment")
    public ApiResponse<Map<String, Object>> createMomoPayment(@RequestParam Long orderId) {
        Orders order = orderService.getById(orderId);
        if (order == null) {
            return ApiResponse.error(404, "Đơn hàng không tồn tại");
        }

        String qrUrl = MomoConfig.getQrUrl(order.getTotalPrice().longValue(), order.getId().toString());
        
        Map<String, Object> data = new HashMap<>();
        data.put("qrUrl", qrUrl);
        data.put("phone", MomoConfig.MOMO_PHONE);
        data.put("accountName", MomoConfig.MOMO_ACCOUNT_NAME);
        data.put("amount", order.getTotalPrice());
        data.put("orderId", order.getId());

        return ApiResponse.success(data);
    }

    @PostMapping("/momo/confirm")
    public ApiResponse<String> confirmMomoPayment(@RequestParam Long orderId) {
        Orders order = orderService.getById(orderId);
        if (order == null) {
            return ApiResponse.error(404, "Đơn hàng không tồn tại");
        }

        // Mô phỏng xác nhận thanh toán thành công
        order.setPaymentStatus("PAID");
        order.setStatus(OrderStatus.CONFIRMED);
        orderService.getOrderRepository().save(order);

        return ApiResponse.success("Thanh toán MoMo thành công!");
    }
}
