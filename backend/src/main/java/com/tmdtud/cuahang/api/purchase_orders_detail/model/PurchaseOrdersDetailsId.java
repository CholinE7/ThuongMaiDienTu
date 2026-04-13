package com.tmdtud.cuahang.api.purchase_orders_detail.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class PurchaseOrdersDetailsId implements Serializable {
    @Column
    private Long purchaseOrderId;

    @Column
    private Long productId;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        PurchaseOrdersDetailsId that = (PurchaseOrdersDetailsId) o;
        return Objects.equals(purchaseOrderId, that.purchaseOrderId) &&
                Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(purchaseOrderId, productId);
    }

}
