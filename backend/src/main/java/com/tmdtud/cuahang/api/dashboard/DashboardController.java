package com.tmdtud.cuahang.api.dashboard;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tmdtud.cuahang.api.order.model.OrderStatus;
import com.tmdtud.cuahang.api.order.model.Orders;
import com.tmdtud.cuahang.api.order.repository.OrderRepository;
import com.tmdtud.cuahang.common.response.ApiResponse;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/stats")
    public ApiResponse<Map<String, Object>> getStats(
            @RequestParam(required = false) String fromDate,
            @RequestParam(required = false) String toDate) {
        
        LocalDate from = (fromDate != null && !fromDate.isEmpty()) ? LocalDate.parse(fromDate) : null;
        LocalDate to = (toDate != null && !toDate.isEmpty()) ? LocalDate.parse(toDate) : null;

        // Lấy tất cả đơn hàng (không phân trang để tính toán)
        List<Orders> allOrders = orderRepository.findAll().stream()
            .filter(o -> o.getDeleted() == 0)
            .filter(o -> {
                if (from == null && to == null) return true;
                LocalDate orderDate = o.getCreated_at().toLocalDateTime().toLocalDate();
                boolean matchFrom = (from == null || !orderDate.isBefore(from));
                boolean matchTo = (to == null || !orderDate.isAfter(to));
                return matchFrom && matchTo;
            }).toList();

        Map<String, Object> stats = new HashMap<>();
        
        // Thống kê số lượng
        Map<String, Long> orders = new HashMap<>();
        orders.put("total", (long) allOrders.size());
        orders.put("success", allOrders.stream().filter(o -> "PAID".equals(o.getPaymentStatus())).count());
        orders.put("pending", allOrders.stream().filter(o -> o.getStatus() == OrderStatus.PENDING).count());
        orders.put("cancelled", allOrders.stream().filter(o -> o.getStatus() == OrderStatus.CANCELLED).count());
        stats.put("orders", orders);

        // Thống kê doanh thu
        Map<String, BigDecimal> revenue = new HashMap<>();
        revenue.put("total", allOrders.stream().map(Orders::getTotalPrice).reduce(BigDecimal.ZERO, BigDecimal::add));
        revenue.put("success", allOrders.stream().filter(o -> "PAID".equals(o.getPaymentStatus())).map(Orders::getTotalPrice).reduce(BigDecimal.ZERO, BigDecimal::add));
        revenue.put("pending", allOrders.stream().filter(o -> o.getStatus() == OrderStatus.PENDING).map(Orders::getTotalPrice).reduce(BigDecimal.ZERO, BigDecimal::add));
        revenue.put("cancelled", allOrders.stream().filter(o -> o.getStatus() == OrderStatus.CANCELLED).map(Orders::getTotalPrice).reduce(BigDecimal.ZERO, BigDecimal::add));
        stats.put("revenue", revenue);

        return ApiResponse.success(stats);
    }
}
