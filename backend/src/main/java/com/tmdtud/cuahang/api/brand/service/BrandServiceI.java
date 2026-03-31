package com.tmdtud.cuahang.api.brand.service;


import org.springframework.data.domain.Pageable;

import com.tmdtud.cuahang.api.brand.dto.BrandDTO;
import com.tmdtud.cuahang.api.brand.model.Brands;
import com.tmdtud.cuahang.api.brand.request.BrandStoreRequest;
import com.tmdtud.cuahang.api.brand.request.BrandUpdateRequest;
import com.tmdtud.cuahang.common.response.PageResponse;

public interface BrandServiceI {
    public PageResponse<BrandDTO> getAll(Pageable pageable);

    public BrandDTO getById(Long id);

    public boolean delete(Long id);

    public BrandDTO update(BrandUpdateRequest request);

    public BrandDTO add(BrandStoreRequest request);
}
