package com.tmdtud.cuahang.api.order_detail.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import com.tmdtud.cuahang.api.order_detail.dto.OrderDetailDTO;
import com.tmdtud.cuahang.api.order_detail.model.OrdersDetails;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface OrderDetailMapper {
    OrderDetailDTO toDTO(OrdersDetails purchaseOrdersDetails);

    List<OrderDetailDTO> toDTOList(List<OrdersDetails> ordersDetails);
}
