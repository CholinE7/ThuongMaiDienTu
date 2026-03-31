package com.tmdtud.cuahang.api.category.service;

import org.springframework.data.domain.Pageable;

import com.tmdtud.cuahang.api.category.dto.CategoryDTO;
import com.tmdtud.cuahang.api.category.model.Categories;
import com.tmdtud.cuahang.api.category.request.CategoryStoreRequest;
import com.tmdtud.cuahang.api.category.request.CategoryUpdateRequest;
import com.tmdtud.cuahang.common.response.PageResponse;

public interface CategoryServiceI {
    public PageResponse<CategoryDTO> getAll(Pageable pageable);
    public CategoryDTO getById(Long id);
    public Boolean delete(Long id);
    public CategoryDTO update(CategoryUpdateRequest request);
    public CategoryDTO add(CategoryStoreRequest request);
}
