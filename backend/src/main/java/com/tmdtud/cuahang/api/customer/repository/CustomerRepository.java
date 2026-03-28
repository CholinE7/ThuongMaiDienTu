package com.tmdtud.cuahang.api.customer.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tmdtud.cuahang.api.customer.model.Customers;

@Repository
public interface CustomerRepository extends JpaRepository<Customers, UUID>{
    
    Customers findByUsername(String username);

}
