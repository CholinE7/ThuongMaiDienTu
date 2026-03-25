package com.tmdtud.cuahang.api.customer.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.tmdtud.cuahang.api.customer.model.Customer;
import com.tmdtud.cuahang.api.customer.repository.CustomerRepository;
import com.tmdtud.cuahang.api.customer.request.CustomerStoreRequest;
import com.tmdtud.cuahang.api.customer.request.CustomerUpdateRequest;
import com.tmdtud.cuahang.helper.base.construct.RestFullService;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Data;

@Service
@Data
@AllArgsConstructor
@Validated
public class CustomerService implements RestFullService<Customer, CustomerStoreRequest, CustomerUpdateRequest> {
    private CustomerRepository userRepository;
    AuthenticationManager authManager;

    public void delete(UUID id) {
        userRepository.deleteById(id);
    }

    public Page<Customer> get(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public Customer getById(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public Customer store(CustomerStoreRequest s) {
        Customer user = Customer.builder()
            .fullName(s.getFullName())
            .email(s.getEmail())
            .phone(s.getPhone())
            .dateOfBirth(s.getDateOfBirth())
            .build();
        return userRepository.save(user);
    }

    public Customer update(UUID id, CustomerUpdateRequest u) {
        Customer user = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
        user.setFullName(u.getFullName());
        user.setEmail(u.getEmail());
        user.setPhone(u.getPhone());
        user.setDateOfBirth(u.getDateOfBirth());
        return userRepository.save(user);
    }
}
