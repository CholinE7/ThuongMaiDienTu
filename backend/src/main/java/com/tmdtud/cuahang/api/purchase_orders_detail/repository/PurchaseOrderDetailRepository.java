package com.tmdtud.cuahang.api.purchase_orders_detail.repository;

import com.tmdtud.cuahang.api.purchase_order.model.PurchaseOrders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetails;
import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetailsId;

import java.util.List;

@Repository
public interface PurchaseOrderDetailRepository extends JpaRepository<PurchaseOrdersDetails, PurchaseOrdersDetailsId>{
        List<PurchaseOrdersDetails> findByPurchase_Id(Long purchaseId);
}
