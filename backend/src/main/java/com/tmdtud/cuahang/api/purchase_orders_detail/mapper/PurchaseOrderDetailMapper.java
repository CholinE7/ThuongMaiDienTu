package com.tmdtud.cuahang.api.purchase_orders_detail.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import com.tmdtud.cuahang.api.purchase_orders_detail.dto.PurchaseOrderDetailDTO;
import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetails;


@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PurchaseOrderDetailMapper {
    PurchaseOrderDetailDTO toDTO(PurchaseOrdersDetails purchaseOrder);
}
