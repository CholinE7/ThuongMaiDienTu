package com.tmdtud.cuahang.api.category.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tmdtud.cuahang.api.brand.repository.BrandRepo;
import com.tmdtud.cuahang.api.category.dto.CategoryDTO;
import com.tmdtud.cuahang.api.category.mapper.CategoryMapper;
import com.tmdtud.cuahang.api.category.model.Categories;
import com.tmdtud.cuahang.api.category.repository.CategoryRepo;
import com.tmdtud.cuahang.api.category.request.CategoryStoreRequest;
import com.tmdtud.cuahang.api.category.request.CategoryUpdateRequest;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Service
public class CategoryService implements CategoryServiceI {

    private final CategoryRepo categoryRepo;
    private final CategoryMapper categoryMapper;
    private final BrandRepo brandRepo;

    @Override
    public CategoryDTO add(CategoryStoreRequest request) {
        Categories categories = Categories.builder()
                                    .name(request.getName()).build();
        return categoryMapper.toDTO(categoryRepo.save(categories));
    }

    @Override
    public Boolean delete(Long id) {
        brandRepo.setDefaultCategory(id);
        categoryRepo.deleteById(id);
        return true;
    }

    @Override
    public PageResponse<CategoryDTO> getAll(Pageable pageable) {
        Page<Categories> categories = categoryRepo.findAll(pageable);
        return new PageResponse<CategoryDTO>(categories.map(category -> categoryMapper.toDTO(category)));
    }

    @Override
    public CategoryDTO getById(Long id) {
        return categoryMapper.toDTO(categoryRepo.findById(id).orElse(null));
    }

    @Override
    public CategoryDTO update(CategoryUpdateRequest request) {
        Categories categories = categoryRepo.findById(request.getId()).orElse(null);

        categories.setName(request.getName());
        return categoryMapper.toDTO(categories);
    }
    
}
