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
    public PageResponse<CustomerDTO> getAll(Pageable pageable) {
        Page<Customers> customers = customer.findAll(pageable);
        return new PageResponse<CustomerDTO>(customers.map(customer -> customerMapper.toDTO(customer)));
    }

    @Override
    public void add(CustomerDTO customer) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void delete(int id) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public CustomerDTO getById(int id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void update(CustomerDTO customer) {
        // TODO Auto-generated method stub
        
    }
    
}
