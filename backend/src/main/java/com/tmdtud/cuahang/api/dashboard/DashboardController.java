package com.tmdtud.cuahang.api.dashboard;

import com.tmdtud.cuahang.api.dashboard.dto.DashboardDTO;
import com.tmdtud.cuahang.api.order.model.OrderStatus;
import com.tmdtud.cuahang.api.order.repository.OrderRepository;
import com.tmdtud.cuahang.common.response.ApiResponse;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public ApiResponse<DashboardDTO> getStats(
            @RequestParam(required = false) String fromDate,
            @RequestParam(required = false) String toDate) {

        java.time.LocalDateTime start = (fromDate != null && !fromDate.isEmpty())
                ? LocalDate.parse(fromDate).atStartOfDay()
                : null;
        java.time.LocalDateTime end = (toDate != null && !toDate.isEmpty())
                ? LocalDate.parse(toDate).atTime(23, 59, 59, 999999999)
                : null;

        // 1. Lấy dữ liệu tổng hợp theo status (Chỉ 1 câu Query)
        java.util.List<Object[]> stats = orderRepository.getStatsByStatus(start, end);

        long totalOrders = 0, successOrders = 0, processingOrders = 0, waitingPaymentOrders = 0, cancelledOrders = 0;
        java.math.BigDecimal totalRevenue = java.math.BigDecimal.ZERO;
        java.math.BigDecimal successRevenue = java.math.BigDecimal.ZERO;
        java.math.BigDecimal processingRevenue = java.math.BigDecimal.ZERO;
        java.math.BigDecimal waitingPaymentRevenue = java.math.BigDecimal.ZERO;
        java.math.BigDecimal cancelledRevenue = java.math.BigDecimal.ZERO;

        for (Object[] row : stats) {
            OrderStatus status = (OrderStatus) row[0];
            long count = (long) row[1];
            java.math.BigDecimal sum = (java.math.BigDecimal) row[2];

            totalOrders += count;
            totalRevenue = totalRevenue.add(sum);

            if (status == OrderStatus.DELIVERED) {
                successOrders = count;
                successRevenue = sum;
            } else if (status == OrderStatus.CANCELLED) {
                cancelledOrders = count;
                cancelledRevenue = sum;
            } else if (status == OrderStatus.PENDING) {
                waitingPaymentOrders = count;
                waitingPaymentRevenue = sum;
            } else {
                // CONFIRMED, SHIPPING gom vào Đang xử lý
                processingOrders += count;
                processingRevenue = processingRevenue.add(sum);
            }
        }

        // 2. Doanh thu thực tế (Đã thu tiền)
        java.math.BigDecimal paidRevenue = orderRepository.sumPaidRevenue(start, end);

        DashboardDTO.OrderStatsDTO orderStats = DashboardDTO.OrderStatsDTO.builder()
                .total(totalOrders).success(successOrders).processing(processingOrders)
                .waitingPayment(waitingPaymentOrders).cancelled(cancelledOrders).build();

        DashboardDTO.RevenueStatsDTO revenueStats = DashboardDTO.RevenueStatsDTO.builder()
                .total(totalRevenue).success(successRevenue).processing(processingRevenue)
                .waitingPayment(waitingPaymentRevenue).cancelled(cancelledRevenue).paid(paidRevenue).build();

        return ApiResponse.success(new DashboardDTO(orderStats, revenueStats));
    }
}
