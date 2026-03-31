package com.tmdtud.cuahang.api.purchase_order.model;


import java.math.BigDecimal;
import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import com.tmdtud.cuahang.api.customer.model.Customers;
import com.tmdtud.cuahang.api.employer.model.Employers;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    @Column
    private Timestamp created_at;

    @Column
    private BigDecimal totalPrice;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false, foreignKey = @ForeignKey(name = "fk_PurchaseOrders_Customers"))
    private Customers customer;

    @ManyToOne
    @JoinColumn(name = "employer_id", nullable = false, foreignKey = @ForeignKey(name = "fk_PurchaseOrders_Employers"))
    private Employers employer;
}
