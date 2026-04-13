package com.tmdtud.cuahang.api.purchase_order.dto;

import java.util.List;

import com.tmdtud.cuahang.api.purchase_orders_detail.dto.PurchaseOrderDetailDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PurOrdHasDetailDTO {
    private PurchaseOrderDTO purchaseOrder;
    private List<PurchaseOrderDetailDTO> details;
}
