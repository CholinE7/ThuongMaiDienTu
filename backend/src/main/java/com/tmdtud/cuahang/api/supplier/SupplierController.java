package com.tmdtud.cuahang.api.supplier;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tmdtud.cuahang.api.supplier.dto.SupplierDTO;
import com.tmdtud.cuahang.api.supplier.mapper.SupplierMapper;
import com.tmdtud.cuahang.api.supplier.model.Suppliers;
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
    private final SupplierMapper supplierMapper;

    @GetMapping
    public ApiResponse<PageResponse<SupplierDTO>> getAll(
            @RequestParam(value = "page_no", defaultValue = "0") int page,
            @RequestParam(value = "page_size", defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        PageResponse<Suppliers> pageResponse = supplier.getAll(pageable);
        List<SupplierDTO> supplierDTOs = pageResponse.getContent()
                                            .stream()
                                            .map(item -> {
                                                return supplierMapper.toDTO(item);
                                            })
                                            .toList();  
        PageResponse<SupplierDTO> pageResponse2 = PageResponse.<SupplierDTO>builder()
                                                    .content(supplierDTOs)
                                                    .num(pageResponse.getNum())
                                                    .size(pageResponse.getSize())
                                                    .total(pageResponse.getTotal()).build();
                                        
        return ApiResponse.success(pageResponse2);
    }

}
