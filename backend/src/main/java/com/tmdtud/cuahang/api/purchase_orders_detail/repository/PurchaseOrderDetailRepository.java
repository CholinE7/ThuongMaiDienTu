package com.tmdtud.cuahang.api.purchase_orders_detail.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetails;
import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetailsId;

@Repository
public interface PurchaseOrderDetailRepository extends JpaRepository<PurchaseOrdersDetails, PurchaseOrdersDetailsId>{

}
