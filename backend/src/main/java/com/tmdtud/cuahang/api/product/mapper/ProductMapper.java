package com.tmdtud.cuahang.api.product.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import com.tmdtud.cuahang.api.product.dto.ProductDTO;
import com.tmdtud.cuahang.api.product.model.Products;



@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ProductMapper {
    ProductDTO toDTO(Products products);
    
    Products toEntity(ProductDTO product);
}
