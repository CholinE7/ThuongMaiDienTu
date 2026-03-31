package com.tmdtud.cuahang.api.category.mapper;

import com.tmdtud.cuahang.api.category.dto.CategoryDTO;
import com.tmdtud.cuahang.api.category.model.Categories;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-31T23:40:02+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class CategoryMapperImpl implements CategoryMapper {

    @Override
    public CategoryDTO toDTO(Categories categories) {
        if ( categories == null ) {
            return null;
        }

        CategoryDTO categoryDTO = new CategoryDTO();

        categoryDTO.setId( categories.getId() );
        categoryDTO.setName( categories.getName() );
        categoryDTO.setCreated_at( categories.getCreated_at() );

        return categoryDTO;
    }
}
