package com.tmdtud.cuahang.api.purchase_orders_detail.mapper;

import com.tmdtud.cuahang.api.purchase_orders_detail.dto.PurchaseOrderDetailDTO;
import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetails;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-31T18:06:17+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.18 (Microsoft)"
)
@Component
public class PurchaseOrderDetailMapperImpl implements PurchaseOrderDetailMapper {

    @Override
    public PurchaseOrderDetailDTO toDTO(PurchaseOrdersDetails purchaseOrder) {
        if ( purchaseOrder == null ) {
            return null;
        }

        PurchaseOrderDetailDTO purchaseOrderDetailDTO = new PurchaseOrderDetailDTO();

        purchaseOrderDetailDTO.setQuantity( purchaseOrder.getQuantity() );
        purchaseOrderDetailDTO.setCost( purchaseOrder.getCost() );
        purchaseOrderDetailDTO.setTotal( purchaseOrder.getTotal() );

        return purchaseOrderDetailDTO;
    }
}
