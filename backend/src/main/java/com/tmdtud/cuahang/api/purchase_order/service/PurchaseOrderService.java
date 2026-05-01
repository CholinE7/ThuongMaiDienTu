package com.tmdtud.cuahang.api.purchase_order.service;

import com.tmdtud.cuahang.api.employer.model.Employers;
import com.tmdtud.cuahang.api.product.model.Products;
import com.tmdtud.cuahang.api.product.service.ProductService;
import com.tmdtud.cuahang.api.purchase_order.request.PurchaseOrderStoreRequest;
import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetails;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tmdtud.cuahang.api.employer.service.EmployerService;
import com.tmdtud.cuahang.api.purchase_order.dto.PurOrdHasDetailDTO;
import com.tmdtud.cuahang.api.purchase_order.dto.PurchaseOrderDTO;
import com.tmdtud.cuahang.api.purchase_order.mapper.PurchaseOrderAggregateMapper;
import com.tmdtud.cuahang.api.purchase_order.mapper.PurchaseOrderMapper;
import com.tmdtud.cuahang.api.purchase_order.model.PurchaseOrderStatus;
import com.tmdtud.cuahang.api.purchase_order.model.PurchaseOrders;
import com.tmdtud.cuahang.api.purchase_order.repository.PurchaseOrderRepository;
import com.tmdtud.cuahang.api.purchase_order.request.PurchaseOrderUpdateRequest;
import com.tmdtud.cuahang.api.purchase_order.request.UpdateStatusRequest;
import com.tmdtud.cuahang.api.purchase_orders_detail.service.PurchaseOrderDetailService;
import com.tmdtud.cuahang.api.supplier.model.Suppliers;
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
    @Lazy
    private PurchaseOrderDetailService purchaseOrderDetailService;

    @Autowired
    private final EmployerService employerService;

    @Autowired
    private final SupplierService supplierService;

    @Autowired
    private final ProductService productService;

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
                .supplier(suppliers)
                .method(request.getMethod())
                .status(PurchaseOrderStatus.PENDING)
                .deleted(0)
                .totalPrice(request.getTotalPrice()).build();

        PurchaseOrders newPurchase = purchaseOrderRepository.save(purchaseOrders);
        purchaseOrderDetailService.addAll(request.getPuchase_order_details(), newPurchase.getId()); // tạo chi tiết đơn
                                                                                                    // nhập
        return newPurchase;
    }

    @Override
    public Boolean delete(Long id) {
        PurchaseOrders purchaseOrders = getById(id);
        if(purchaseOrders.getStatus().isTerminal()){
            
            purchaseOrderRepository.deleteById(id);
        }
        return true;
    }

    @Override
    public PurchaseOrders getById(Long id) {
        return purchaseOrderRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public PurchaseOrders update(PurchaseOrderUpdateRequest request) {
        PurchaseOrders purchase = purchaseOrderRepository.findById(request.getId()).orElse(null);

        purchase.setMethod(request.getMethod());
        purchase.setTotalPrice(request.getTotalPrice());

        PurchaseOrders purchaseOrders = purchaseOrderRepository.save(purchase);
        purchaseOrderDetailService.updateAll(request.getPuchase_order_details(), purchaseOrders.getId());

        return purchaseOrders;
    }

    @Override
    public PurchaseOrders updatePurchaseOrderDetail(PurchaseOrders purchase) {
        purchase.setDetails(purchaseOrderDetailService.getByPurOrderId(purchase.getId()));
        return purchase;
    }

    @Override
    @Transactional
    public Boolean updateStatus(UpdateStatusRequest request) {
        PurchaseOrders purchaseOrders = getById(request.getPurchaseOrderId());

        if (purchaseOrders.getStatus().isTerminal()) {
            return false;
        }

        purchaseOrders.setStatus(request.getPurchaseOrderStatusNext());
        purchaseOrderRepository.save(purchaseOrders);
        List<PurchaseOrdersDetails> purchaseOrdersDetails = purchaseOrderDetailService
                .getByPurOrderId(request.getPurchaseOrderId());
        List<Products> products = purchaseOrdersDetails
                .stream()
                .map(item -> {
                    Products pro = item.getProduct();
                    pro.setQuantity(pro.getQuantity() + item.getQuantity());
                    return pro;
                })
                .collect(Collectors.toList());
        productService.updateAll(products);

        return true;
    }

    @Override
    public PurchaseOrderDTO toDTO(PurchaseOrders purchase){
        return purchaseOrderMapper.toDTO(purchase);
    }

}
