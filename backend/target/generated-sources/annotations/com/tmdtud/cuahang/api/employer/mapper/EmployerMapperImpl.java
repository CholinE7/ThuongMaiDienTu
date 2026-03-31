package com.tmdtud.cuahang.api.employer.mapper;

import com.tmdtud.cuahang.api.employer.dto.EmployerDTO;
import com.tmdtud.cuahang.api.employer.model.Employers;
import java.math.BigDecimal;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-31T23:31:34+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class EmployerMapperImpl implements EmployerMapper {

    @Override
    public EmployerDTO toDTO(Employers employer) {
        if ( employer == null ) {
            return null;
        }

        BigDecimal salary = null;

        salary = employer.getSalary();

        EmployerDTO employerDTO = new EmployerDTO( salary );

        employerDTO.setDateOfBirth( employer.getDateOfBirth() );
        employerDTO.setEmail( employer.getEmail() );
        employerDTO.setFullName( employer.getFullName() );
        employerDTO.setId( employer.getId() );
        employerDTO.setPhone( employer.getPhone() );
        employerDTO.setUsername( employer.getUsername() );

        return employerDTO;
    }
}
