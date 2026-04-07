package com.tmdtud.cuahang.api.customer.service;


import org.springframework.data.domain.Pageable;

import com.tmdtud.cuahang.api.customer.model.Customers;
import com.tmdtud.cuahang.common.response.PageResponse;


public interface CustomerServiceI {
    public PageResponse<Customers> getAll(Pageable pageable);
    public Customers getById(Long id);
    public void delete(Long id);
    public void add(Customers customer);
    public void update(Customers customer);
}
