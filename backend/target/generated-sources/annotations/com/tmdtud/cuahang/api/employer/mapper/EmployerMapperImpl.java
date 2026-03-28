package com.tmdtud.cuahang.api.employer.mapper;

import com.tmdtud.cuahang.api.employer.dto.EmployerDTO;
import com.tmdtud.cuahang.api.employer.model.Employers;
import java.math.BigDecimal;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-28T13:51:09+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class EmployerMapperImpl implements EmployerMapper {

    @Override
    public EmployerDTO toDTO(Employers employer) {
        if ( employer == null ) {
            return null;
        }

        UUID id = null;
        String fullName = null;
        String email = null;
        String phone = null;
        String dateOfBirth = null;
        String createdAt = null;
        BigDecimal salary = null;

        id = employer.getId();
        fullName = employer.getFullName();
        email = employer.getEmail();
        phone = employer.getPhone();
        dateOfBirth = employer.getDateOfBirth();
        createdAt = employer.getCreatedAt();
        salary = employer.getSalary();

        EmployerDTO employerDTO = new EmployerDTO( id, fullName, email, phone, dateOfBirth, createdAt, salary );

        return employerDTO;
    }
}
