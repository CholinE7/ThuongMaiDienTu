package com.tmdtud.cuahang.api.purchase_orders_detail.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tmdtud.cuahang.api.product.model.Products;
import com.tmdtud.cuahang.api.product.service.ProductService;
import com.tmdtud.cuahang.api.purchase_order.model.PurchaseOrders;
import com.tmdtud.cuahang.api.purchase_order.service.PurchaseOrderService;

import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetails;
import com.tmdtud.cuahang.api.purchase_orders_detail.repository.PurchaseOrderDetailRepository;
import com.tmdtud.cuahang.api.purchase_orders_detail.request.PurchaseOrderDetailStoreRequest;
import com.tmdtud.cuahang.api.purchase_orders_detail.request.PurchaseOrderDetailUpdateRequest;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Service
@Data
@RequiredArgsConstructor
public class PurchaseOrderDetailService implements PurchaseOrderDetailServiceI {

    private final PurchaseOrderDetailRepository purchaseOrderDetailRepo;

    private final ProductService productService;
    private final PurchaseOrderService purchaseOrderService;

    @Override
    public PageResponse<PurchaseOrdersDetails> getAll(Pageable pageable) {
        Page<PurchaseOrdersDetails> purchase_orders_details = purchaseOrderDetailRepo.findAll(pageable);
        return new PageResponse<PurchaseOrdersDetails>(purchase_orders_details);
    }

    @Override
    public PurchaseOrdersDetails add(PurchaseOrderDetailStoreRequest request) {
        PurchaseOrders purchaseOrderDTO = purchaseOrderService.getById(request.getPurchase_order_id());
        Products products = productService.getById(request.getProduct_id());

        PurchaseOrdersDetails purchase = PurchaseOrdersDetails.builder()
                                            .cost(request.getCost())
                                            .total(request.getTotal())
                                            .product(products)
                                            .purchaseOrder(purchaseOrderDTO)
                                            .quantity(request.getQuantity()).build();
        return purchaseOrderDetailRepo.save(purchase);
    }

    @Override
    public Boolean delete(Long purchase_order_id, Long product_id) {
        purchaseOrderDetailRepo.deleteByBothId(purchase_order_id, product_id);
        return true;
    }

    @Override
    public PurchaseOrdersDetails getById(Long purchase, Long product) {
        return purchaseOrderDetailRepo.getByBothId(purchase, product).orElse(null);
    }

    @Override
    public PurchaseOrdersDetails update(PurchaseOrderDetailUpdateRequest request) {
        PurchaseOrdersDetails purchaseOrdersDetails = purchaseOrderDetailRepo.getByBothId(request.getPurchase_order_id(), request.getProduct_id()).orElse(null);
    
        purchaseOrdersDetails.setCost(request.getCost());
        purchaseOrdersDetails.setQuantity(request.getQuantity());
        purchaseOrdersDetails.setTotal(request.getTotal());
        return purchaseOrderDetailRepo.save(purchaseOrdersDetails);
    }

    @Override
    public List<PurchaseOrdersDetails> addAll(List<PurchaseOrderDetailStoreRequest> requests){
        List<PurchaseOrdersDetails> purchaseOrderDetailList = requests
                                                                .stream()
                                                                .map((item) -> {
                                                                    Products product = productService.getById(item.getProduct_id());
                                                                    PurchaseOrders purchaseOrders = purchaseOrderService.getById(item.getPurchase_order_id());
                                                                    PurchaseOrdersDetails _new = PurchaseOrdersDetails.builder()
                                                                                                    .product(product)
                                                                                                    .purchaseOrder(purchaseOrders)
                                                                                                    .quantity(item.getQuantity())
                                                                                                    .total(item.getTotal()).build();
                                                                    return _new;             
                                                                })
                                                                .collect(Collectors.toList());
        return new ArrayList<PurchaseOrdersDetails>(purchaseOrderDetailRepo.saveAll(purchaseOrderDetailList));
    }

    @Override
    public List<PurchaseOrdersDetails> getByPurOrderId(Long id){
        return 
            purchaseOrderDetailRepo.getByPurOrderId(id)
                .stream()
                .map(item -> item.orElse(null))
                .collect(Collectors.toList());
    }

    @Override
    public List<PurchaseOrdersDetails> updateAll(List<PurchaseOrderDetailUpdateRequest> requests){
        List<PurchaseOrdersDetails> purchaseOrderDetailList = requests
                                                                .stream()
                                                                .map((item) -> {
                                                                    Products product = productService.getById(item.getProduct_id());
                                                                    PurchaseOrders purchaseOrders = purchaseOrderService.getById(item.getPurchase_order_id());
                                                                    PurchaseOrdersDetails _new = PurchaseOrdersDetails.builder()
                                                                                                    .product(product)
                                                                                                    .purchaseOrder(purchaseOrders)
                                                                                                    .quantity(item.getQuantity())
                                                                                                    .total(item.getTotal()).build();
                                                                    return _new;             
                                                                })
                                                                .collect(Collectors.toList());
        return new ArrayList<PurchaseOrdersDetails>(purchaseOrderDetailRepo.saveAll(purchaseOrderDetailList));
    }
    
}
