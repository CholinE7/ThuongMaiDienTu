package com.tmdtud.cuahang.api.product.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tmdtud.cuahang.api.product.model.Products;

@Repository
public interface ProductRepository extends JpaRepository<Products, Long> {

    @EntityGraph(attributePaths = { "category", "brand" })
    Optional<Products> findById(Long id);

    @EntityGraph(attributePaths = { "category", "brand" })
    List<Products> findAll();

    @Modifying
    @Query(value = "UPDATE product SET category_id = 0 and brand_id = 0 WHERE category_id = ?1")
    int setDefaultCategoryAndBrandByCategory(Long categoryId);

    @Modifying
    @Query(value = "UPDATE product SET brand_id = 0 WHERE brand_id = ?1")
    int setDefaultBrand(Long brandId);

}
