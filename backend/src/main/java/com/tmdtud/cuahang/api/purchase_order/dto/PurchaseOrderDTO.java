package com.tmdtud.cuahang.api.purchase_order.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import com.tmdtud.cuahang.api.customer.model.Customers;
import com.tmdtud.cuahang.api.employer.model.Employers;
import com.tmdtud.cuahang.api.supplier.model.Suppliers;

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
    private Long id;

    private Timestamp created_at;

    private Timestamp updated_at;

    private BigDecimal totalPrice;

    private Suppliers supplier;

    private Employers employer;

    private String method;
}
