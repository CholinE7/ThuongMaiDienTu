package com.tmdtud.cuahang.api.supplier.mapper;

import com.tmdtud.cuahang.api.supplier.dto.SupplierDTO;
import com.tmdtud.cuahang.api.supplier.model.Suppliers;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-31T23:31:34+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class SupplierMapperImpl implements SupplierMapper {

    @Override
    public SupplierDTO toDTO(Suppliers supplier) {
        if ( supplier == null ) {
            return null;
        }

        SupplierDTO supplierDTO = new SupplierDTO();

        supplierDTO.setId( supplier.getId() );
        supplierDTO.setName( supplier.getName() );

        return supplierDTO;
    }
}
