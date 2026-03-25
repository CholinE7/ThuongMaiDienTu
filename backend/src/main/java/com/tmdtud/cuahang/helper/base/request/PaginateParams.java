package com.tmdtud.cuahang.helper.base.request;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaginateParams {
    @Min(1)
    private int page = 1;

    @Min(5)
    private int limit = 10;

    private String search;

    private boolean isPaginate = false;
}
