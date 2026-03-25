package com.tmdtud.cuahang.api.customer;

import java.util.UUID;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;

import com.tmdtud.cuahang.api.customer.model.Customer;
import com.tmdtud.cuahang.api.customer.request.CustomerGetRequest;
import com.tmdtud.cuahang.api.customer.request.CustomerStoreRequest;
import com.tmdtud.cuahang.api.customer.request.CustomerUpdateRequest;
import com.tmdtud.cuahang.api.customer.service.CustomerService;
import com.tmdtud.cuahang.helper.base.construct.RestFullController;
import com.tmdtud.cuahang.helper.base.response.PageReponse;
import com.tmdtud.cuahang.helper.base.response.ResponseObject;

import jakarta.servlet.annotation.HttpConstraint;
import lombok.AllArgsConstructor;


@RestController
@RequestMapping("api/user")
@AllArgsConstructor
@Validated
public class CustomerController implements RestFullController<CustomerGetRequest, CustomerStoreRequest, CustomerUpdateRequest> {
    private CustomerService userService;
    
    @Override
    public ResponseObject<?> delete(UUID id) {
        userService.delete(id);
        return new ResponseObject<>("Successful", null);
    }

    @Override
    public ResponseObject<?> getById(UUID id) {
        return new ResponseObject<>("Successful", userService.getById(id));
    }

    @Override
    public ResponseObject<?> get(Pageable pageable) {
        Page<Customer> users = userService.get(pageable);
        return new ResponseObject<>("Successful", PageReponse.<Customer>builder()
            .data(users.getContent())
            .page(users.getNumber())
            .size(users.getSize())
            .build());
    }

    @Override
    public ResponseObject<?> store(CustomerStoreRequest s) {
        Customer u = userService.store(s);
        return new ResponseObject<>("Successful", u);
    }

    @Override
    public ResponseObject<?> update(UUID id, CustomerUpdateRequest u) {
        return new ResponseObject<>("Successful", userService.update(id, u));
    }

    
}
