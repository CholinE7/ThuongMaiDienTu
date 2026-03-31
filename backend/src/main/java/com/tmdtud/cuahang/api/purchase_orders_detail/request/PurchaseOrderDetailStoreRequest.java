package com.tmdtud.cuahang.api.purchase_orders_detail.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PurchaseOrderDetailStoreRequest {

    @NotNull(message = "id product not null")
    private Long productId;


    @NotNull(message = "quantity not null")
    private int quantity;

    @NotNull(message = "cost not null")
    @DecimalMin(value = "0.0", inclusive = false, message = "cost more than 0")
    private BigDecimal cost;

}
