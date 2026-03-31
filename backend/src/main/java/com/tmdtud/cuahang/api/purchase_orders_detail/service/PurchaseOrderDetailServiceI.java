package com.tmdtud.cuahang.api.purchase_orders_detail.service;

import org.springframework.data.domain.Pageable;

import com.tmdtud.cuahang.api.purchase_orders_detail.dto.PurchaseOrderDetailDTO;
import com.tmdtud.cuahang.common.response.PageResponse;


public interface PurchaseOrderDetailServiceI {
    public PageResponse<PurchaseOrderDetailDTO> getAll(Pageable pageable);
    public PurchaseOrderDetailDTO getById(Long id);
    public void delete(Long id);
    public void add(PurchaseOrderDetailDTO supplier);
    public void update(PurchaseOrderDetailDTO supplier);
}
