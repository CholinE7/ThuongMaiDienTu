package com.tmdtud.cuahang.api.purchase_orders_detail.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;


@Data
@Builder
public class PurchaseOrderDetailResponse {
    private Long productId;
    private String productName;
    private int quantity;
    private BigDecimal cost;
    private BigDecimal total;
}
