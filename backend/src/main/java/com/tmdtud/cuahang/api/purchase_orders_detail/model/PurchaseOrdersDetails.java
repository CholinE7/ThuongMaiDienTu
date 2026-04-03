package com.tmdtud.cuahang.api.purchase_orders_detail.model;


import java.math.BigDecimal;
import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import com.tmdtud.cuahang.api.customer.model.Customers;
import com.tmdtud.cuahang.api.employer.model.Employers;
import com.tmdtud.cuahang.api.product.model.Products;
import com.tmdtud.cuahang.api.purchase_order.model.PurchaseOrders;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "purchase_orders_details")
@Entity
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class PurchaseOrdersDetails{
    @EmbeddedId
    private PurchaseOrdersDetailsId id;

    @ManyToOne
    @MapsId("purchase_order_id")
    @JoinColumn(name = "purchase_order_id", updatable = false)
    private PurchaseOrders purchaseOrder;

    @ManyToOne
    @MapsId("product_id")
    @JoinColumn(name = "product_id", updatable = false)
    private Products product;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private BigDecimal cost;

    @Column(nullable = false)
    private BigDecimal total;

    @Column(name = "created_at")
    @CreationTimestamp
    private Timestamp createdAt;

    @Column(name = "updated_at")
    @CreationTimestamp
    private Timestamp updatedAt;
}
