package com.tmdtud.cuahang.api.customer.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tmdtud.cuahang.api.customer.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, UUID>{
    
}
