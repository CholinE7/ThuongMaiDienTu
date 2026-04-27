package com.tmdtud.cuahang.api.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductSummaryDTO {
    private Long id;
    private String name;
    private String imageUrl;
}
