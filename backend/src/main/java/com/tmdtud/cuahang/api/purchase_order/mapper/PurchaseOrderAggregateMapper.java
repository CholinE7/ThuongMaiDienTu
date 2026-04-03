package com.tmdtud.cuahang.api.purchase_order.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import com.tmdtud.cuahang.api.purchase_order.dto.PurOrdHasDetailDTO;
import com.tmdtud.cuahang.api.purchase_order.model.PurchaseOrders;
import com.tmdtud.cuahang.api.purchase_orders_detail.mapper.PurchaseOrderDetailMapper;
import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetails;

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    uses = {PurchaseOrderMapper.class, PurchaseOrderDetailMapper.class}
)
public interface PurchaseOrderAggregateMapper {
    @Mapping(source = "order", target = "purchaseOrderDTO")
    @Mapping(source = "details", target = "purchaseOrderDetailDTOs")
    PurOrdHasDetailDTO toPurOrdHasDetailDTO(PurchaseOrders order, List<PurchaseOrdersDetails> details);
}
