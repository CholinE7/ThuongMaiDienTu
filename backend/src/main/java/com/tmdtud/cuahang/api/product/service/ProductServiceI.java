package com.tmdtud.cuahang.api.product.service;


import org.springframework.data.domain.Pageable;

import com.tmdtud.cuahang.api.product.model.Products;
import com.tmdtud.cuahang.api.product.request.ProductStoreRequest;
import com.tmdtud.cuahang.api.product.request.ProductUpdateRequest;
import com.tmdtud.cuahang.common.response.PageResponse;


public interface ProductServiceI {
    public PageResponse<Products> getAll(Pageable pageable);
    public Products getById(Long id);
    public boolean delete(Long id);
    public Products add(ProductStoreRequest product);
    public Products update(ProductUpdateRequest product);
    public int setCategoryAndBrandDefaultByCategory(Long categoryId);
    public int setDefaultBrand(Long brandId);
}
