package com.tmdtud.cuahang.common.model;

import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@MappedSuperclass
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Users {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    @CreationTimestamp
    @Column(name = "created_at")
    String createdAt;

    @NotBlank(message = "username Not empty")
    @NotNull(message = "username Not null")
    @Column(name = "username")
    private String username;

    @NotBlank(message = "password Not empty")
    @NotNull(message = "password Not null")
    @Column
    private String password;

    @NotBlank(message = "fullName Not empty")
    @NotNull(message = "fullName Not null")
    @Column(name = "full_name")
    private String fullName;

    @NotBlank(message = "email Not empty")
    @NotNull(message = "email Not null")
    @Email(message = "email Not valid")
    @Column(name = "email")
    private String email;

    @NotBlank(message = "phone Not empty")
    @Pattern(regexp = "^[0-9]{10,11}$", message = "phone Not valid")
    @Column(name = "phone")
    private String phone;

    @Column(name = "date_of_birth")
    private String dateOfBirth;
}
