package com.tmdtud.cuahang.api.purchase_orders_detail.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetails;
import com.tmdtud.cuahang.api.purchase_orders_detail.request.PurchaseOrderDetailStoreRequest;
import com.tmdtud.cuahang.api.purchase_orders_detail.request.PurchaseOrderDetailUpdateRequest;
import com.tmdtud.cuahang.common.response.PageResponse;


public interface PurchaseOrderDetailServiceI {
    public PageResponse<PurchaseOrdersDetails> getAll(Pageable pageable);
    public PurchaseOrdersDetails getById(Long purchase, Long product);
    public Boolean delete(Long purchase, Long product);
    public PurchaseOrdersDetails add(PurchaseOrderDetailStoreRequest request);
    public PurchaseOrdersDetails update(PurchaseOrderDetailUpdateRequest request);
    public List<PurchaseOrdersDetails> addAll(List<PurchaseOrderDetailStoreRequest> requests);
    public List<PurchaseOrdersDetails> getByPurOrderId(Long id);
    public List<PurchaseOrdersDetails> updateAll(List<PurchaseOrderDetailUpdateRequest> requests);
    public int deleteByPurchaseOrder(Long id);
}
