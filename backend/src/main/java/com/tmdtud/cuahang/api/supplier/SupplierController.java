package com.tmdtud.cuahang.api.supplier;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tmdtud.cuahang.api.product.dto.ProductDTO;
import com.tmdtud.cuahang.api.product.service.ProductService;
import com.tmdtud.cuahang.api.supplier.dto.SupplierDTO;
import com.tmdtud.cuahang.api.supplier.service.SupplierService;
import com.tmdtud.cuahang.common.construct.BaseController;
import com.tmdtud.cuahang.common.response.ApiResponse;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/suppliers")
@Validated
@RequiredArgsConstructor
public class SupplierController extends BaseController {

    private final SupplierService supplier;

    @GetMapping
    public ApiResponse<PageResponse<SupplierDTO>> getAll(
            @RequestParam(value = "page_no", defaultValue = "0") int page,
            @RequestParam(value = "page_size", defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return ApiResponse.success(supplier.getAll(pageable));
    }

}
