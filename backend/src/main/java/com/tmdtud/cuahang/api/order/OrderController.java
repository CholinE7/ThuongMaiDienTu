package com.tmdtud.cuahang.api.order;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tmdtud.cuahang.api.order.dto.OrdHasDetailDTO;
import com.tmdtud.cuahang.api.order.model.Orders;
import com.tmdtud.cuahang.api.order.request.OrderStoreRequest;
import com.tmdtud.cuahang.api.order.request.OrderUpdateRequest;
import com.tmdtud.cuahang.api.order.request.UpdateOrderStatusRequest;
import com.tmdtud.cuahang.api.order.service.OrderService;
import com.tmdtud.cuahang.common.construct.BaseController;
import com.tmdtud.cuahang.common.response.ApiResponse;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/orders")
@Validated
@RequiredArgsConstructor
public class OrderController extends BaseController {

    private final OrderService orderService;

    @GetMapping
    public ApiResponse<PageResponse<OrdHasDetailDTO>> getAll(
            @RequestParam(value = "page_no", defaultValue = "0") int page,
            @RequestParam(value = "page_size", defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        PageResponse<Orders> pageResponse = orderService.getAll(pageable);
        List<Orders> orders = pageResponse.getContent();
        List<OrdHasDetailDTO> ordHasDetailDTOs = orders.stream()
                .map(item -> orderService.toOrdHasDetailDTO(item))
                .collect(Collectors.toList());
        PageResponse<OrdHasDetailDTO> pageResponse2 = PageResponse.<OrdHasDetailDTO>builder()
                .content(ordHasDetailDTOs)
                .num(pageResponse.getNum())
                .size(pageResponse.getSize())
                .total(pageResponse.getTotal()).build();

        return ApiResponse.success(pageResponse2);
    }

    @PostMapping()
    public ApiResponse<OrdHasDetailDTO> add(@Validated @RequestBody OrderStoreRequest request) {
        Orders purchaseOrders = orderService.add(request);
        return ApiResponse.success(orderService.toOrdHasDetailDTO(purchaseOrders));
    }

    @DeleteMapping("/{employerId}/{id}")
    public ApiResponse<OrdHasDetailDTO> delete(@PathVariable Long employerId, @PathVariable Long id) {
        return ApiResponse.success(orderService.toOrdHasDetailDTO(orderService.delete(id)));
    }

    @GetMapping("/{id}")
    public ApiResponse<OrdHasDetailDTO> getById(@PathVariable Long id) {
        Orders purchaseOrders = orderService.getById(id);
        return ApiResponse.success(orderService.toOrdHasDetailDTO(purchaseOrders));
    }

    @PutMapping()
    public ApiResponse<OrdHasDetailDTO> update(@Validated @RequestBody OrderUpdateRequest request) {
        Orders purchaseOrders = orderService.update(request);
        return ApiResponse.success(orderService.toOrdHasDetailDTO(purchaseOrders));
    }

    @PutMapping("/status")
    public ApiResponse<OrdHasDetailDTO> updateStatus(@Validated @RequestBody UpdateOrderStatusRequest request) {
        return ApiResponse.success(orderService.toOrdHasDetailDTO(orderService.updateStatus(request)));
    }
}
