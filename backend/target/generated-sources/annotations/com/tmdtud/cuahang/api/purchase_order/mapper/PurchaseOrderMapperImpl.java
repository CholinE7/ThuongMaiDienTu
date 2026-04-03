package com.tmdtud.cuahang.api.purchase_order.mapper;

import com.tmdtud.cuahang.api.purchase_order.dto.PurchaseOrderDTO;
import com.tmdtud.cuahang.api.purchase_order.model.PurchaseOrders;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-04T01:51:00+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class PurchaseOrderMapperImpl implements PurchaseOrderMapper {

    @Override
    public PurchaseOrderDTO toDTO(PurchaseOrders purchaseOrder) {
        if ( purchaseOrder == null ) {
            return null;
        }

        PurchaseOrderDTO purchaseOrderDTO = new PurchaseOrderDTO();

        purchaseOrderDTO.setCreated_at( purchaseOrder.getCreated_at() );
        purchaseOrderDTO.setEmployer( purchaseOrder.getEmployer() );
        purchaseOrderDTO.setId( purchaseOrder.getId() );
        purchaseOrderDTO.setMethod( purchaseOrder.getMethod() );
        purchaseOrderDTO.setTotalPrice( purchaseOrder.getTotalPrice() );
        purchaseOrderDTO.setUpdated_at( purchaseOrder.getUpdated_at() );

        return purchaseOrderDTO;
    }

    @Override
    public List<PurchaseOrderDTO> toDTOList(List<PurchaseOrders> purchaseOrders) {
        if ( purchaseOrders == null ) {
            return null;
        }

        List<PurchaseOrderDTO> list = new ArrayList<PurchaseOrderDTO>( purchaseOrders.size() );
        for ( PurchaseOrders purchaseOrders1 : purchaseOrders ) {
            list.add( toDTO( purchaseOrders1 ) );
        }

        return list;
    }

    @Override
    public PurchaseOrders toEntity(PurchaseOrderDTO purchaseOrder) {
        if ( purchaseOrder == null ) {
            return null;
        }

        PurchaseOrders.PurchaseOrdersBuilder purchaseOrders = PurchaseOrders.builder();

        purchaseOrders.created_at( purchaseOrder.getCreated_at() );
        purchaseOrders.employer( purchaseOrder.getEmployer() );
        purchaseOrders.id( purchaseOrder.getId() );
        purchaseOrders.method( purchaseOrder.getMethod() );
        purchaseOrders.totalPrice( purchaseOrder.getTotalPrice() );
        purchaseOrders.updated_at( purchaseOrder.getUpdated_at() );

        return purchaseOrders.build();
    }
}
