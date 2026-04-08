package com.tmdtud.cuahang.api.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tmdtud.cuahang.api.auth.service.AuthService;
import com.tmdtud.cuahang.api.customer.model.Customers;
import com.tmdtud.cuahang.api.employer.model.Employers;
import com.tmdtud.cuahang.common.model.Users;
import com.tmdtud.cuahang.common.response.ApiResponse;

@RestController
@Validated
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/register/customers")
    public ApiResponse<Customers> registerCustomer(@Validated @RequestBody Customers customer) {
        return ApiResponse.success(service.registerCustomer(customer));
    }

    @PostMapping("/register/employers")
    public ApiResponse<Employers> registerEmployer(@Validated @RequestBody Employers employer){
        return ApiResponse.success(service.registerEmployer(employer));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users user) {
        try {
            System.out.println("Login attempt - User: " + user.getUsername() + " | Pass: " + user.getPassword());
            
            String token = service.verify(user);
            
            return ResponseEntity.ok(token);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi hệ thống!");
        }
}
}