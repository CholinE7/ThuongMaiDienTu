package com.tmdtud.cuahang.api.order.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import com.tmdtud.cuahang.api.order.dto.OrderDTO;
import com.tmdtud.cuahang.api.order.model.Orders;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface OrderMapper {
    OrderDTO toDTO(Orders order);

    List<OrderDTO> toDTOList(List<Orders> orders);

    Orders toEntity(OrderDTO order);


}
