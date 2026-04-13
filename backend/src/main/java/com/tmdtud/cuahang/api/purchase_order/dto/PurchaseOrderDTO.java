package com.tmdtud.cuahang.api.purchase_order.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;

import com.tmdtud.cuahang.api.employer.dto.EmployerSummaryDTO;
import com.tmdtud.cuahang.api.supplier.dto.SupplierDTO;

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

    private SupplierDTO supplier;

    private EmployerSummaryDTO employer;

    private String method;
}
