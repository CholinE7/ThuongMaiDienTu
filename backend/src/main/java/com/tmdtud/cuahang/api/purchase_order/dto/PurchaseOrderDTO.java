package com.tmdtud.cuahang.api.purchase_order.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;

import com.tmdtud.cuahang.api.employer.model.Employers;
import com.tmdtud.cuahang.api.supplier.model.Suppliers;

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
