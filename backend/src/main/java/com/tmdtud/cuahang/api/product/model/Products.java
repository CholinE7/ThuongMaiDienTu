package com.tmdtud.cuahang.api.product.model;

import java.math.BigDecimal;

import com.tmdtud.cuahang.api.brand.model.Brands;
import com.tmdtud.cuahang.api.category.model.Categories;

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

@Table(name = "products")
@Entity
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Products{
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @Column
    private BigDecimal price;

    @Column
    private int quantity;

    @Column
    private String description;

    @Column 
    private int deleted;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false, foreignKey = @ForeignKey(name = "fk_products_categories"))
    private Categories category;


    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false, foreignKey = @ForeignKey(name = "fk_products_brands"))
    private Brands brand;
}
