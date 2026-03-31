package com.tmdtud.cuahang.api.purchase_order;

import com.tmdtud.cuahang.api.purchase_order.request.PurchaseOrderStoreRequest;
import com.tmdtud.cuahang.api.purchase_order.response.PurchaseOrderResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.tmdtud.cuahang.api.purchase_order.dto.PurchaseOrderDTO;
import com.tmdtud.cuahang.api.purchase_order.service.PurchaseOrderService;
import com.tmdtud.cuahang.common.construct.BaseController;
import com.tmdtud.cuahang.common.response.ApiResponse;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("api/purchaseOrders")
@Validated
@RequiredArgsConstructor
public class PurchaseOrderController extends BaseController {

    private final PurchaseOrderService supplier;

    @GetMapping
    public ApiResponse<PageResponse<PurchaseOrderResponse>> getAll(
            @RequestParam(value = "page_no", defaultValue = "0") int page,
            @RequestParam(value = "page_size", defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return ApiResponse.success(supplier.getAll(pageable));
    }

    @PostMapping
    public ResponseEntity<PurchaseOrderResponse> create(@RequestBody PurchaseOrderStoreRequest request) {
        return ResponseEntity.ok(supplier.create(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseOrderResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(supplier.getById(id));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<PurchaseOrderResponse>> getByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(supplier.getByCustomer(customerId));
    }

}
