package com.tmdtud.cuahang.api.brand.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tmdtud.cuahang.api.brand.dto.BrandDTO;
import com.tmdtud.cuahang.api.brand.mapper.BrandMapper;
import com.tmdtud.cuahang.api.brand.model.Brands;
import com.tmdtud.cuahang.api.brand.repository.BrandRepo;
import com.tmdtud.cuahang.api.brand.request.BrandStoreRequest;
import com.tmdtud.cuahang.api.brand.request.BrandUpdateRequest;
import com.tmdtud.cuahang.api.category.model.Categories;
import com.tmdtud.cuahang.api.category.repository.CategoryRepo;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BrandService implements BrandServiceI {

    private final BrandRepo brandRepo;
    private final CategoryRepo categoryRepo;
    private final BrandMapper brandMapper;

    @Override
    public BrandDTO add(BrandStoreRequest request) {
        Categories category = categoryRepo.findById(request.getCategory_id()).orElse(null);
        Brands brand = Brands.builder()
                        .category(category)
                        .name(request.getName()).build();
        return brandMapper.toDTO(brandRepo.save(brand));
    }

    @Override
    public boolean delete(Long id) {
        brandRepo.deleteById(id);
        return true;
    }

    @Override
    public PageResponse<BrandDTO> getAll(Pageable pageable) {
        Page<Brands> brands = brandRepo.findAll(pageable);
        return new PageResponse<BrandDTO>(brands.map(brand -> brandMapper.toDTO(brand)));
    }

    @Override
    public BrandDTO getById(Long id) {
        return brandMapper.toDTO(brandRepo.findById(id).orElse(null));
    }

    @Override
    public BrandDTO update(BrandUpdateRequest request) {
        Categories category = categoryRepo.findById(request.getCategory_id()).orElse(null);
        Brands brand = brandRepo.findById(request.getId()).orElse(null);

        brand.setCategory(category);
        brand.setName(request.getName());
        return brandMapper.toDTO(brandRepo.save(brand));
    }

}
