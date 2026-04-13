package com.tmdtud.cuahang.api.purchase_order.request;

import com.tmdtud.cuahang.api.purchase_order.model.PurchaseOrderStatus;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateStatusRequest {
    @NotNull(message = "id not null")
    private Long purchaseOrderId;

    @NotNull(message = "status not null")
    private PurchaseOrderStatus purchaseOrderStatusNext;
}
