package com.tmdtud.cuahang.api.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tmdtud.cuahang.api.auth.model.CustomerDetails;
import com.tmdtud.cuahang.api.auth.model.EmployerDetails;
import com.tmdtud.cuahang.api.customer.model.Customers;
import com.tmdtud.cuahang.api.customer.repository.CustomerRepository;
import com.tmdtud.cuahang.api.employer.model.Employers;
import com.tmdtud.cuahang.api.employer.repository.EmployerRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private EmployerRepository employerRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Customers customer = customerRepo.findByUsername(username);
        if(customer != null){
            return new CustomerDetails(customer);
        }

        Employers employer = employerRepo.findByUsername(username);
        if(employer != null){
            System.out.println(employer);
            return new EmployerDetails(employer);
        }

        throw new UsernameNotFoundException("Not found username in db" + username);
    }
}