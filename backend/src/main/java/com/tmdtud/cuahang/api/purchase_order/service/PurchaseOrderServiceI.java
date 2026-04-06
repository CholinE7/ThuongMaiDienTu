package com.tmdtud.cuahang.api.purchase_order.service;

import com.tmdtud.cuahang.api.purchase_order.request.PurchaseOrderStoreRequest;
import org.springframework.data.domain.Pageable;

import com.tmdtud.cuahang.api.purchase_order.dto.PurOrdHasDetailDTO;
import com.tmdtud.cuahang.api.purchase_order.model.PurchaseOrders;
import com.tmdtud.cuahang.api.purchase_order.request.PurchaseOrderUpdateRequest;
import com.tmdtud.cuahang.common.response.PageResponse;


public interface PurchaseOrderServiceI {
    public PageResponse<PurchaseOrders> getAll(Pageable pageable);
    public PurchaseOrders getById(Long id);
    public Boolean delete(Long id);
    public PurchaseOrders add(PurchaseOrderStoreRequest request);
    public PurchaseOrders update(PurchaseOrderUpdateRequest request);
    public PurOrdHasDetailDTO toPurOrdHasDetailDTO(PurchaseOrders purchaseOrders);
}
