package com.tmdtud.cuahang.api.purchase_order.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

import com.tmdtud.cuahang.api.employer.model.Employers;
import com.tmdtud.cuahang.api.purchase_orders_detail.dto.PurchaseOrderDetailDTO;
import com.tmdtud.cuahang.api.supplier.model.Suppliers;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PurOrdHasDetailDTO {
    private PurchaseOrderDTO purchaseOrderDTO;
    private List<PurchaseOrderDetailDTO> purchaseOrderDetailDTOs;
}
