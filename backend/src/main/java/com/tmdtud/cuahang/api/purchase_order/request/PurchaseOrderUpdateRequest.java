package com.tmdtud.cuahang.api.purchase_order.request;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.validation.annotation.Validated;

import com.tmdtud.cuahang.api.purchase_orders_detail.request.PurchaseOrderDetailUpdateRequest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Validated
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseOrderUpdateRequest {
    @NotNull(message = "id not null")
    private Long id;

    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal totalPrice;

    @NotBlank(message = "method not empty")
    @NotNull(message = "method not null")
    private String method;

    @NotNull(message = "purchase_order_detail not null")
    @Valid
    private List<PurchaseOrderDetailUpdateRequest> puchase_order_details;

}
