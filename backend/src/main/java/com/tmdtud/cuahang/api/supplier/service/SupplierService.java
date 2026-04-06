package com.tmdtud.cuahang.api.supplier.service;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tmdtud.cuahang.api.supplier.dto.SupplierDTO;
import com.tmdtud.cuahang.api.supplier.mapper.SupplierMapper;
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
    private final SupplierMapper supplerMapper;

    @Override
    public PageResponse<SupplierDTO> getAll(Pageable pageable) {
        Page<Suppliers> suppliers = supplier.findAll(pageable);
        return new PageResponse<SupplierDTO>(suppliers.map(supplier -> supplerMapper.toDTO(supplier)));
    }

    @Override
    public void add(SupplierDTO supplier) {
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
    public void update(SupplierDTO supplier) {
        // TODO Auto-generated method stub
        
    }
    
}
