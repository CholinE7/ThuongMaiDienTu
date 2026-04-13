package com.tmdtud.cuahang.api.order.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;

import com.tmdtud.cuahang.api.customer.dto.CustomerDTO;
import com.tmdtud.cuahang.api.customer.dto.CustomerSummaryDTO;
import com.tmdtud.cuahang.api.employer.dto.EmployerSummaryDTO;
import com.tmdtud.cuahang.api.order.model.OrderStatus;
import com.tmdtud.cuahang.api.supplier.dto.SupplierDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO{
    private Long id;

    private Timestamp created_at;

    private Timestamp updated_at;

    private BigDecimal totalPrice;

    private int deleted;

    private OrderStatus status;

    private CustomerSummaryDTO customer;

    private EmployerSummaryDTO employer;

    private String method;
}
