package com.tmdtud.cuahang.api.purchase_order;

import java.util.List;
import java.util.stream.Collectors;

import com.tmdtud.cuahang.api.purchase_order.request.PurchaseOrderStoreRequest;
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

import com.tmdtud.cuahang.api.order.model.Orders;
import com.tmdtud.cuahang.api.purchase_order.dto.PurOrdHasDetailDTO;
import com.tmdtud.cuahang.api.purchase_order.model.PurchaseOrders;
import com.tmdtud.cuahang.api.purchase_order.request.PurchaseOrderUpdateRequest;
import com.tmdtud.cuahang.api.purchase_order.request.UpdateStatusRequest;
import com.tmdtud.cuahang.api.purchase_order.service.PurchaseOrderService;
import com.tmdtud.cuahang.common.construct.BaseController;
import com.tmdtud.cuahang.common.response.ApiResponse;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/purchaseOrders")
@Validated
@RequiredArgsConstructor
public class PurchaseOrderController extends BaseController {

    private final PurchaseOrderService purchaseOrderService;

    @GetMapping
    public ApiResponse<PageResponse<PurOrdHasDetailDTO>> getAll(
            @RequestParam(value = "page_no", defaultValue = "0") int page,
            @RequestParam(value = "page_size", defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        PageResponse<PurchaseOrders> pageResponse = purchaseOrderService.getAll(pageable);
        List<PurchaseOrders> purchaseOrders = pageResponse.getContent();
        List<PurOrdHasDetailDTO> purOrdHasDetailDTOs = purchaseOrders.stream()
                .map(item -> purchaseOrderService.toPurOrdHasDetailDTO(item))
                .collect(Collectors.toList());
        PageResponse<PurOrdHasDetailDTO> pageResponse2 = PageResponse.<PurOrdHasDetailDTO>builder()
                .content(purOrdHasDetailDTOs)
                .num(pageResponse.getNum())
                .size(pageResponse.getSize())
                .total(pageResponse.getTotal()).build();

        return ApiResponse.success(pageResponse2);
    }

    @PostMapping()
    public ApiResponse<PurOrdHasDetailDTO> add(@Validated @RequestBody PurchaseOrderStoreRequest request) {
        PurchaseOrders purchaseOrders = purchaseOrderService.add(request);
        return ApiResponse.success(purchaseOrderService.toPurOrdHasDetailDTO(purchaseOrders));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Boolean> delete(@PathVariable Long id) {
        return ApiResponse.success(purchaseOrderService.delete(id));
    }

    @GetMapping("/{id}")
    public ApiResponse<PurOrdHasDetailDTO> getById(@PathVariable Long id) {
        PurchaseOrders purchaseOrders = purchaseOrderService.getById(id);
        return ApiResponse.success(purchaseOrderService.toPurOrdHasDetailDTO(purchaseOrders));
    }

    @PutMapping()
    public ApiResponse<PurOrdHasDetailDTO> update(@Validated @RequestBody PurchaseOrderUpdateRequest request) {
        PurchaseOrders purchaseOrders = purchaseOrderService.update(request);
        return ApiResponse.success(purchaseOrderService.toPurOrdHasDetailDTO(purchaseOrders));
    }

    @PutMapping("/status")
    public ApiResponse<Boolean> updateStatus(@Validated @RequestBody UpdateStatusRequest request) {
        return ApiResponse.success(purchaseOrderService.updateStatus(request));
    }
}
