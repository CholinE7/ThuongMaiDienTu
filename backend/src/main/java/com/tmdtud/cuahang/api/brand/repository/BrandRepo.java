package com.tmdtud.cuahang.api.brand.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tmdtud.cuahang.api.brand.model.Brands;

@Repository
public interface BrandRepo extends JpaRepository<Brands, Long>{

    
}
