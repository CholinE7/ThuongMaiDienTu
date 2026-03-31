package com.tmdtud.cuahang.api.product;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tmdtud.cuahang.api.product.dto.ProductDTO;
import com.tmdtud.cuahang.api.product.request.ProductDeleteRequest;
import com.tmdtud.cuahang.api.product.request.ProductStoreRequest;
import com.tmdtud.cuahang.api.product.service.ProductService;
import com.tmdtud.cuahang.common.construct.BaseController;
import com.tmdtud.cuahang.common.response.ApiResponse;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/products")
@Validated
@RequiredArgsConstructor
public class ProductController extends BaseController {

    private final ProductService productSer;

    @GetMapping
    public ApiResponse<PageResponse<ProductDTO>> getAll(
            @RequestParam(value = "page_no", defaultValue = "0") int page,
            @RequestParam(value = "page_size", defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return ApiResponse.success(productSer.getAll(pageable));
    }

    @PostMapping()
    public ApiResponse<ProductDTO> add(@Validated @RequestBody ProductStoreRequest product){
        return ApiResponse.success(productSer.add(product));
    }

    @DeleteMapping
    public ApiResponse<Boolean> delete(@Validated @ModelAttribute ProductDeleteRequest request){
        return ApiResponse.success(productSer.delete(request.getId()));
    }

    @GetMapping("/{id}")
    public ApiResponse<ProductDTO> getById(@PathVariable Long id){
        return ApiResponse.success(productSer.getById(id));
    }
}
