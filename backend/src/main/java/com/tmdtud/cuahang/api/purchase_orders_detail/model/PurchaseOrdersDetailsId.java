package com.tmdtud.cuahang.api.purchase_orders_detail.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PurchaseOrdersDetailsId implements Serializable {
    @Column
    private Long purchase_order_id;

    @Column
    private Long product_id;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PurchaseOrdersDetailsId that = (PurchaseOrdersDetailsId) o;
        return Objects.equals(purchase_order_id, that.purchase_order_id) && 
               Objects.equals(product_id, that.product_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(purchase_order_id, product_id);
    }


}
