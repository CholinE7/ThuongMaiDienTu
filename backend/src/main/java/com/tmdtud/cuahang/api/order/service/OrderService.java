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

    @Override
    public PageResponse<Orders> getAll(Pageable pageable) {
        Page<Orders> orders = orderRepository.findAll(pageable);
        return new PageResponse<Orders>(orders);
    }

    @Override
    @Transactional
    public Orders add(OrderStoreRequest request) {
        CustomerDTO customerDTO = customerService.getById(request.getCustomerId());
        Customers customer = customerMapper.toEntity(customerDTO);

        Orders order = Orders.builder()
                .customer(customer)
                .method(request.getMethod())
                .status(OrderStatus.PENDING)
                .deleted(0)
                .totalPrice(request.getTotalPrice()).build();

        Orders newOrder = orderRepository.save(order);
        orderDetailService.addAll(request.getDetails(), newOrder.getId()); // tạo chi tiết đơn
                                                                           // nhập
        return newOrder;
    }

    @Override
    @Transactional
    public Orders delete(Long id) {
        Orders order = getById(id);
        if (order.getStatus().isTerminal())
            return order;
        if (!order.getStatus().isCancellable())
            return order;

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

        orderRepository.save(order);
        return order;
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

        return order;
    }

    @Override
    public PageResponse<Orders> getAllByDateRange(String fromDate, String toDate, Pageable pageable) {
        // TODO Auto-generated method stub
        LocalDate from = (fromDate != null & !fromDate.isEmpty()) ? LocalDate.parse(fromDate) : null;
        LocalDate to = (toDate != null & !toDate.isEmpty()) ? LocalDate.parse(toDate) : null;
        Page<Orders> orders = orderRepository.findAllByDateRange(from, to, pageable);
        return new PageResponse<Orders>(orders);
    }
}
