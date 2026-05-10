package com.tmdtud.cuahang.api.order.service;

import com.tmdtud.cuahang.api.customer.dto.CustomerDTO;
import com.tmdtud.cuahang.api.customer.mapper.CustomerMapper;
import com.tmdtud.cuahang.api.customer.model.Customers;
import com.tmdtud.cuahang.api.customer.service.CustomerService;
import com.tmdtud.cuahang.api.product.model.Products;
import com.tmdtud.cuahang.api.product.service.ProductService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
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
import com.tmdtud.cuahang.common.service.SseService;

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
            if (customerDTO != null) {
                customer = customerMapper.toEntity(customerDTO);
            }
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
                .paymentStatus(request.getMethod().equalsIgnoreCase("MOMO") ? "UNPAID" : "COD")
                .deleted(0)
                .totalPrice(request.getTotalPrice()).build();

        if (request.getEmployerId() != null) {
            Employers employer = employerService.getById(request.getEmployerId());
            order.setEmployer(employer);
        }

        Orders newOrder = orderRepository.save(order);
        orderDetailService.addAll(request.getDetails(), newOrder.getId());

        // Trừ số lượng tồn kho ngay khi tạo đơn hàng (Trạng thái CHỜ XÁC NHẬN)
        List<OrdersDetails> details = orderDetailService.getByOrderId(newOrder.getId());
        for (OrdersDetails item : details) {
            Products pro = item.getProduct();

            // Cập nhật số lượng biến thể
            java.util.Optional<com.tmdtud.cuahang.api.product.model.ProductVariant> variantOpt = variantRepo
                    .findByProductAndColorAndSize(pro, item.getColor(), item.getSize());

            if (variantOpt.isPresent()) {
                com.tmdtud.cuahang.api.product.model.ProductVariant variant = variantOpt.get();
                if (variant.getQuantity() < item.getQuantity()) {
                    throw new RuntimeException("Biến thể " + item.getColor() + " size " + item.getSize() +
                            " của sản phẩm " + pro.getName() + " không đủ số lượng tồn kho!");
                }
                variant.setQuantity(variant.getQuantity() - item.getQuantity());
                variantRepo.save(variant);
            }

            // Cập nhật tổng số lượng sản phẩm
            if (pro.getQuantity() < item.getQuantity()) {
                throw new RuntimeException("Sản phẩm " + pro.getName() + " không đủ số lượng tồn kho!");
            }
            pro.setQuantity(pro.getQuantity() - item.getQuantity());
            productService.update(pro);
        }

        return newOrder;
    }

    private void restoreInventory(Orders order) {
        List<OrdersDetails> ordersDetails = orderDetailService.getByOrderId(order.getId());
        for (OrdersDetails item : ordersDetails) {
            Products pro = item.getProduct();

            // Hoàn lại số lượng biến thể
            java.util.Optional<com.tmdtud.cuahang.api.product.model.ProductVariant> variantOpt = variantRepo
                    .findByProductAndColorAndSize(pro, item.getColor(), item.getSize());
            if (variantOpt.isPresent()) {
                com.tmdtud.cuahang.api.product.model.ProductVariant variant = variantOpt.get();
                variant.setQuantity(variant.getQuantity() + item.getQuantity());
                variantRepo.save(variant);
            }

            // Hoàn lại tổng số lượng sản phẩm
            pro.setQuantity(pro.getQuantity() + item.getQuantity());
            productService.update(pro);
        }
    }

    @Override
    @Transactional
    public Orders delete(Long id) {
        Orders order = getById(id);
        if (order.getStatus().isTerminal())
            throw new RuntimeException("Đơn hàng đã kết thúc, không thể hủy");
        if (!order.getStatus().isCancellable())
            throw new RuntimeException("Chỉ có thể hủy đơn hàng ở trạng thái Chờ xác nhận hoặc Đã xác nhận");

        restoreInventory(order);

        order.setStatus(OrderStatus.CANCELLED);
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

    @Autowired
    private com.tmdtud.cuahang.api.product.repository.ProductVariantRepository variantRepo;

    @Override
    @Transactional
    public Orders updateStatus(UpdateOrderStatusRequest request) throws Exception {
        Employers employer = employerService.getById(request.getEmployerId());
        Orders order = getById(request.getOrderId());

        if (request.getOrderStatusNext() == OrderStatus.CANCELLED) {
            if (!order.getStatus().isCancellable()) {
                throw new Exception("Đơn hàng ở trạng thái " + order.getStatus() + " không thể hủy");
            }
            // Hoàn lại kho khi hủy
            restoreInventory(order);
        } else if (!order.getStatus().canAdvanceTo(request.getOrderStatusNext())) {
            throw new Exception(
                    "Không thể cập nhật trạng thái từ " + order.getStatus() + " sang " + request.getOrderStatusNext());
        }

        // Kiểm tra logic thanh toán: MoMo phải PAID mới được CONFIRMED
        if (request.getOrderStatusNext().equals(OrderStatus.CONFIRMED)
                && "MOMO".equalsIgnoreCase(order.getMethod())
                && !"PAID".equals(order.getPaymentStatus())) {
            throw new Exception("Đơn hàng MoMo chưa được thanh toán, không thể xác nhận");
        }

        order.setEmployer(employer);
        order.setStatus(request.getOrderStatusNext());

        // Nếu là COD và hoàn thành đơn hàng, tự động đánh dấu đã thanh toán
        if ("COD".equalsIgnoreCase(order.getMethod()) && OrderStatus.DELIVERED.equals(request.getOrderStatusNext())) {
            order.setPaymentStatus("PAID");
        }

        orderRepository.save(order);

        // Đã trừ tồn kho ở add(), không trừ lại ở CONFIRMED nữa

        return order;
    }

    @Override
    public PageResponse<Orders> getAllByDateRange(String fromDate, String toDate, String status, Pageable pageable) {
        java.time.LocalDateTime start = (fromDate != null && !fromDate.isEmpty())
                ? LocalDate.parse(fromDate).atStartOfDay()
                : null;
        java.time.LocalDateTime end = (toDate != null && !toDate.isEmpty())
                ? LocalDate.parse(toDate).atTime(23, 59, 59, 999999999)
                : null;

        OrderStatus orderStatus = (status != null && !status.isEmpty() && !status.equalsIgnoreCase("all"))
                ? OrderStatus.valueOf(status)
                : null;

        Page<Orders> orders = orderRepository.findAllByDateRange(start, end, orderStatus, pageable);
        return new PageResponse<Orders>(orders);
    }

    @Override
    @Scheduled(fixedRate = 10000) // chạy mỗi 10 giây
    public void cancelOrderExpired() {
        LocalDateTime fiveMinutesAgo = LocalDateTime.now().minusMinutes(1);
        System.out.println(fiveMinutesAgo);

        List<Orders> expiredOrders = orderRepository
                .findPendingMomoOrders();
        System.out.println("Tìm thấy " + expiredOrders.size() + " đơn hàng MoMo chưa thanh toán quá 1 phút, sẽ hủy...");

        for (Orders order : expiredOrders) {
            try {
                order.setStatus(OrderStatus.CANCELLED);
                orderRepository.save(order);

                sseService.sendToAll(Map.of(
                        "orderId", order.getId(),
                        "status", "CANCELLED",
                        "message", "Đơn hàng MoMo chưa thanh toán quá 5 phút đã bị hủy"));
            } catch (Exception e) {
                // Log lỗi nếu cần thiết, nhưng tiếp tục xử lý các đơn hàng khác
                System.err.println("Lỗi khi hủy đơn hàng ID " + order.getId() + ": " + e.getMessage());
            }
        }
    }
}
