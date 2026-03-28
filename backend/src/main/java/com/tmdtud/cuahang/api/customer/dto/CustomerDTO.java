package com.tmdtud.cuahang.api.customer.dto;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomerDTO {
    private UUID id;
    private String fullName;
    private String email;
    private String phone;
    private String dateOfBirth;
    private String createdAt; 
    private BigDecimal salary;
}
