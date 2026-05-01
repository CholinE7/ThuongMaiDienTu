package com.tmdtud.cuahang.api.product.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductStoreRequest {
    @NotBlank(message = "name not empty")
    @NotNull(message = "name not null")
    private String name;

    private String description;

    @NotNull(message = "price not null")
    @DecimalMin(value = "0.0", inclusive = false, message = "price more than 0")
    private BigDecimal price;

    @NotNull(message = "quanity not null")
    @Min(value = 0)
    private int quantity;

    @NotNull(message = "brand not null")
    private Long brand_id;

    @NotNull(message = "category not null")
    private Long category_id;

    private List<String> colors;
}
