package com.tmdtud.cuahang.api.purchase_orders_detail.mapper;

import com.tmdtud.cuahang.api.purchase_order.model.PurchaseOrders;
import com.tmdtud.cuahang.api.purchase_orders_detail.dto.PurchaseOrderDetailDTO;
import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetails;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-02T11:43:16+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class PurchaseOrderDetailMapperImpl implements PurchaseOrderDetailMapper {

    @Override
    public PurchaseOrderDetailDTO toDTO(PurchaseOrdersDetails purchaseOrdersDetails) {
        if ( purchaseOrdersDetails == null ) {
            return null;
        }

        PurchaseOrderDetailDTO purchaseOrderDetailDTO = new PurchaseOrderDetailDTO();

        purchaseOrderDetailDTO.setPurchaseOrderId( purchaseOrdersDetailsPurchaseOrderId( purchaseOrdersDetails ) );
        purchaseOrderDetailDTO.setProduct( purchaseOrdersDetails.getProduct() );
        purchaseOrderDetailDTO.setQuantity( purchaseOrdersDetails.getQuantity() );
        purchaseOrderDetailDTO.setCost( purchaseOrdersDetails.getCost() );
        purchaseOrderDetailDTO.setTotal( purchaseOrdersDetails.getTotal() );

        return purchaseOrderDetailDTO;
    }

    @Override
    public List<PurchaseOrderDetailDTO> toDTOList(List<PurchaseOrdersDetails> purchaseOrdersDetails) {
        if ( purchaseOrdersDetails == null ) {
            return null;
        }

        List<PurchaseOrderDetailDTO> list = new ArrayList<PurchaseOrderDetailDTO>( purchaseOrdersDetails.size() );
        for ( PurchaseOrdersDetails purchaseOrdersDetails1 : purchaseOrdersDetails ) {
            list.add( toDTO( purchaseOrdersDetails1 ) );
        }

        return list;
    }

    private Long purchaseOrdersDetailsPurchaseOrderId(PurchaseOrdersDetails purchaseOrdersDetails) {
        if ( purchaseOrdersDetails == null ) {
            return null;
        }
        PurchaseOrders purchaseOrder = purchaseOrdersDetails.getPurchaseOrder();
        if ( purchaseOrder == null ) {
            return null;
        }
        Long id = purchaseOrder.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
