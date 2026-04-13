package com.tmdtud.cuahang.api.purchase_orders_detail.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetails;
import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetailsId;

@Repository
public interface PurchaseOrderDetailRepository extends JpaRepository<PurchaseOrdersDetails, PurchaseOrdersDetailsId> {
    @Modifying
    @Query(value = "DELETE FROM purchase_orders_details WHERE purchase_order_id = ?1", nativeQuery = true)
    int deleteByPurchaseOrder(Long id);

    @Modifying
    @Query(value = "DELETE FROM purchase_orders_details WHERE purchase_order_id = ?1 and product_id = ?2", nativeQuery = true)
    int deleteByBothId(Long purchase_order_id, Long product_id);

    @Modifying
    @Query(value = "SELECT * FROM purchase_orders_details WHERE purchase_order_id = ?1 and product_id = ?2", nativeQuery = true)
    PurchaseOrdersDetails getByBothId(Long purchase_order_id, Long product_id);

    @Modifying
    @Query(value = "SELECT * FROM purchase_orders_details WHERE purchase_order_id = ?1", nativeQuery = true)
    List<PurchaseOrdersDetails> getByPurOrderId(Long purOrderId);
}
