package com.tmdtud.cuahang.api.customer.mapper;

import com.tmdtud.cuahang.api.customer.dto.CustomerDTO;
import com.tmdtud.cuahang.api.customer.model.Customers;
import java.math.BigDecimal;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-28T13:18:54+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class CustomerMapperImpl implements CustomerMapper {

    @Override
    public CustomerDTO toDTO(Customers customer) {
        if ( customer == null ) {
            return null;
        }

        String createdAt = null;
        String dateOfBirth = null;
        String email = null;
        String fullName = null;
        UUID id = null;
        String phone = null;

        createdAt = customer.getCreatedAt();
        dateOfBirth = customer.getDateOfBirth();
        email = customer.getEmail();
        fullName = customer.getFullName();
        id = customer.getId();
        phone = customer.getPhone();

        BigDecimal salary = null;

        CustomerDTO customerDTO = new CustomerDTO( id, fullName, email, phone, dateOfBirth, createdAt, salary );

        return customerDTO;
    }
}
