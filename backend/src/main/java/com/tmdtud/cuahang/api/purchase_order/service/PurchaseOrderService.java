package com.tmdtud.cuahang.api.purchase_order.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;

import com.tmdtud.cuahang.api.employer.model.Employers;
import com.tmdtud.cuahang.api.employer.repository.EmployerRepository;
import com.tmdtud.cuahang.api.employer.service.EmployerService;
import com.tmdtud.cuahang.api.product.model.Products;
import com.tmdtud.cuahang.api.product.repository.ProductRepository;
import com.tmdtud.cuahang.api.purchase_order.dto.PurOrdHasDetailDTO;
import com.tmdtud.cuahang.api.purchase_order.dto.PurchaseOrderDTO;
import com.tmdtud.cuahang.api.purchase_order.mapper.PurchaseOrderAggregateMapper;
import com.tmdtud.cuahang.api.purchase_order.mapper.PurchaseOrderMapper;
import com.tmdtud.cuahang.api.purchase_order.model.PurchaseOrders;
import com.tmdtud.cuahang.api.purchase_order.repository.PurchaseOrderRepository;
import com.tmdtud.cuahang.api.purchase_order.request.PurchaseOrderStoreRequest;
import com.tmdtud.cuahang.api.purchase_order.request.PurchaseOrderUpdateRequest;
import com.tmdtud.cuahang.api.purchase_orders_detail.dto.PurchaseOrderDetailDTO;
import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetails;
import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetailsId;
import com.tmdtud.cuahang.api.purchase_orders_detail.repository.PurchaseOrderDetailRepository;
import com.tmdtud.cuahang.api.purchase_orders_detail.request.PurchaseOrderDetailStoreRequest;
import com.tmdtud.cuahang.api.purchase_orders_detail.service.PurchaseOrderDetailService;
import com.tmdtud.cuahang.api.supplier.model.Suppliers;
import com.tmdtud.cuahang.api.supplier.repository.SupplierRepository;
import com.tmdtud.cuahang.api.supplier.service.SupplierService;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Service
@Data
@RequiredArgsConstructor
public class PurchaseOrderService implements PurchaseOrderServiceI {

    private final PurchaseOrderRepository purchaseOrderRepository;
    private final EmployerRepository employerRepository;
    private final SupplierRepository supplierRepository;
    private final PurchaseOrderDetailRepository purchaseOrderDetailRepository;
    private final ProductRepository productRepo;

    private final PurchaseOrderMapper purchaseOrderMapper;
    private final PurchaseOrderAggregateMapper purchaseOrderAggregateMapper;

    private final PurchaseOrderDetailService purchaseOrderDetailService;
    private final EmployerService employerService;
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
        purchaseOrderDetailRepository.deleteByPurchaseOrder(id);
        purchaseOrderRepository.deleteById(id);
        return true;
    }

    @Override
    public PurchaseOrders getById(Long id) {
        return purchaseOrderRepository.findById(id).orElse(null);
    }

    @Override
    public PurchaseOrders update(PurchaseOrderUpdateRequest request) {
        Employers employer = employerRepository.findById(request.getEmployer()).orElse(null);
        Suppliers suppliers = supplierRepository.findById(request.getSupplier()).orElse(null);
        PurchaseOrders purchase = purchaseOrderRepository.findById(request.getId()).orElse(null);

        purchase.setMethod(request.getMethod());
        purchase.setSuppliers(suppliers);
        purchase.setEmployer(employer);
        purchase.setTotalPrice(request.getTotalPrice());

        PurchaseOrders purchaseOrders = purchaseOrderRepository.save(purchase);
        purchaseOrderDetailService.updateAll(request.getPuchase_order_details());

        return purchaseOrders;
    }

    public PurOrdHasDetailDTO combineDTO(PurchaseOrders purchaseOrders){
        return purchaseOrderAggregateMapper.toPurOrdHasDetailDTO(purchaseOrders, purchaseOrderDetailService.getByPurOrderId(purchaseOrders.getId()));
    }
    
}
