package com.tmdtud.cuahang.api.purchase_order.response;

import com.tmdtud.cuahang.api.customer.model.Customers;
import com.tmdtud.cuahang.api.employer.model.Employers;
import com.tmdtud.cuahang.api.purchase_orders_detail.response.PurchaseOrderDetailResponse;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;


@Data
@Builder
public class PurchaseOrderResponse {
    private Long id;

    private String method;

    private Timestamp created_at;

    private BigDecimal totalPrice;

    private String customerName;

    private String employerName;

    private List<PurchaseOrderDetailResponse> details;
}
