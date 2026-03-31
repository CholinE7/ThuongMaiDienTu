package com.tmdtud.cuahang.api.category;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tmdtud.cuahang.api.category.dto.CategoryDTO;
import com.tmdtud.cuahang.api.category.request.CategoryStoreRequest;
import com.tmdtud.cuahang.api.category.request.CategoryUpdateRequest;
import com.tmdtud.cuahang.api.category.service.CategoryService;
import com.tmdtud.cuahang.common.response.ApiResponse;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("api/categories")
@RestController
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ApiResponse<PageResponse<CategoryDTO>> getAll(
        @RequestParam(value = "page_no", defaultValue = "0") int page,
        @RequestParam(value = "page_size", defaultValue = "10") int size,
        @RequestParam(defaultValue = "id") String sortBy,
        @RequestParam(defaultValue = "asc") String sortDir
    ){
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
            ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        
        Pageable pageable = PageRequest.of(page, size, sort);

        return ApiResponse.success(categoryService.getAll(pageable));
    }

    @PostMapping()
    public ApiResponse<CategoryDTO> add(@Validated @RequestBody CategoryStoreRequest request){
        return ApiResponse.success(categoryService.add(request));
    }

    @GetMapping("/{id}")
    public ApiResponse<CategoryDTO> getById(@PathVariable Long id){
        return ApiResponse.success(categoryService.getById(id));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Boolean> delete(@PathVariable Long id){
        return ApiResponse.success(categoryService.delete(id));
    }

    @PutMapping()
    public ApiResponse<CategoryDTO> update(@Validated @RequestBody CategoryUpdateRequest request){
        return ApiResponse.success(categoryService.update(request));
    }
}
