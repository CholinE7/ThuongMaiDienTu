package com.tmdtud.cuahang.api.purchase_order.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import com.tmdtud.cuahang.api.purchase_order.dto.PurchaseOrderDTO;
import com.tmdtud.cuahang.api.purchase_order.model.PurchaseOrders;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PurchaseOrderMapper {
    PurchaseOrderDTO toDTO(PurchaseOrders purchaseOrder);

    List<PurchaseOrderDTO> toDTOList(List<PurchaseOrders> purchaseOrders);

    PurchaseOrders toEntity(PurchaseOrderDTO purchaseOrder);

}
