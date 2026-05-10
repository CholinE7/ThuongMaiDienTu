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
                        @Param("fromDate") java.time.LocalDateTime fromDate,
                        @Param("toDate") java.time.LocalDateTime toDate,
                        @Param("status") OrderStatus status,
                        Pageable pageable);

        @Query("SELECT o FROM Orders o WHERE o.customer.id = :customerId AND o.deleted = 0")
        Page<Orders> findByCustomerId(@Param("customerId") Long customerId, Pageable pageable);

        @Query("""
                        SELECT o.status, COUNT(o), SUM(o.totalPrice)
                        FROM Orders o
                        WHERE o.deleted = 0
                        AND (:fromDate is null OR o.createdAt >= :fromDate)
                        AND (:toDate is null OR o.createdAt <= :toDate)
                        GROUP BY o.status
                        """)
        java.util.List<Object[]> getStatsByStatus(
                        @Param("fromDate") java.time.LocalDateTime fromDate,
                        @Param("toDate") java.time.LocalDateTime toDate);

        @Query("""
                        SELECT COALESCE(SUM(o.totalPrice), 0)
                        FROM Orders o
                        WHERE o.deleted = 0
                        AND o.paymentStatus = 'PAID'
                        AND (:fromDate is null OR o.createdAt >= :fromDate)
                        AND (:toDate is null OR o.createdAt <= :toDate)
                        """)
        java.math.BigDecimal sumPaidRevenue(
                        @Param("fromDate") java.time.LocalDateTime fromDate,
                        @Param("toDate") java.time.LocalDateTime toDate);

        @Query("""
                        SELECT od.product.name, SUM(od.quantity), SUM(od.total)
                        FROM OrdersDetails od
                        JOIN od.order o
                        WHERE o.deleted = 0 AND o.status != 'CANCELLED'
                        AND (:fromDate is null OR o.createdAt >= :fromDate)
                        AND (:toDate is null OR o.createdAt <= :toDate)
                        GROUP BY od.product.id, od.product.name
                        ORDER BY SUM(od.quantity) DESC
                        """)
        java.util.List<Object[]> getTopSellingProducts(
                        @Param("fromDate") java.time.LocalDateTime fromDate,
                        @Param("toDate") java.time.LocalDateTime toDate,
                        org.springframework.data.domain.Pageable pageable);

        // Tìm các đơn hàng MOMO, chưa thanh toán quá hạn
        @Query("""
                        SELECT o FROM Orders o
                        WHERE o.method = 'MOMO'
                        AND o.paymentStatus = 'UNPAID'
                        AND o.status = 'PENDING'
                        AND o.createdAt < :expiryTime
                        AND o.deleted = 0
                        """)
        List<Orders> findPendingMomoOrders(@Param("expiryTime") java.sql.Timestamp expiryTime);
}
