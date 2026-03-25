package com.tmdtud.cuahang.helper.base.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseObject<T> {
    private String message;
    private T data;
}
