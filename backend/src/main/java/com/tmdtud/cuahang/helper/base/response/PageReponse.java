package com.tmdtud.cuahang.helper.base.response;

import java.util.List;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
public class PageReponse<T> {
    private List<T> data;
    private int page;
    private int size;  
}
