package com.tmdtud.cuahang.api.customer.model;

import java.sql.Date;
import java.sql.Timestamp;

import org.springframework.format.annotation.DateTimeFormat;
// import org.springframework.security.access.method.P;

import com.tmdtud.cuahang.helper.base.model.BaseModel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Table(name = "users")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Customer extends BaseModel{
    @Column(name = "username")
    private String username;

    @Column
    private String password;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "date_of_birth")
    private String dateOfBirth;
}
