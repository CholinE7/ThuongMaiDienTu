package com.tmdtud.cuahang.api.customer.mapper;

import com.tmdtud.cuahang.api.customer.dto.CustomerDTO;
import com.tmdtud.cuahang.api.customer.model.Customers;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-31T23:31:34+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class CustomerMapperImpl implements CustomerMapper {

    @Override
    public CustomerDTO toDTO(Customers customer) {
        if ( customer == null ) {
            return null;
        }

        CustomerDTO customerDTO = new CustomerDTO();

        customerDTO.setDateOfBirth( customer.getDateOfBirth() );
        customerDTO.setEmail( customer.getEmail() );
        customerDTO.setFullName( customer.getFullName() );
        customerDTO.setId( customer.getId() );
        customerDTO.setPhone( customer.getPhone() );
        customerDTO.setUsername( customer.getUsername() );

        return customerDTO;
    }
}
