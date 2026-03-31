package com.tmdtud.cuahang.api.employer.mapper;

import com.tmdtud.cuahang.api.employer.dto.EmployerDTO;
import com.tmdtud.cuahang.api.employer.model.Employers;
import java.math.BigDecimal;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-31T18:06:17+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.18 (Microsoft)"
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

        employerDTO.setId( employer.getId() );
        employerDTO.setUsername( employer.getUsername() );
        employerDTO.setFullName( employer.getFullName() );
        employerDTO.setEmail( employer.getEmail() );
        employerDTO.setPhone( employer.getPhone() );
        employerDTO.setDateOfBirth( employer.getDateOfBirth() );

        return employerDTO;
    }
}
