package com.tmdtud.cuahang.api.product.service;


import org.springframework.data.domain.Pageable;

import com.tmdtud.cuahang.api.product.dto.ProductDTO;
import com.tmdtud.cuahang.api.product.request.ProductStoreRequest;
import com.tmdtud.cuahang.api.product.request.ProductUpdateRequest;
import com.tmdtud.cuahang.common.response.PageResponse;


public interface ProductServiceI {
    public PageResponse<ProductDTO> getAll(Pageable pageable);
    public ProductDTO getById(Long id);
    public boolean delete(Long id);
    public ProductDTO add(ProductStoreRequest product);
    public ProductDTO update(ProductUpdateRequest product);
}
