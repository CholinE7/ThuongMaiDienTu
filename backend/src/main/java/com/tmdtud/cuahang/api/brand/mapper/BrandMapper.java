package com.tmdtud.cuahang.api.brand.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import com.tmdtud.cuahang.api.brand.dto.BrandDTO;
import com.tmdtud.cuahang.api.brand.model.Brands;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface BrandMapper {
    BrandDTO toDTO(Brands brand);
}
