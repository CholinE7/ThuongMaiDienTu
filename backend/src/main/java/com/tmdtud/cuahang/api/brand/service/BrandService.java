package com.tmdtud.cuahang.api.brand.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tmdtud.cuahang.api.brand.dto.BrandDTO;
import com.tmdtud.cuahang.api.brand.mapper.BrandMapper;
import com.tmdtud.cuahang.api.brand.model.Brands;
import com.tmdtud.cuahang.api.brand.repository.BrandRepo;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BrandService implements BrandServiceI {

    private final BrandRepo brandRepo;
    private final BrandMapper brandMapper;

    @Override
    public BrandDTO add(Brands categories) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void delete(Long id) {
        // TODO Auto-generated method stub

    }

    @Override
    public PageResponse<BrandDTO> getAll(Pageable pageable) {
        Page<Brands> brands = brandRepo.findAll(pageable);
        return new PageResponse<BrandDTO>(brands.map(brand -> brandMapper.toDTO(brand)));
    }

    @Override
    public BrandDTO getById(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void update(Long id) {
        // TODO Auto-generated method stub

    }

}
