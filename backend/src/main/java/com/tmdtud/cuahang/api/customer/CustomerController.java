package com.tmdtud.cuahang.api.customer;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tmdtud.cuahang.api.customer.dto.CustomerDTO;
import com.tmdtud.cuahang.api.customer.service.CustomerService;
import com.tmdtud.cuahang.common.construct.BaseController;
import com.tmdtud.cuahang.common.response.ApiResponse;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("api/customers")
@Validated
@RequiredArgsConstructor
public class CustomerController extends BaseController {

    private final CustomerService customer;

    @GetMapping
    public ApiResponse<PageResponse<CustomerDTO>> getAll(
        @RequestParam(value = "page_no", defaultValue = "0") int page,
        @RequestParam(value = "page_size", defaultValue = "10") int size,
        @RequestParam(defaultValue = "id") String sortBy,
        @RequestParam(defaultValue = "asc") String sortDir
    ){
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return ApiResponse.success(customer.getAll(pageable));
    }

}
