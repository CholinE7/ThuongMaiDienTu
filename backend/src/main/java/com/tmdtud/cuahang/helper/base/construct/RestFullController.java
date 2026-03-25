package com.tmdtud.cuahang.helper.base.construct;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestParam;
import com.tmdtud.cuahang.helper.base.response.ResponseObject;

import jakarta.validation.Valid;

public interface RestFullController<P, S, U> {

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseObject<?> get(@Valid Pageable pageable);

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseObject<?> getById(@PathVariable UUID id);

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseObject<?> store(@Valid @RequestBody S s);

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseObject<?> update(@PathVariable UUID id, @Valid @RequestBody U u);

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseObject<?> delete(@PathVariable UUID id);

}
