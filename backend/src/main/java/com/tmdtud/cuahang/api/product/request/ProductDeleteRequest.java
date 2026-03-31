package com.tmdtud.cuahang.api.product.request;

import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Validated
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDeleteRequest{
    @NotNull(message = "id not null")
    private Long id;
}
