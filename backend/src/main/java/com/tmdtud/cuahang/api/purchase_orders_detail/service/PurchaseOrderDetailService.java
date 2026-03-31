package com.tmdtud.cuahang.api.purchase_orders_detail.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tmdtud.cuahang.api.purchase_orders_detail.dto.PurchaseOrderDetailDTO;
import com.tmdtud.cuahang.api.purchase_orders_detail.mapper.PurchaseOrderDetailMapper;
import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetails;
import com.tmdtud.cuahang.api.purchase_orders_detail.repository.PurchaseOrderDetailRepository;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Service
@Data
@RequiredArgsConstructor
public class PurchaseOrderDetailService implements PurchaseOrderDetailServiceI {

    private final PurchaseOrderDetailRepository PurchaseOrderDetail;
    private final PurchaseOrderDetailMapper PurchaseOrderDetailMapper;

    @Override
    public PageResponse<PurchaseOrderDetailDTO> getAll(Pageable pageable) {
        Page<PurchaseOrdersDetails> purchase_orders_details = PurchaseOrderDetail.findAll(pageable);
        return new PageResponse<PurchaseOrderDetailDTO>(purchase_orders_details.map(purchaseOrder -> PurchaseOrderDetailMapper.toDTO(purchaseOrder)));
    }

    @Override
    public void add(PurchaseOrderDetailDTO supplier) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void delete(Long id) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public PurchaseOrderDetailDTO getById(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void update(PurchaseOrderDetailDTO supplier) {
        // TODO Auto-generated method stub
        
    }
    
}
