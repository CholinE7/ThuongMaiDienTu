package com.tmdtud.cuahang.api.purchase_orders_detail.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import com.tmdtud.cuahang.api.product.mapper.ProductMapper;
import com.tmdtud.cuahang.api.purchase_orders_detail.dto.PurchaseOrderDetailDTO;
import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetails;


@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    uses = {ProductMapper.class}
)
public interface PurchaseOrderDetailMapper {
    @Mapping(source = "purchaseOrder.id", target = "purchaseOrderId")
    @Mapping(source = "product", target = "product")
    PurchaseOrderDetailDTO toDTO(PurchaseOrdersDetails purchaseOrdersDetails);
    
    List<PurchaseOrderDetailDTO> toDTOList(List<PurchaseOrdersDetails> purchaseOrdersDetails);
}
