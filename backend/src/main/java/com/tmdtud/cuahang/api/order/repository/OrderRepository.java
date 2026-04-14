package com.tmdtud.cuahang.api.order.repository;

import java.time.LocalDate;

//khác với hibernate Page
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tmdtud.cuahang.api.order.model.Orders;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long> {

    @Query("""
            SELECT o from Orders o WHERE o.deleted = 0
            AND (:fromDate is null OR o.created_at >= :fromDate)
            AND (:toDate is null OR o.created_at <= :toDate)
            """)
    Page<Orders> findAllByDateRange(
            @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate,
            Pageable pageable);
}
