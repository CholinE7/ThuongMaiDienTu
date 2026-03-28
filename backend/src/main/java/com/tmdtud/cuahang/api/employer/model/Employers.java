package com.tmdtud.cuahang.api.employer.model;

import java.math.BigDecimal;

import com.tmdtud.cuahang.common.model.Users;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Table(name = "employers")
@Entity
@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class Employers extends Users{

    @NotNull(message = "salary not null")  // ← Kiểm tra null
    @DecimalMin(value = "0.0", inclusive = false, message = "salary must be greater than 0")
    // ← Kiểm tra > 0
    private BigDecimal salary;
    
}
