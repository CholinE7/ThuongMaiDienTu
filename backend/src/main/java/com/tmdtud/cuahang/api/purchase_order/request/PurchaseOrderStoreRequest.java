package com.tmdtud.cuahang.api.purchase_order.request;

import java.math.BigDecimal;
import java.util.List;


import com.tmdtud.cuahang.api.purchase_orders_detail.request.PurchaseOrderDetailStoreRequest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseOrderStoreRequest {

    @DecimalMin(value = "0.0", inclusive = true)
    private BigDecimal totalPrice;

    @NotNull(message = "supplier not null")
    private Long supplier;

    @NotNull(message = "employer not null")
    private Long employer;

    @NotBlank(message = "method not empty")
    @NotNull(message = "method not null")
    private String method;

    @NotNull(message = "purchase_order_detail not null")
    @Valid
    private List<PurchaseOrderDetailStoreRequest> puchase_order_details;

}
