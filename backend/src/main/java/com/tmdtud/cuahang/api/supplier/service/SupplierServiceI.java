package com.tmdtud.cuahang.api.supplier.service;

import org.springframework.data.domain.Pageable;

import com.tmdtud.cuahang.api.supplier.dto.SupplierDTO;
import com.tmdtud.cuahang.common.response.PageResponse;


public interface SupplierServiceI {
    public PageResponse<SupplierDTO> getAll(Pageable pageable);
    public SupplierDTO getById(Long id);
    public void delete(Long id);
    public void add(SupplierDTO supplier);
    public void update(SupplierDTO supplier);
}
