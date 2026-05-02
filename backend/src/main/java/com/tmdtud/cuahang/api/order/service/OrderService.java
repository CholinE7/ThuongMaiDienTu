package com.tmdtud.cuahang.api.order.service;

import com.tmdtud.cuahang.api.customer.dto.CustomerDTO;
import com.tmdtud.cuahang.api.customer.mapper.CustomerMapper;
import com.tmdtud.cuahang.api.customer.model.Customers;
import com.tmdtud.cuahang.api.customer.service.CustomerService;
import com.tmdtud.cuahang.api.product.model.Products;
import com.tmdtud.cuahang.api.product.service.ProductService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tmdtud.cuahang.api.employer.model.Employers;
import com.tmdtud.cuahang.api.employer.service.EmployerService;
import com.tmdtud.cuahang.api.order.dto.OrdHasDetailDTO;
import com.tmdtud.cuahang.api.order.mapper.OrderAggregateMapper;
import com.tmdtud.cuahang.api.order.mapper.OrderMapper;
import com.tmdtud.cuahang.api.order.model.OrderStatus;
import com.tmdtud.cuahang.api.order.model.Orders;
import com.tmdtud.cuahang.api.order.repository.OrderRepository;
import com.tmdtud.cuahang.api.order.request.OrderStoreRequest;
import com.tmdtud.cuahang.api.order.request.OrderUpdateRequest;
import com.tmdtud.cuahang.api.order.request.UpdateOrderStatusRequest;
import com.tmdtud.cuahang.api.order_detail.model.OrdersDetails;
import com.tmdtud.cuahang.api.order_detail.service.OrderDetailService;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.Data;

import com.tmdtud.cuahang.common.service.SseService;

@Service
@Data

public class OrderService implements OrderServiceI {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private OrderAggregateMapper orderAggregateMapper;

    @Autowired
    @Lazy
    private OrderDetailService orderDetailService;

    @Autowired
    private final EmployerService employerService;

    @Autowired
    private final CustomerService customerService;

    @Autowired
    private final ProductService productService;

    @Autowired
    private CustomerMapper customerMapper;

    @Autowired
    private SseService sseService;

    @Override
    public PageResponse<Orders> getAll(Pageable pageable) {
        Page<Orders> orders = orderRepository.findAll(pageable);
        return new PageResponse<Orders>(orders);
    }

    @Override
    public PageResponse<Orders> getMyOrders(Long customerId, Pageable pageable) {
        Page<Orders> orders = orderRepository.findByCustomerId(customerId, pageable);
        return new PageResponse<Orders>(orders);
    }

    @Override
    @Transactional
    public Orders add(OrderStoreRequest request) {
        Customers customer = null;
        if (request.getCustomerId() != null) {
            CustomerDTO customerDTO = customerService.getById(request.getCustomerId());
            customer = customerMapper.toEntity(customerDTO);
        }

        Orders order = Orders.builder()
                .customer(customer)
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .street(request.getStreet())
                .ward(request.getWard())
                .city(request.getCity())
                .method(request.getMethod())
                .status(OrderStatus.PENDING)
                .paymentStatus("PENDING")
                .deleted(0)
                .totalPrice(request.getTotalPrice()).build();

        if (request.getEmployerId() != null) {
            Employers employer = employerService.getById(request.getEmployerId());
            order.setEmployer(employer);
        }

        Orders newOrder = orderRepository.save(order);
        orderDetailService.addAll(request.getDetails(), newOrder.getId()); 
        
        sseService.sendToAll(java.util.Map.of("orderId", newOrder.getId(), "status", newOrder.getStatus().toString()));
        return newOrder;
    }

    @Override
    @Transactional
    public Orders delete(Long id) {
        Orders order = getById(id);
        if (order.getStatus().isTerminal())
            throw new RuntimeException("Đơn hàng đã kết thúc, không thể hủy");
        if (!order.getStatus().isCancellable())
            throw new RuntimeException("Chỉ có thể hủy đơn hàng ở trạng thái Chờ xác nhận hoặc Đã xác nhận");

        if (!order.getStatus().equals(OrderStatus.PENDING)) {
            List<OrdersDetails> ordersDetails = orderDetailService
                    .getByOrderId(order.getId());
            List<Products> products = new ArrayList<>();

            for (OrdersDetails item : ordersDetails) {
                Products pro = item.getProduct();
                pro.setQuantity(pro.getQuantity() + item.getQuantity());
                products.add(pro);
            }

            productService.updateAll(products);
        }

        order.setStatus(OrderStatus.CANCELLED);
        order.setDeleted(1);

        Orders updatedOrder = orderRepository.save(order);
        sseService.sendToAll(java.util.Map.of("orderId", updatedOrder.getId(), "status", updatedOrder.getStatus().toString()));
        return updatedOrder;
    }

    @Override
    public Orders getById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public Orders update(OrderUpdateRequest request) {
        Orders order = orderRepository.findById(request.getId()).orElse(null);
        if (order.getDeleted() == 1)
            return order; // nếu đã xóa đơn hàng thì k làm gì cả

        order.setMethod(request.getMethod());
        order.setTotalPrice(request.getTotalPrice());

        Orders orders = orderRepository.save(order);
        orderDetailService.updateAll(request.getPuchase_order_details(), orders.getId());

        return orders;
    }

    @Override
    public OrdHasDetailDTO toOrdHasDetailDTO(Orders order) {
        return orderAggregateMapper
                .toPurOrdHasDetailDTO(order,
                        orderDetailService.getByOrderId(order.getId()));
    }

    @Override
    @Transactional
    public Orders updateStatus(UpdateOrderStatusRequest request) {
        Employers employer = employerService.getById(request.getEmployerId());
        Orders order = getById(request.getOrderId());

        if (order.getDeleted() == 1)
            return order;

        if (order.getStatus().isTerminal() || !order.getStatus().canAdvanceTo(request.getOrderStatusNext())) {
            return order;
        }

        order.setEmployer(employer);

        order.setStatus(request.getOrderStatusNext());
        orderRepository.save(order);

        if (request.getOrderStatusNext().equals(OrderStatus.CONFIRMED)) {
            List<OrdersDetails> ordersDetails = orderDetailService
                    .getByOrderId(request.getOrderId());
            List<Products> products = new ArrayList<>();

            for (OrdersDetails item : ordersDetails) {
                Products pro = item.getProduct();
                if (pro.getQuantity() <= item.getQuantity() + 1) { // sản phẩm tồn tại tối thiểu 1 số lượng
                    return order;
                }
                pro.setQuantity(pro.getQuantity() - item.getQuantity());
                products.add(pro);
            }

            productService.updateAll(products);
        }

        sseService.sendToAll(java.util.Map.of("orderId", order.getId(), "status", order.getStatus().toString()));
        return order;
    }

    @Override
    public PageResponse<Orders> getAllByDateRange(String fromDate, String toDate, String status, Pageable pageable) {
        LocalDate from = (fromDate != null && !fromDate.isEmpty()) ? LocalDate.parse(fromDate) : null;
        LocalDate to = (toDate != null && !toDate.isEmpty()) ? LocalDate.parse(toDate) : null;
        OrderStatus orderStatus = (status != null && !status.isEmpty() && !status.equalsIgnoreCase("all")) 
                                  ? OrderStatus.valueOf(status) : null;
        
        Page<Orders> orders = orderRepository.findAllByDateRange(from, to, orderStatus, pageable);
        return new PageResponse<Orders>(orders);
    }
}
