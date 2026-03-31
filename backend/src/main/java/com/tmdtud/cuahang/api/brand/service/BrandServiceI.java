package com.tmdtud.cuahang.api.brand.service;


import org.springframework.data.domain.Pageable;

import com.tmdtud.cuahang.api.brand.dto.BrandDTO;
import com.tmdtud.cuahang.api.brand.model.Brands;
import com.tmdtud.cuahang.common.response.PageResponse;

public interface BrandServiceI {
    public PageResponse<BrandDTO> getAll(Pageable pageable);

    public BrandDTO getById(Long id);

    public void delete(Long id);

    public void update(Long id);

    public BrandDTO add(Brands brands);
}
