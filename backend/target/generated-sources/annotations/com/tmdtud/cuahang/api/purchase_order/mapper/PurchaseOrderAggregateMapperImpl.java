package com.tmdtud.cuahang.api.purchase_order.mapper;

import com.tmdtud.cuahang.api.purchase_order.dto.PurOrdHasDetailDTO;
import com.tmdtud.cuahang.api.purchase_order.model.PurchaseOrders;
import com.tmdtud.cuahang.api.purchase_orders_detail.mapper.PurchaseOrderDetailMapper;
import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetails;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-04T01:46:49+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class PurchaseOrderAggregateMapperImpl implements PurchaseOrderAggregateMapper {

    @Autowired
    private PurchaseOrderMapper purchaseOrderMapper;
    @Autowired
    private PurchaseOrderDetailMapper purchaseOrderDetailMapper;

    @Override
    public PurOrdHasDetailDTO toPurOrdHasDetailDTO(PurchaseOrders order, List<PurchaseOrdersDetails> details) {
        if ( order == null && details == null ) {
            return null;
        }

        PurOrdHasDetailDTO.PurOrdHasDetailDTOBuilder purOrdHasDetailDTO = PurOrdHasDetailDTO.builder();

        purOrdHasDetailDTO.purchaseOrderDTO( purchaseOrderMapper.toDTO( order ) );
        purOrdHasDetailDTO.purchaseOrderDetailDTOs( purchaseOrderDetailMapper.toDTOList( details ) );

        return purOrdHasDetailDTO.build();
    }
}
