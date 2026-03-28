package com.tmdtud.cuahang.api.employer.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import com.tmdtud.cuahang.api.employer.dto.EmployerDTO;
import com.tmdtud.cuahang.api.employer.model.Employers;



@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface EmployerMapper {
    EmployerDTO toDTO(Employers employer);
}
