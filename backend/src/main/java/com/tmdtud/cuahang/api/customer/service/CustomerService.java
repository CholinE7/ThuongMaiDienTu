package com.tmdtud.cuahang.api.customer.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public PageResponse<CustomerDTO> getAll(Pageable pageable) {
        Page<Customers> customers = customer.findAll(pageable);
        return new PageResponse<CustomerDTO>(customers.map(customer -> customerMapper.toDTO(customer)));
    }

@Override
    public CustomerDTO getById(Long id) {
        // Tìm khách hàng theo ID, nếu không thấy thì ném lỗi
        Customers customerEntity = customer.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng với ID: " + id));
        
        // Chuyển đổi Entity sang DTO bằng Mapper
        return customerMapper.toDTO(customerEntity);
    }

    @Override
    public void delete(Long id) {
        if (!customer.existsById(id)) {
            throw new RuntimeException("Không tìm thấy khách hàng để xóa");
        }
        customer.deleteById(id);
    }

    @Override
    public void add(CustomerDTO customerDTO) {
        if (customer.existsByEmail(customerDTO.getEmail())) {
            throw new RuntimeException("Email này đã được sử dụng!");
        }
        if (customer.existsByPhone(customerDTO.getPhone())) {
            throw new RuntimeException("Số điện thoại này đã được đăng ký!");
        }

        Customers entity = customerMapper.toEntity(customerDTO);
        entity.setStatus(1);
        entity.setPassword(passwordEncoder.encode(customerDTO.getPassword()));

        customer.save(entity);
    }

    @Override
    public void update(CustomerDTO customerDTO) {
        // Kiểm tra xem ID có tồn tại trước khi cập nhật không
        if (!customer.existsById(customerDTO.getId())) {
            throw new RuntimeException("ID khách hàng không tồn tại để cập nhật");
        }
        Customers entity = customerMapper.toEntity(customerDTO);
        customer.save(entity);
    }
}
