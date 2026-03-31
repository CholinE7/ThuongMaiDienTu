package com.tmdtud.cuahang.api.brand.mapper;

import com.tmdtud.cuahang.api.brand.dto.BrandDTO;
import com.tmdtud.cuahang.api.brand.model.Brands;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-31T16:32:05+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class BrandMapperImpl implements BrandMapper {

    @Override
    public BrandDTO toDTO(Brands brand) {
        if ( brand == null ) {
            return null;
        }

        BrandDTO brandDTO = new BrandDTO();

        brandDTO.setCategory( brand.getCategory() );
        brandDTO.setId( brand.getId() );
        brandDTO.setName( brand.getName() );

        return brandDTO;
    }
}
