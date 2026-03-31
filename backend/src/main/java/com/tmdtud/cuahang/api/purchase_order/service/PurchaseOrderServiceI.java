package com.tmdtud.cuahang.api.purchase_order.service;

import com.tmdtud.cuahang.api.purchase_order.request.PurchaseOrderStoreRequest;
import com.tmdtud.cuahang.api.purchase_order.response.PurchaseOrderResponse;
import org.springframework.data.domain.Pageable;

import com.tmdtud.cuahang.api.purchase_order.dto.PurchaseOrderDTO;
import com.tmdtud.cuahang.common.response.PageResponse;

import java.util.List;


public interface PurchaseOrderServiceI {
    public PageResponse<PurchaseOrderResponse> getAll(Pageable pageable);
//    public PurchaseOrderDTO getById(Long id);
    public void delete(Long id);
    public void add(PurchaseOrderDTO supplier);
    public void update(PurchaseOrderDTO supplier);
    public PurchaseOrderResponse create(PurchaseOrderStoreRequest request);
    public PurchaseOrderResponse getById(Long id);
//    public List<PurchaseOrderResponse> getAll();
    public List<PurchaseOrderResponse> getByCustomer(Long customerId);
}
