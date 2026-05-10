package com.tmdtud.cuahang.api.order.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

//khác với hibernate Page
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tmdtud.cuahang.api.order.model.Orders;
import com.tmdtud.cuahang.api.order.model.OrderStatus;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long> {

    @Query("""
            SELECT o from Orders o WHERE o.deleted = 0
            AND (:fromDate is null OR o.createdAt >= :fromDate)
            AND (:toDate is null OR o.createdAt <= :toDate)
            AND (:status is null OR o.status = :status)
            """)
    Page<Orders> findAllByDateRange(
            @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate,
            @Param("status") OrderStatus status,
            Pageable pageable);

    @Query("SELECT o FROM Orders o WHERE o.customer.id = :customerId AND o.deleted = 0")
    Page<Orders> findByCustomerId(@Param("customerId") Long customerId, Pageable pageable);

    @Query("""
            SELECT COUNT(o) FROM Orders o WHERE o.deleted = 0
            AND (:fromDate is null OR o.createdAt >= :fromDate)
            AND (:toDate is null OR o.createdAt <= :toDate)
            AND (:status is null OR o.status = :status)
            """)
    long countOrders(
            @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate,
            @Param("status") OrderStatus status);

    @Query("""
            SELECT COALESCE(SUM(o.totalPrice), 0) FROM Orders o WHERE o.deleted = 0
            AND (:fromDate is null OR o.createdAt >= :fromDate)
            AND (:toDate is null OR o.createdAt <= :toDate)
            AND (:status is null OR o.status = :status)
            """)
    java.math.BigDecimal sumRevenue(
            @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate,
            @Param("status") OrderStatus status);


        // Tìm các đơn hàng MOMO, chưa thanh toán và thời gian hiện tại trừ đi thời gian tạo lớn hơn 5 phút
        @Query(value = """
                SELECT * FROM orders o
                WHERE o.method = 'MOMO' 
                AND o.payment_status = 'UNPAID'
                AND o.status = 'PENDING'
                AND TIMESTAMPDIFF(MINUTE, o.created_at, NOW()) > 1
                AND o.deleted = 0
                """
        , nativeQuery = true)
        List<Orders> findPendingMomoOrders();
}
