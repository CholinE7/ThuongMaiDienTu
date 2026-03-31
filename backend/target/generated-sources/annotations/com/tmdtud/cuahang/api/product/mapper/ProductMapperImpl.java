package com.tmdtud.cuahang.api.product.mapper;

import com.tmdtud.cuahang.api.product.dto.ProductDTO;
import com.tmdtud.cuahang.api.product.model.Products;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-31T18:06:17+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.18 (Microsoft)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public ProductDTO toDTO(Products products) {
        if ( products == null ) {
            return null;
        }

        ProductDTO productDTO = new ProductDTO();

        productDTO.setId( products.getId() );
        productDTO.setName( products.getName() );
        productDTO.setDescription( products.getDescription() );
        productDTO.setPrice( products.getPrice() );
        productDTO.setQuantity( products.getQuantity() );
        productDTO.setBrand( products.getBrand() );
        productDTO.setCategory( products.getCategory() );

        return productDTO;
    }

    @Override
    public Products toEntity(ProductDTO product) {
        if ( product == null ) {
            return null;
        }

        Products.ProductsBuilder products = Products.builder();

        products.id( product.getId() );
        products.name( product.getName() );
        products.price( product.getPrice() );
        products.quantity( product.getQuantity() );
        products.description( product.getDescription() );
        products.category( product.getCategory() );
        products.brand( product.getBrand() );

        return products.build();
    }
}
