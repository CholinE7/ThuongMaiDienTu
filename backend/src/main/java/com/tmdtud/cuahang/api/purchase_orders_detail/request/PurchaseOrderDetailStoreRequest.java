package com.tmdtud.cuahang.api.purchase_orders_detail.request;

import java.math.BigDecimal;

import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseOrderDetailStoreRequest {
    @NotNull(message = "id product not null")
    private Long product_id;

    @NotNull(message = "id purchase_order not null")
    private Long purchase_order_id;

    @NotNull(message = "quantity not null")
    private int quantity;

    @NotNull(message = "cost not null")
    @DecimalMin(value = "0.0", inclusive = false, message = "cost more than 0")
    private BigDecimal cost;

    @NotNull(message = "cost not null")
    @DecimalMin(value = "0.0", inclusive = false, message = "total more than 0")
    private BigDecimal total;
}
