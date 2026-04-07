package com.tmdtud.cuahang.api.product.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tmdtud.cuahang.api.brand.model.Brands;
import com.tmdtud.cuahang.api.brand.service.BrandService;
import com.tmdtud.cuahang.api.category.model.Categories;
import com.tmdtud.cuahang.api.category.service.CategoryService;
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

    private final BrandService brandService;
    private final CategoryService categoryService;

    @Override
    public PageResponse<Products> getAll(Pageable pageable) {
        Page<Products> products = productRepo.findAll(pageable);
        return new PageResponse<Products>(products);
    }

    @Override
    public Products add(ProductStoreRequest request) {
        Brands brand = brandService.getById(request.getBrand_id());
        System.out.println(brand.getName());
        Categories category = categoryService.getById(request.getCategory_id());
        System.out.println(category.getName());

        Products product = Products.builder()
                .name(request.getName())
                .description(request.getDescription())
                .quantity(request.getQuantity())
                .price(request.getPrice())
                .brand(brand)
                .category(category).build();

        return productRepo.save(product);
    }

    @Override
    public boolean delete(Long id) {
        Products products = getById(id);

        return true;
    }

    @Override
    public Products getById(Long id) {
        Products product = productRepo.findById(id).orElse(null);
        return (product);
    }

    @Override
    public Products update(ProductUpdateRequest request) {
        Brands brand = brandService.getById(request.getBrand_id());
        Categories category = categoryService.getById(request.getCategory_id());

        Products product = Products.builder()
                .name(request.getName())
                .description(request.getDescription())
                .quantity(request.getQuantity())
                .price(request.getPrice())
                .brand(brand)
                .id(request.getId())
                .category(category).build();
        return productRepo.save(product);
    }

    @Override
    public int setCategoryAndBrandDefaultByCategory(Long catogryId) {
        return productRepo.setDefaultCategoryAndBrandByCategory(catogryId);
    }

    @Override
    public int setDefaultBrand(Long brandId) {
        return productRepo.setDefaultBrand(brandId);
    }

    @Override
    public List<Products> updateAll(List<Products> products) {
        return productRepo.saveAll(products);
    }

}
