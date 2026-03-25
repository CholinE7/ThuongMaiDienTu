package com.tmdtud.cuahang.api.customer.dto;

import java.sql.Timestamp;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
    private UUID id;
    private String fullName;
    private String email;
    private String phone;
    private String dateOfBirth;
    private String createdAt; 
}
