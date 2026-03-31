package com.tmdtud.cuahang.api.supplier.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tmdtud.cuahang.api.supplier.model.Suppliers;

@Repository
public interface SupplierRepository extends JpaRepository<Suppliers, Long>{

}
