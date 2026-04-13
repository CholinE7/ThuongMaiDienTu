package com.tmdtud.cuahang.api.supplier.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tmdtud.cuahang.api.supplier.model.Suppliers;
import com.tmdtud.cuahang.api.supplier.repository.SupplierRepository;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Service
@Data
@RequiredArgsConstructor
public class SupplierService implements SupplierServiceI {

    private final SupplierRepository supplier;

    @Override
    public PageResponse<Suppliers> getAll(Pageable pageable) {
        Page<Suppliers> suppliers = supplier.findAll(pageable);
        return new PageResponse<Suppliers>(suppliers);
    }

    @Override
    public void add(Suppliers supplier) {
        // TODO Auto-generated method stub

    }

    @Override
    public void delete(Long id) {
        // TODO Auto-generated method stub

    }

    @Override
    public Suppliers getById(Long id) {
        return supplier.findById(id).orElse(null);
    }

    @Override
    public void update(Suppliers supplier) {
        // TODO Auto-generated method stub

    }

}
