package com.tmdtud.cuahang.api.product.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.tmdtud.cuahang.api.brand.model.Brands;
import com.tmdtud.cuahang.api.brand.repository.BrandRepo;
import com.tmdtud.cuahang.api.category.model.Categories;
import com.tmdtud.cuahang.api.category.repository.CategoryRepo;
import com.tmdtud.cuahang.api.product.dto.ProductDTO;
import com.tmdtud.cuahang.api.product.mapper.ProductMapper;
import com.tmdtud.cuahang.api.product.model.Products;
import com.tmdtud.cuahang.api.product.repository.ProductRepository;
import com.tmdtud.cuahang.api.product.request.ProductStoreRequest;
import com.tmdtud.cuahang.api.product.request.ProductUpdateRequest;
import com.tmdtud.cuahang.common.response.PageResponse;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Service
@Data
@RequiredArgsConstructor
public class ProductService implements ProductServiceI {

    private final ProductRepository productRepo;
    private final BrandRepo brandRepo;
    private final CategoryRepo categoryRepo;
    private final ProductMapper productMapper;

    @Override
    public PageResponse<ProductDTO> getAll(Pageable pageable) {
        Page<Products> products = productRepo.findAll(pageable);
        return new PageResponse<ProductDTO>(products.map(product -> productMapper.toDTO(product)));
    }

    @Override
    public ProductDTO add(ProductStoreRequest request) {
        Brands brand = brandRepo.findById(request.getBrand_id()).orElse(null);
        System.out.println(brand.getName());
        Categories category = categoryRepo.findById(request.getCategory_id()).orElse(null);
        System.out.println(category.getName());

        Products product = Products.builder()
                .name(request.getName())
                .description(request.getDescription())
                .quantity(request.getQuantity())
                .price(request.getPrice())
                .brand(brand)
                .category(category).build();

        return productMapper.toDTO(productRepo.save(product));
    }

    @Override
    public boolean delete(Long id) {
        productRepo.deleteById(id);
        return true;
    }

    @Override
    public ProductDTO getById(Long id) {
        Products product = productRepo.findById(id).orElse(null);
        return productMapper.toDTO(product);
    }

    @Override
    public ProductDTO update(ProductUpdateRequest request) {
        Brands brand = brandRepo.findById(request.getBrand_id()).orElse(null);
        Categories category = categoryRepo.findById(request.getCategory_id()).orElse(null);

        Products product = Products.builder()
                .name(request.getName())
                .description(request.getDescription())
                .quantity(request.getQuantity())
                .price(request.getPrice())
                .brand(brand)
                .id(request.getId())
                .category(category).build();
        return productMapper.toDTO(productRepo.save(product));
    }

}
