package com.tmdtud.cuahang.api.purchase_order.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tmdtud.cuahang.api.purchase_order.dto.PurchaseOrderDTO;
import com.tmdtud.cuahang.api.purchase_order.mapper.PurchaseOrderMapper;
import com.tmdtud.cuahang.api.purchase_order.model.PurchaseOrders;
import com.tmdtud.cuahang.api.purchase_order.repository.PurchaseOrderRepository;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Service
@Data
@RequiredArgsConstructor
public class PurchaseOrderService implements PurchaseOrderServiceI {

    private final PurchaseOrderRepository PurchaseOrder;
    private final PurchaseOrderMapper PurchaseOrderMapper;

    @Override
    public PageResponse<PurchaseOrderDTO> getAll(Pageable pageable) {
        Page<PurchaseOrders> suppliers = PurchaseOrder.findAll(pageable);
        return new PageResponse<PurchaseOrderDTO>(suppliers.map(purchaseOrder -> PurchaseOrderMapper.toDTO(purchaseOrder)));
    }

    @Override
    public void add(PurchaseOrderDTO supplier) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void delete(Long id) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public PurchaseOrderDTO getById(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void update(PurchaseOrderDTO supplier) {
        // TODO Auto-generated method stub
        
    }
    
}
