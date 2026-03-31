package com.tmdtud.cuahang.api.purchase_orders_detail.mapper;

import com.tmdtud.cuahang.api.purchase_orders_detail.dto.PurchaseOrderDetailDTO;
import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetails;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-31T23:31:34+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class PurchaseOrderDetailMapperImpl implements PurchaseOrderDetailMapper {

    @Override
    public PurchaseOrderDetailDTO toDTO(PurchaseOrdersDetails purchaseOrder) {
        if ( purchaseOrder == null ) {
            return null;
        }

        PurchaseOrderDetailDTO purchaseOrderDetailDTO = new PurchaseOrderDetailDTO();

        purchaseOrderDetailDTO.setCost( purchaseOrder.getCost() );
        purchaseOrderDetailDTO.setQuantity( purchaseOrder.getQuantity() );
        purchaseOrderDetailDTO.setTotal( purchaseOrder.getTotal() );

        return purchaseOrderDetailDTO;
    }
}
