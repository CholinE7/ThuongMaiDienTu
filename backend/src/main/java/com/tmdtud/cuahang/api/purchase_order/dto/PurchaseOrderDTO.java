package com.tmdtud.cuahang.api.purchase_order.dto;

import java.math.BigDecimal;

import org.hibernate.annotations.CreationTimestamp;

import com.tmdtud.cuahang.api.customer.model.Customers;
import com.tmdtud.cuahang.api.employer.model.Employers;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseOrderDTO{
    @NotNull(message = "id not null")
    private Long id;

    private String created_at;

    @DecimalMin(value = "0.0", inclusive = true)
    private BigDecimal totalPrice;

    @NotNull(message = "customer not null")
    private Customers customer;

    @NotNull(message = "employer not null")
    private Employers employer;

    @NotBlank(message = "method not empty")
    @NotNull(message = "method not null")
    private String method;
}
