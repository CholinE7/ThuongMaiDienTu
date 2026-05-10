package com.tmdtud.cuahang.api.order.task;

import com.tmdtud.cuahang.api.order.model.Orders;
import com.tmdtud.cuahang.api.order.service.OrderService;
import com.tmdtud.cuahang.api.order.repository.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Component
@Slf4j
public class OrderTask {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderService orderService;

    /**
     * Chạy mỗi 10 giây để test nhanh (10.000ms)
     */
    @Scheduled(fixedRate = 10000)
    public void cancelExpiredOrders() {
        // Mốc thời gian 30 giây trước (Dành cho việc test)
        Timestamp expiryTime = Timestamp.valueOf(LocalDateTime.now().minusSeconds(30));

        List<Orders> expiredOrders = orderRepository.findExpiredUnpaidOrders(expiryTime);

        if (!expiredOrders.isEmpty()) {
            log.info("Phát hiện {} đơn hàng quá hạn thanh toán 30 giây. Bắt đầu tự động hủy...", expiredOrders.size());
            for (Orders order : expiredOrders) {
                try {
                    // Sử dụng hàm delete có sẵn trong OrderService để đảm bảo hoàn lại kho
                    orderService.delete(order.getId());
                    log.info("Tự động hủy đơn hàng thành công: ID = {}", order.getId());
                } catch (Exception e) {
                    log.error("Lỗi khi tự động hủy đơn hàng ID = {}: {}", order.getId(), e.getMessage());
                }
            }
        }
    }
}
