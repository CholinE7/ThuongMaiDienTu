package com.tmdtud.cuahang.api.product.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.tmdtud.cuahang.api.product.model.Products;

@Repository
public interface ProductRepository extends JpaRepository<Products, Long> {

    @EntityGraph(attributePaths = { "category", "brand" })
    Optional<Products> findById(Long id);

    @EntityGraph(attributePaths = { "category", "brand" })
    org.springframework.data.domain.Page<Products> findAll(org.springframework.data.domain.Pageable pageable);

    @EntityGraph(attributePaths = { "category", "brand" })
    org.springframework.data.domain.Page<Products> findByNameContainingIgnoreCase(String name, org.springframework.data.domain.Pageable pageable);

    @EntityGraph(attributePaths = { "category", "brand" })
    org.springframework.data.domain.Page<Products> findByCategoryId(Long categoryId, org.springframework.data.domain.Pageable pageable);

    @EntityGraph(attributePaths = { "category", "brand" })
    org.springframework.data.domain.Page<Products> findByNameContainingIgnoreCaseAndCategoryId(String name, Long categoryId, org.springframework.data.domain.Pageable pageable);

    @EntityGraph(attributePaths = { "category", "brand" })
    List<Products> findAll();

    @Modifying
    @Query(value = "UPDATE products SET category_id = NULL, brand_id = NULL WHERE category_id = ?1", nativeQuery = true)
    int setDefaultCategoryAndBrandByCategory(Long categoryId);

    @Modifying
    @Query(value = "UPDATE products SET brand_id = NULL WHERE brand_id = ?1", nativeQuery = true)
    int setDefaultBrand(Long brandId);


}
