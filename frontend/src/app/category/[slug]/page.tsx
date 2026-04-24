"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';

const SORT_OPTIONS = ["Tùy chọn", "Giá: Tăng dần", "Giá: Giảm dần"];
const COLOR_FILTERS = [
  { name: "Màu Đen", hex: "#000000" }, { name: "Màu Trắng", hex: "#FFFFFF" },
  { name: "Màu Be", hex: "#F5DEB3" }, { name: "Màu Nâu", hex: "#A0522D" }, { name: "Màu Xám", hex: "#555555" }
];
const PRICE_FILTERS = ["Dưới 200.000đ", "200.000đ - 300.000đ", "Trên 300.000đ"];

// --- CẤU HÌNH PHÂN TRANG ---
const PRODUCTS_PER_PAGE = 8; 

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug;

  // 1. LẤY DỮ LIỆU BAN ĐẦU THEO URL
  let categoryTitle = "";
  let baseProducts = [];

  if (slug === "nu") {
    categoryTitle = "GIÀY THỂ THAO NỮ";
    baseProducts = products.filter(p => p.category === "Giày Thể Thao Nữ");
  } else if (slug === "nam") {
    categoryTitle = "GIÀY THỂ THAO NAM";
    baseProducts = products.filter(p => p.category === "Giày Thể Thao Nam");
  } else if (slug === "cap") {
    categoryTitle = "GIÀY CẶP";
    baseProducts = products.filter(p => p.category === "Giày Cặp");
  } else if (slug === "banchay") {
    categoryTitle = "SẢN PHẨM BÁN CHẠY";
    // Cắt 16 đôi đầu tiên để demo phân trang cho mục Bán chạy (2 trang)
    baseProducts = products.slice(0, 16); 
  } else {
    categoryTitle = "TẤT CẢ SẢN PHẨM";
    baseProducts = products;
  }

  // 2. CÁC STATE QUẢN LÝ GIAO DIỆN
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  
  // State quản lý số trang
  const [currentPage, setCurrentPage] = useState(1);

  // 3. CÁC HÀM XỬ LÝ (KÈM THEO VIỆC RESET VỀ TRANG 1)
  const toggleColor = (hex: string) => {
    if (selectedColors.includes(hex)) {
      setSelectedColors(selectedColors.filter(c => c !== hex));
    } else {
      setSelectedColors([...selectedColors, hex]);
    }
    setCurrentPage(1); // Reset trang
  };

  const handlePriceChange = (price: string) => {
    setSelectedPrice(price);
    setCurrentPage(1); // Reset trang
  };

  const handleSortChange = (option: string) => {
    setSelectedSort(option);
    setIsSortOpen(false);
    setCurrentPage(1); // Reset trang
  };

  const clearFilters = () => {
    setSelectedColors([]);
    setSelectedPrice("");
    setCurrentPage(1);
  };

  // 4. LOGIC LỌC & SẮP XẾP DỮ LIỆU
  let finalProducts = [...baseProducts];

  if (selectedColors.length > 0) {
    finalProducts = finalProducts.filter(product => {
      if (!product.colors) return false;
      // ĐÃ FIX LỖI TẠI ĐÂY: Khai báo rõ ràng (color: string)
      return product.colors.some((color: string) => selectedColors.includes(color));
    });
  }

  if (selectedPrice === "Dưới 200.000đ") {
    finalProducts = finalProducts.filter(product => product.price < 200000);
  } else if (selectedPrice === "200.000đ - 300.000đ") {
    finalProducts = finalProducts.filter(product => product.price >= 200000 && product.price <= 300000);
  } else if (selectedPrice === "Trên 300.000đ") {
    finalProducts = finalProducts.filter(product => product.price > 300000);
  }

  if (selectedSort === "Giá: Tăng dần") finalProducts.sort((a, b) => a.price - b.price);
  else if (selectedSort === "Giá: Giảm dần") finalProducts.sort((a, b) => b.price - a.price);
  

  // 5. THUẬT TOÁN PHÂN TRANG (CẮT MẢNG THEO TRANG HIỆN TẠI)
  const totalPages = Math.ceil(finalProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = finalProducts.slice(startIndex, endIndex);

  return (
    <main className="min-h-screen bg-white font-sans relative">
      <Navbar />
      
      {/* DRAWER BỘ LỌC */}
      <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isFilterOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsFilterOpen(false)} />
      <div className={`fixed top-0 right-0 h-full w-[350px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isFilterOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold tracking-wide uppercase">Bộ lọc</h2>
          <button onClick={() => setIsFilterOpen(false)} className="text-gray-500 hover:text-black"><X size={24} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 uppercase text-sm tracking-widest">Màu sắc</h3>
            <div className="space-y-3">
              {COLOR_FILTERS.map((color) => (
                <label key={color.hex} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 accent-black cursor-pointer" checked={selectedColors.includes(color.hex)} onChange={() => toggleColor(color.hex)}/>
                  <span className={`text-sm ${selectedColors.includes(color.hex) ? "font-bold text-black" : "text-gray-600 group-hover:text-black transition"}`}>{color.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 uppercase text-sm tracking-widest">Khoảng giá</h3>
            <div className="space-y-3">
              {PRICE_FILTERS.map((price) => (
                <label key={price} className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="priceFilter" className="w-4 h-4 accent-black cursor-pointer" checked={selectedPrice === price} onChange={() => handlePriceChange(price)}/>
                  <span className={`text-sm ${selectedPrice === price ? "font-bold text-black" : "text-gray-600 group-hover:text-black transition"}`}>{price}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 flex gap-4 bg-white">
          <button onClick={clearFilters} className="flex-1 border border-black text-black py-3 font-medium uppercase text-sm hover:bg-gray-50 transition">Xóa lọc</button>
          <button onClick={() => setIsFilterOpen(false)} className="flex-1 bg-black text-white py-3 font-medium uppercase text-sm hover:bg-gray-800 transition">Áp dụng</button>
        </div>
      </div>

      {/* KHU VỰC CHÍNH */}
      <div className="pt-24 pb-20 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-gray-100 pb-4">
          <h1 className="text-2xl font-normal text-gray-800 uppercase tracking-wide">{categoryTitle}</h1>
          <div className="flex items-center gap-6 text-sm text-gray-700">
            <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-2 hover:text-black transition font-medium">
              <SlidersHorizontal size={18} /> BỘ LỌC
              {(selectedColors.length > 0 || selectedPrice) && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
            </button>
            <div className="flex items-center gap-2 relative">
              <span className="text-gray-500 hidden sm:inline">Sắp xếp theo:</span>
              <button onClick={() => setIsSortOpen(!isSortOpen)} className="relative border border-gray-300 rounded px-3 py-1.5 flex items-center gap-4 cursor-pointer hover:border-gray-400 min-w-[160px] justify-between bg-white z-10">
                <span className="truncate max-w-[120px]">{selectedSort}</span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
              </button>
              {isSortOpen && (
                <div className="absolute top-full right-0 mt-1 w-[160px] bg-white border border-gray-200 rounded shadow-lg z-20 py-1">
                  {SORT_OPTIONS.map((option) => (
                    <div key={option} onClick={() => handleSortChange(option)} className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-50 transition ${selectedSort === option ? "font-bold text-black" : "text-gray-600"}`}>
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LƯỚI SẢN PHẨM */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
             <div className="col-span-full text-center py-20 text-gray-500 flex flex-col items-center">
              <SlidersHorizontal size={40} className="mb-4 text-gray-300" />
              <p>Không có sản phẩm nào khớp với bộ lọc của bạn.</p>
              <button onClick={clearFilters} className="mt-4 text-blue-600 underline font-medium">Xóa bộ lọc</button>
            </div>
          )}
        </div>

        {/* --- THANH PHÂN TRANG --- */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-16 gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border transition ${currentPage === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-gray-700 hover:border-black hover:text-black'}`}
            >
              Trước
            </button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-10 h-10 border transition flex items-center justify-center ${
                      currentPage === pageNumber 
                        ? 'border-black bg-black text-white font-bold' 
                        : 'border-transparent text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border transition ${currentPage === totalPages ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-gray-700 hover:border-black hover:text-black'}`}
            >
              Sau
            </button>
          </div>
        )}

      </div>
    </main>
  );
}