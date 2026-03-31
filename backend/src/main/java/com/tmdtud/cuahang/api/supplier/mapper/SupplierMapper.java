package com.tmdtud.cuahang.api.supplier.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import com.tmdtud.cuahang.api.supplier.dto.SupplierDTO;
import com.tmdtud.cuahang.api.supplier.model.Suppliers;



@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface SupplierMapper {
    SupplierDTO toDTO(Suppliers supplier);
}
