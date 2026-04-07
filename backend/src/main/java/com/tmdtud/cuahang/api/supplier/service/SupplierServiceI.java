package com.tmdtud.cuahang.api.supplier.service;

import org.springframework.data.domain.Pageable;

import com.tmdtud.cuahang.api.supplier.model.Suppliers;
import com.tmdtud.cuahang.common.response.PageResponse;

public interface SupplierServiceI {
    public PageResponse<Suppliers> getAll(Pageable pageable);

    public Suppliers getById(Long id);

    public void delete(Long id);

    public void add(Suppliers supplier);

    public void update(Suppliers supplier);
}
