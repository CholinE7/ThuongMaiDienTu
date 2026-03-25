package com.tmdtud.cuahang.helper.base.construct;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import jakarta.validation.Valid;
import lombok.NonNull;

public interface RestFullService <T, S, U> {
    public Page<T> get(Pageable pageable);
    public T getById(UUID id);
    public T store(S s);
    public T update(UUID id, U u);
    public void delete(UUID id);
}
