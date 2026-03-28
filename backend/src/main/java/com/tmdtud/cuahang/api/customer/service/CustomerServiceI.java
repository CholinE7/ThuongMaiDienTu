package com.tmdtud.cuahang.api.customer.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.tmdtud.cuahang.api.customer.dto.CustomerDTO;
import com.tmdtud.cuahang.common.response.PageResponse;


public interface CustomerServiceI {
    public PageResponse<CustomerDTO> getAll(Pageable pageable);
    public CustomerDTO getById(int id);
    public void delete(int id);
    public void add(CustomerDTO customer);
    public void update(CustomerDTO customer);
}
