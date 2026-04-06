package com.tmdtud.cuahang.api.supplier.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierDTO{
    @NotNull(message = "id not null")
    private Long id;

    @NotBlank(message = "name not empty")
    @NotNull(message = "name not null")
    private String name;
}
