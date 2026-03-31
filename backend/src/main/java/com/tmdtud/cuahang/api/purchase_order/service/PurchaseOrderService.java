package com.tmdtud.cuahang.api.purchase_order.service;

import com.tmdtud.cuahang.api.customer.dto.CustomerDTO;
import com.tmdtud.cuahang.api.customer.model.Customers;
import com.tmdtud.cuahang.api.customer.repository.CustomerRepository;
import com.tmdtud.cuahang.api.employer.dto.EmployerDTO;
import com.tmdtud.cuahang.api.employer.model.Employers;
import com.tmdtud.cuahang.api.employer.repository.EmployerRepository;
import com.tmdtud.cuahang.api.product.model.Products;
import com.tmdtud.cuahang.api.product.repository.ProductRepository;
import com.tmdtud.cuahang.api.purchase_order.request.PurchaseOrderStoreRequest;
import com.tmdtud.cuahang.api.purchase_order.response.PurchaseOrderResponse;
import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetails;
import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetailsId;
import com.tmdtud.cuahang.api.purchase_orders_detail.repository.PurchaseOrderDetailRepository;
import com.tmdtud.cuahang.api.purchase_orders_detail.request.PurchaseOrderDetailStoreRequest;
import com.tmdtud.cuahang.api.purchase_orders_detail.response.PurchaseOrderDetailResponse;
import org.springframework.beans.factory.annotation.Qualifier;
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

import javax.swing.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@Data
@RequiredArgsConstructor
public class PurchaseOrderService implements PurchaseOrderServiceI {

    private final PurchaseOrderRepository PurchaseOrder;
    private final PurchaseOrderDetailRepository purchaseOrderDetail;
    @Qualifier("purchaseOrderMapper")
    private final PurchaseOrderMapper PurchaseOrderMapper;
    private final CustomerRepository customerRepository;
    private final EmployerRepository employerRepository;
    private final ProductRepository productRepository;
    private final PurchaseOrderRepository purchaseOrderRepository;
    private final PurchaseOrderDetailRepository purchaseOrderDetailRepository;

    @Override
    public PageResponse<PurchaseOrderResponse> getAll(Pageable pageable) {
// 1. Lấy trang (Page) các đơn hàng từ Repository
        Page<PurchaseOrders> ordersPage = purchaseOrderRepository.findAll(pageable);

        // 2. Map từng đối tượng Entity sang Response kèm theo Details
        Page<PurchaseOrderResponse> responsePage = ordersPage.map(order -> {
            // Tìm chi tiết của từng đơn hàng
            List<PurchaseOrdersDetails> details = purchaseOrderDetailRepository.findByPurchase_Id(order.getId());

            // Chuyển đổi sang DTO/Response bằng hàm mapToResponse của bạn
            return mapToResponse(order, details);
        });

        // 3. Trả về đối tượng bao bọc PageResponse
        return new PageResponse<>(responsePage);
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
    public PurchaseOrderResponse getById(Long id) {
        // TODO Auto-generated method stub
        PurchaseOrders orders = PurchaseOrder.findById(id).orElse(null);
        List<PurchaseOrdersDetails> details = purchaseOrderDetailRepository.findByPurchase_Id(orders.getId());

        return mapToResponse(orders, details);
    }

//    @Override
//    public List<PurchaseOrderResponse> getAll() {
//        List<PurchaseOrders> orders = PurchaseOrder.findAll();
//        return orders.stream().map(order -> {
//            List<PurchaseOrdersDetails> details = purchaseOrderDetailRepository.findByPurchase_Id(order.getId());
//            return mapToResponse(order, details);
//        }).toList();
//
//    }

    @Override
    public List<PurchaseOrderResponse> getByCustomer(Long customerId) {
        List<PurchaseOrders> orders = PurchaseOrder.findByCustomer_Id(customerId);
        return orders.stream().map(order -> {
            List<PurchaseOrdersDetails> details = purchaseOrderDetailRepository.findByPurchase_Id(order.getId());
            return mapToResponse(order, details);
        }).toList();
    }

    @Override
    public void update(PurchaseOrderDTO supplier) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public PurchaseOrderResponse create(PurchaseOrderStoreRequest request) {
        Customers customerDTO = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));
//        Long employerId = Long.parseLong(request.getEmployerId());

        Employers employerDTO = employerRepository.findById(request.getEmployerId())
                        .orElseThrow(() -> new RuntimeException("Customer not found"));

        if (request.getDetails() == null || request.getDetails().isEmpty()) {
            throw new RuntimeException("Đơn hàng phải có ít nhất 1 sản phẩm");
        }

        PurchaseOrders orders = PurchaseOrders.builder()
                .method(request.getMethod())
                .customer(customerDTO)
                .employer(employerDTO)
                .totalPrice(BigDecimal.ZERO)
                .build();
        purchaseOrderRepository.save(orders);

        BigDecimal total = BigDecimal.ZERO;
        ArrayList<PurchaseOrdersDetails> details = new ArrayList<>();

        for(PurchaseOrderDetailStoreRequest d : request.getDetails()) {
            Products product = productRepository.findById(d.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + d.getProductId()));

            BigDecimal lineTotal = d.getCost().multiply(BigDecimal.valueOf(d.getQuantity()));

            PurchaseOrdersDetailsId detailsId = new PurchaseOrdersDetailsId(orders.getId(), d.getProductId());


            PurchaseOrdersDetails detail = PurchaseOrdersDetails.builder()
                    .id(detailsId)
                    .purchase(orders)
                    .product(product)
                    .quantity(d.getQuantity())
                    .cost(d.getCost())
                    .total(lineTotal)
                    .build();
            details.add(detail);
//            if(details.isEmpty())
            total = total.add(lineTotal);

        }

        purchaseOrderDetail.saveAll(details);

        orders.setTotalPrice(total);
        purchaseOrderRepository.save(orders);

        return mapToResponse(orders, details);




    }

    private PurchaseOrderResponse mapToResponse(PurchaseOrders order, List<PurchaseOrdersDetails> details) {
        List<PurchaseOrderDetailResponse> detailResponses = details.stream().map(d ->
                PurchaseOrderDetailResponse.builder()
                        .productId(d.getProduct().getId())
                        .productName(d.getProduct().getName())
                        .quantity(d.getQuantity())
                        .cost(d.getCost())
                        .total(d.getTotal())
                        .build()
        ).toList();

        return PurchaseOrderResponse.builder()
                .id(order.getId())
                .method(order.getMethod())
                .created_at(order.getCreated_at())
                .totalPrice(order.getTotalPrice())
                .customerName(order.getCustomer().getFullName())
                .employerName(order.getEmployer().getFullName())
                .details(detailResponses)
                .build();
    }

}
