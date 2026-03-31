package com.tmdtud.cuahang.api.purchase_order.service;

import org.springframework.data.domain.Pageable;

import com.tmdtud.cuahang.api.purchase_order.dto.PurchaseOrderDTO;
import com.tmdtud.cuahang.common.response.PageResponse;


public interface PurchaseOrderServiceI {
    public PageResponse<PurchaseOrderDTO> getAll(Pageable pageable);
    public PurchaseOrderDTO getById(Long id);
    public void delete(Long id);
    public void add(PurchaseOrderDTO supplier);
    public void update(PurchaseOrderDTO supplier);
}
