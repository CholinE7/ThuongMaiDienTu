package com.tmdtud.cuahang.api.purchase_order.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tmdtud.cuahang.api.purchase_order.model.PurchaseOrders;
import com.tmdtud.cuahang.api.supplier.model.Suppliers;

@Repository
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrders, Long>{

}
