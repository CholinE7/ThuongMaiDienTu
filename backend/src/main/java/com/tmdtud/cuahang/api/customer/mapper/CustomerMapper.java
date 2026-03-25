package com.tmdtud.cuahang.api.customer.mapper;

import org.springframework.stereotype.Component;

import com.tmdtud.cuahang.api.customer.dto.CustomerDTO;
import com.tmdtud.cuahang.api.customer.model.Customer;

@Component
public class CustomerMapper {
    public CustomerDTO toDTO(Customer user) {
        return new CustomerDTO(
            user.getId(),
            user.getFullName(),
            user.getEmail(),
            user.getPhone(),
            user.getDateOfBirth(),
            user.getCreatedAt()
        );
    }
}
