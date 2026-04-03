package com.tmdtud.cuahang.api.employer.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tmdtud.cuahang.api.customer.dto.CustomerDTO;
import com.tmdtud.cuahang.api.customer.mapper.CustomerMapper;
import com.tmdtud.cuahang.api.customer.repository.CustomerRepository;
import com.tmdtud.cuahang.api.employer.dto.EmployerDTO;
import com.tmdtud.cuahang.api.employer.mapper.EmployerMapper;
import com.tmdtud.cuahang.api.employer.model.Employers;
import com.tmdtud.cuahang.api.employer.repository.EmployerRepository;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Service
@Data
@RequiredArgsConstructor
public class EmployerService implements EmployerServiceI {

    private final EmployerRepository employer;
    private final EmployerMapper employerMapper;

    @Override
    public PageResponse<EmployerDTO> getAll(Pageable pageable) {
        Page<Employers> customers = employer.findAll(pageable);
        return new PageResponse<EmployerDTO>(customers.map(customer -> employerMapper.toDTO(customer)));
    }

    @Override
    public void add(EmployerDTO customer) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void delete(Long id) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public Employers getById(Long id) {
        return employer.findById(id).orElse(null);
    }

    @Override
    public void update(EmployerDTO customer) {
        // TODO Auto-generated method stub
        
    }
    
}
