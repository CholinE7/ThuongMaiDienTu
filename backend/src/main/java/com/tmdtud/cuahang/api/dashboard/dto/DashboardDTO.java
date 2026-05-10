package com.tmdtud.cuahang.api.dashboard.dto;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDTO {
    private OrderStatsDTO orders;
    private RevenueStatsDTO revenue;
    private java.util.List<TopProductDTO> topProducts;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderStatsDTO {
        private long total;
        private long success;
        private long processing; // CONFIRMED + SHIPPING
        private long waitingPayment; // PENDING
        private long cancelled;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RevenueStatsDTO {
        private BigDecimal total;
        private BigDecimal success;
        private BigDecimal processing; // CONFIRMED + SHIPPING
        private BigDecimal waitingPayment; // PENDING
        private BigDecimal cancelled;
        private BigDecimal paid; // Thực tế đã thu
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TopProductDTO {
        private String name;
        private long quantity;
        private BigDecimal revenue;
    }
}
