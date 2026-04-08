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
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        // 1. Kiểm tra đối với Khách hàng (Customers)
        Customers customer = customerRepo.findByEmail(email);
        if (customer != null) {
            // Kiểm tra nếu trạng thái là Bị khóa (0)
            if (customer.getStatus() != null && customer.getStatus() == 0) {
                throw new RuntimeException("Tài khoản khách hàng đã bị khóa!");
            }
            return new CustomerDetails(customer);
        }

        // 2. Kiểm tra đối với Nhân viên (Employers)
        Employers employer = employerRepo.findByEmail(email);
        if (employer != null) {
            // Kiểm tra nếu trạng thái là Bị khóa (0)
            if (employer.getStatus() != null && employer.getStatus() == 0) {
                throw new RuntimeException("Tài khoản nhân viên đã bị khóa!");
            }
            System.out.println(employer);
            return new EmployerDetails(employer);
        }

        throw new UsernameNotFoundException("Not found email in db: " + email);
    }
}