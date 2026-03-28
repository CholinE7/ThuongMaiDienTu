package com.tmdtud.cuahang.api.employer.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tmdtud.cuahang.api.employer.model.Employers;

@Repository
public interface EmployerRepository extends JpaRepository<Employers, UUID>{
 
    Employers findByUsername(String username);

}
