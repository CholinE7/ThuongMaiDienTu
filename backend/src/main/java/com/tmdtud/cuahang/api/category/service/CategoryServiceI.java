package com.tmdtud.cuahang.api.category.service;

import org.springframework.data.domain.Pageable;

import com.tmdtud.cuahang.api.category.dto.CategoryDTO;
import com.tmdtud.cuahang.api.category.model.Categories;
import com.tmdtud.cuahang.common.response.PageResponse;

public interface CategoryServiceI {
    public PageResponse<CategoryDTO> getAll(Pageable pageable);
    public CategoryDTO getById(Long id);
    public void delete(Long id);
    public void update(Long id);
    public CategoryDTO add(Categories categories);
}
