package com.tmdtud.cuahang.api.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

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

    @GetMapping("/api/auth/me")
    public ApiResponse<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return ApiResponse.error(401, "Chưa đăng nhập");
        }
        Object principal = authentication.getPrincipal();
        // Trong AuthController.java, chỗ hàm getCurrentUser
        if (principal instanceof com.tmdtud.cuahang.api.auth.model.CustomerDetails) {
            com.tmdtud.cuahang.api.auth.model.CustomerDetails userDetails = (com.tmdtud.cuahang.api.auth.model.CustomerDetails) principal;
            Customers customer = userDetails.getCustomer(); // Lấy đối tượng customer
            return ApiResponse.success(java.util.Map.of(
                "id", customer.getId(),
                "fullName", customer.getFullName(),
                "email", customer.getEmail(),
                "phone", customer.getPhone(), // Bổ sung thêm các dòng này
                "dateOfBirth", customer.getDateOfBirth(),
                "city", customer.getCity(),
                "ward", customer.getWard(),
                "street", customer.getStreet(),
                "role", "CUSTOMER"
            ));
        } else if (principal instanceof com.tmdtud.cuahang.api.auth.model.EmployerDetails) {
            com.tmdtud.cuahang.api.auth.model.EmployerDetails userDetails = (com.tmdtud.cuahang.api.auth.model.EmployerDetails) principal;
            return ApiResponse.success(java.util.Map.of(
                "id", userDetails.getEmployer().getId(),
                "fullName", userDetails.getEmployer().getFullName(),
                "email", userDetails.getEmployer().getEmail(),
                "role", "STAFF"
            ));
        }
        return ApiResponse.error(400, "Không nhận diện được người dùng");
    }
}