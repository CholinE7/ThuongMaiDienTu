package com.tmdtud.cuahang.api.purchase_order.request;

import com.tmdtud.cuahang.api.purchase_orders_detail.request.PurchaseOrderDetailStoreRequest;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Data
public class PurchaseOrderStoreRequest {

    private String method;

    @NotEmpty(message = "Khách hàng không được để trống")
    @Email(message = "Email không hợp lệ")
    private Long customerId;

    @NotEmpty(message = "Nhân viên không được để trống")
    private Long employerId;

    @NotNull(message = "Không được trống chi tiết")
    private List<PurchaseOrderDetailStoreRequest> details;
}
