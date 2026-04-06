package com.tmdtud.cuahang.api.purchase_order.service;

import com.tmdtud.cuahang.api.employer.model.Employers;
import com.tmdtud.cuahang.api.employer.repository.EmployerRepository;
import com.tmdtud.cuahang.api.product.repository.ProductRepository;
import com.tmdtud.cuahang.api.purchase_order.request.PurchaseOrderStoreRequest;
import com.tmdtud.cuahang.api.purchase_orders_detail.repository.PurchaseOrderDetailRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.tmdtud.cuahang.api.employer.service.EmployerService;
import com.tmdtud.cuahang.api.purchase_order.dto.PurOrdHasDetailDTO;
import com.tmdtud.cuahang.api.purchase_order.mapper.PurchaseOrderAggregateMapper;
import com.tmdtud.cuahang.api.purchase_order.mapper.PurchaseOrderMapper;
import com.tmdtud.cuahang.api.purchase_order.model.PurchaseOrders;
import com.tmdtud.cuahang.api.purchase_order.repository.PurchaseOrderRepository;
import com.tmdtud.cuahang.api.purchase_order.request.PurchaseOrderUpdateRequest;
import com.tmdtud.cuahang.api.purchase_orders_detail.service.PurchaseOrderDetailService;
import com.tmdtud.cuahang.api.supplier.model.Suppliers;
import com.tmdtud.cuahang.api.supplier.repository.SupplierRepository;
import com.tmdtud.cuahang.api.supplier.service.SupplierService;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.Data;


@Service
@Data

public class PurchaseOrderService implements PurchaseOrderServiceI {

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    private PurchaseOrderMapper purchaseOrderMapper;
    
    @Autowired
    private PurchaseOrderAggregateMapper purchaseOrderAggregateMapper;

    @Autowired
    @Lazy
    private PurchaseOrderDetailService purchaseOrderDetailService;
    
    @Autowired
    private final EmployerService employerService;
    
    @Autowired
    private final SupplierService supplierService;

    @Override
    public PageResponse<PurchaseOrders> getAll(Pageable pageable) {
        Page<PurchaseOrders> puchaseOrders = purchaseOrderRepository.findAll(pageable);
        return new PageResponse<PurchaseOrders>(puchaseOrders);
    }



    @Override
    @Transactional
    public PurchaseOrders add(PurchaseOrderStoreRequest request) {
        Employers employer = employerService.getById(request.getEmployer());
        Suppliers suppliers = supplierService.getById(request.getSupplier());

        PurchaseOrders purchaseOrders = PurchaseOrders.builder()
                                        .employer(employer)
                                        .suppliers(suppliers)
                                        .method(request.getMethod())
                                        .totalPrice(request.getTotalPrice()).build();
        
        PurchaseOrders newPurchase = purchaseOrderRepository.save(purchaseOrders);
        purchaseOrderDetailService.addAll(request.getPuchase_order_details()); // tạo chi tiết đơn nhập
        return newPurchase;
    }

    @Override
    public Boolean delete(Long id) {
        purchaseOrderDetailService.deleteByPurchaseOrder(id);
        purchaseOrderRepository.deleteById(id);
        return true;
    }

    @Override
    public PurchaseOrders getById(Long id) {
        return purchaseOrderRepository.findById(id).orElse(null);
    }

    @Override
    public PurchaseOrders update(PurchaseOrderUpdateRequest request) {
        Employers employer = employerService.getById(request.getEmployer());
        Suppliers suppliers = supplierService.getById(request.getSupplier());
        PurchaseOrders purchase = purchaseOrderRepository.findById(request.getId()).orElse(null);

        purchase.setMethod(request.getMethod());
        purchase.setSuppliers(suppliers);
        purchase.setEmployer(employer);
        purchase.setTotalPrice(request.getTotalPrice());

        PurchaseOrders purchaseOrders = purchaseOrderRepository.save(purchase);
        purchaseOrderDetailService.updateAll(request.getPuchase_order_details());

        return purchaseOrders;
    }

    @Override
    public PurOrdHasDetailDTO toPurOrdHasDetailDTO(PurchaseOrders purchaseOrders){
        return purchaseOrderAggregateMapper.toPurOrdHasDetailDTO(purchaseOrders, purchaseOrderDetailService.getByPurOrderId(purchaseOrders.getId()));
    }

}
