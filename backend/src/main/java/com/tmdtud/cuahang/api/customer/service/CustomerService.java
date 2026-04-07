package com.tmdtud.cuahang.api.customer.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tmdtud.cuahang.api.customer.dto.CustomerDTO;
import com.tmdtud.cuahang.api.customer.mapper.CustomerMapper;
import com.tmdtud.cuahang.api.customer.model.Customers;
import com.tmdtud.cuahang.api.customer.repository.CustomerRepository;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Service
@Data
@RequiredArgsConstructor
public class CustomerService implements CustomerServiceI {

    private final CustomerRepository customer;
    private final CustomerMapper customerMapper;

    @Override
    public PageResponse<Customers> getAll(Pageable pageable) {
        return null;
    }

    @Override
    public void add(Customers customer) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void delete(Long id) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public Customers getById(Long id) {
        return customer.findById(id).orElse(null);
    }

    @Override
    public void update(Customers customer) {
        // TODO Auto-generated method stub
        
    }
    
}
