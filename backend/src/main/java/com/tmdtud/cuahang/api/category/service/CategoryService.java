package com.tmdtud.cuahang.api.category.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tmdtud.cuahang.api.category.dto.CategoryDTO;
import com.tmdtud.cuahang.api.category.mapper.CategoryMapper;
import com.tmdtud.cuahang.api.category.model.Categories;
import com.tmdtud.cuahang.api.category.repository.CategoryRepo;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Service
public class CategoryService implements CategoryServiceI {

    private final CategoryRepo categoryRepo;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryDTO add(Categories categories) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void delete(Long id) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public PageResponse<CategoryDTO> getAll(Pageable pageable) {
        Page<Categories> categories = categoryRepo.findAll(pageable);
        return new PageResponse<CategoryDTO>(categories.map(category -> categoryMapper.toDTO(category)));
    }

    @Override
    public CategoryDTO getById(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void update(Long id) {
        // TODO Auto-generated method stub
        
    }
    
}
