package com.tmdtud.cuahang.api.purchase_order.model;


import java.math.BigDecimal;
import java.sql.Timestamp;

import com.tmdtud.cuahang.api.purchase_order.OrderStatus;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.tmdtud.cuahang.api.employer.model.Employers;
import com.tmdtud.cuahang.api.supplier.model.Suppliers;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "purchase_orders")
@Entity
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class PurchaseOrders{
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String method;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp created_at;

    @UpdateTimestamp
    @Column
    private Timestamp updated_at;

    @Column
    private BigDecimal totalPrice;

    @Column
    private OrderStatus status;

    @ManyToOne
    @JoinColumn(name = "employer_id", nullable = false, foreignKey = @ForeignKey(name = "fk_PurchaseOrders_Employers"))
    private Employers employer;

    @ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false, foreignKey = @ForeignKey(name = "fk_PurchaseOrders_Suppliers"))
    private Suppliers suppliers;
}
