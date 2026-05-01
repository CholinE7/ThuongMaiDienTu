package com.tmdtud.cuahang.api.purchase_order.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

import com.tmdtud.cuahang.api.purchase_order.dto.PurchaseOrderDTO;
import com.tmdtud.cuahang.api.purchase_order.model.PurchaseOrders;
import com.tmdtud.cuahang.api.purchase_orders_detail.mapper.PurchaseOrderDetailMapper;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        uses = { PurchaseOrderDetailMapper.class },
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PurchaseOrderMapper {

    @Mapping(source = "details", target = "details")
    PurchaseOrderDTO toDTO(PurchaseOrders purchaseOrder);

    List<PurchaseOrderDTO> toDTOList(List<PurchaseOrders> purchaseOrders);

    PurchaseOrders toEntity(PurchaseOrderDTO purchaseOrder);

}
