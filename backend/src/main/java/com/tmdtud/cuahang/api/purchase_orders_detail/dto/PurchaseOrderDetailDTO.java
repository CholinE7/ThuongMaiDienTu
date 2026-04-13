package com.tmdtud.cuahang.api.purchase_orders_detail.dto;

import java.math.BigDecimal;

import org.hibernate.annotations.CreationTimestamp;

import com.tmdtud.cuahang.api.customer.model.Customers;
import com.tmdtud.cuahang.api.employer.model.Employers;
import com.tmdtud.cuahang.api.product.dto.ProductSummaryDTO;
import com.tmdtud.cuahang.api.product.model.Products;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseOrderDetailDTO{
    private ProductSummaryDTO product;

    private int quantity;

    private BigDecimal cost;

    private BigDecimal total;
}
