package com.tmdtud.cuahang.api.customer;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
@RequestMapping("/api/customers")
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

        return null;
    }
    @GetMapping("/{id}")
    public ApiResponse<CustomerDTO> getById(@PathVariable Long id) {
        return ApiResponse.success(customer.getById(id));
    }
    @PostMapping("/register/customers")
    public ResponseEntity<?> register(@RequestBody CustomerDTO customerDTO) {
        try {
            customer.add(customerDTO);
            return ResponseEntity.ok("Đăng ký thành công");
        } catch (RuntimeException e) {
            // Trả về mã 400 và nội dung lỗi (ví dụ: "Email này đã được sử dụng")
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
