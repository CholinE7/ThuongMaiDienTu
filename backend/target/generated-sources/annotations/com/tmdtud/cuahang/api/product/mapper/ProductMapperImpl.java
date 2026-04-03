package com.tmdtud.cuahang.api.product.mapper;

import com.tmdtud.cuahang.api.product.dto.ProductDTO;
import com.tmdtud.cuahang.api.product.model.Products;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-04T01:46:49+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public ProductDTO toDTO(Products products) {
        if ( products == null ) {
            return null;
        }

        ProductDTO productDTO = new ProductDTO();

        productDTO.setBrand( products.getBrand() );
        productDTO.setCategory( products.getCategory() );
        productDTO.setDescription( products.getDescription() );
        productDTO.setId( products.getId() );
        productDTO.setName( products.getName() );
        productDTO.setPrice( products.getPrice() );
        productDTO.setQuantity( products.getQuantity() );

        return productDTO;
    }

    @Override
    public Products toEntity(ProductDTO product) {
        if ( product == null ) {
            return null;
        }

        Products.ProductsBuilder products = Products.builder();

        products.brand( product.getBrand() );
        products.category( product.getCategory() );
        products.description( product.getDescription() );
        products.id( product.getId() );
        products.name( product.getName() );
        products.price( product.getPrice() );
        products.quantity( product.getQuantity() );

        return products.build();
    }
}
