package com.tmdtud.cuahang.api.purchase_orders_detail;

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

import com.tmdtud.cuahang.api.purchase_orders_detail.dto.PurchaseOrderDetailDTO;
import com.tmdtud.cuahang.api.purchase_orders_detail.mapper.PurchaseOrderDetailMapper;
import com.tmdtud.cuahang.api.purchase_orders_detail.model.PurchaseOrdersDetails;
import com.tmdtud.cuahang.api.purchase_orders_detail.request.PurchaseOrderDetailStoreRequest;
import com.tmdtud.cuahang.api.purchase_orders_detail.request.PurchaseOrderDetailUpdateRequest;
import com.tmdtud.cuahang.api.purchase_orders_detail.service.PurchaseOrderDetailService;
import com.tmdtud.cuahang.common.construct.BaseController;
import com.tmdtud.cuahang.common.response.ApiResponse;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/purchaseOrdersDetails")
@Validated
@RequiredArgsConstructor
public class PurchaseOrderDetailController extends BaseController {

    private final PurchaseOrderDetailService purchase_order_detail_service;
    private final PurchaseOrderDetailMapper purchaseOrderDetailMapper;

    @GetMapping
    public ApiResponse<PageResponse<PurchaseOrderDetailDTO>> getAll(
            @RequestParam(value = "page_no", defaultValue = "0") int page,
            @RequestParam(value = "page_size", defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);
        PageResponse<PurchaseOrdersDetails> pageResponse = purchase_order_detail_service.getAll(pageable);
        List<PurchaseOrdersDetails> purchaseOrdersDetails = pageResponse.getContent();

        List<PurchaseOrderDetailDTO> purchaseOrderDetailDTOs = purchaseOrdersDetails.stream()
                .map(item -> purchaseOrderDetailMapper.toDTO(item)).collect(Collectors.toList());
        PageResponse<PurchaseOrderDetailDTO> pageResponse2 = PageResponse.<PurchaseOrderDetailDTO>builder()
                .content(purchaseOrderDetailDTOs)
                .num(pageResponse.getNum())
                .size(pageResponse.getSize())
                .total(pageResponse.getTotal()).build();

        return ApiResponse.success(pageResponse2);
    }

    @PostMapping()
    public ApiResponse<PurchaseOrderDetailDTO> add(@Validated @RequestBody PurchaseOrderDetailStoreRequest request) {
        return ApiResponse.success(purchaseOrderDetailMapper.toDTO(purchase_order_detail_service.add(request)));
    }

    @DeleteMapping("/{purchase_order_detail_id}/{product_id}")
    public ApiResponse<Boolean> delete(@PathVariable Long puchase, @PathVariable Long product) {
        return ApiResponse.success(purchase_order_detail_service.delete(puchase, product));
    }

    @PutMapping()
    public ApiResponse<Boolean> update(@Validated @RequestBody PurchaseOrderDetailUpdateRequest request) {
        return ApiResponse.success(true);
    }

    @GetMapping("/{purchase_order_detail_id}/{product_id}")
    public ApiResponse<PurchaseOrderDetailDTO> getById(@PathVariable Long puchase, @PathVariable Long product) {
        return ApiResponse
                .success(purchaseOrderDetailMapper.toDTO(purchase_order_detail_service.getById(puchase, product)));
    }

}
