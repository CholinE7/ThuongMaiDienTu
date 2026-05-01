"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { apiRequest } from '@/services/app';
import { SlidersHorizontal, ChevronDown, X, Loader2 } from 'lucide-react';

const SORT_OPTIONS = ["Tùy chọn", "Giá: Tăng dần", "Giá: Giảm dần"];
const COLOR_FILTERS = [
  { name: "Đen", hex: "#171717" },
  { name: "Trắng", hex: "#FFFFFF" },
  { name: "Đỏ", hex: "#991B1B" },
  { name: "Nâu", hex: "#78350F" },
  { name: "Be", hex: "#D4B996" },
  { name: "Xám", hex: "#6B7280" },
  { name: "Kem", hex: "#FEFCE8" }
];
const PRICE_FILTERS = ["Dưới 200.000đ", "200.000đ - 300.000đ", "Trên 300.000đ"];

// --- CẤU HÌNH PHÂN TRANG ---
const PRODUCTS_PER_PAGE = 8; 

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug;

  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryTitle, setCategoryTitle] = useState("");

  // 2. CÁC STATE QUẢN LÝ GIAO DIỆN
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  
  // State quản lý số trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // 2. GỌI API LẤY DỮ LIỆU SẢN PHẨM THEO CATEGORY
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let title = "TẤT CẢ SẢN PHẨM";
        let categoryId = null;

        if (slug === "nu") {
          title = "GIÀY THỂ THAO NỮ";
          categoryId = 1; // Giả sử ID 1 là giày nữ
        } else if (slug === "nam") {
          title = "GIÀY THỂ THAO NAM";
          categoryId = 2; // Giả sử ID 2 là giày nam
        } else if (slug === "cap") {
          title = "GIÀY CẶP";
        }

        setCategoryTitle(title);
        
        const query = new URLSearchParams({
          page_no: (currentPage - 1).toString(),
          page_size: PRODUCTS_PER_PAGE.toString(),
          ...(categoryId ? { category_id: categoryId.toString() } : {})
        }).toString();

        const response = await apiRequest(`/api/products?${query}`, 'GET');
        const res = await response.json();
        
        if (res.code === 200 && res.result) {
          const mapped = res.result.content.map((p: any) => ({
            ...p,
            category: p.category?.name || "Khác"
          }));
          setProducts(mapped);
          setTotalProducts(res.result.total);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [slug, currentPage]);

  // 3. CÁC HÀM XỬ LÝ (KÈM THEO VIỆC RESET VỀ TRANG 1)
  const toggleColor = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter(c => c !== colorName));
    } else {
      setSelectedColors([...selectedColors, colorName]);
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

  // 4. LỌC VÀ SẮP XẾP TẠI CLIENT (Dành cho bộ lọc phụ như màu sắc, giá)
  let finalProducts = [...products];

  // Lọc theo màu sắc
  if (selectedColors.length > 0) {
    finalProducts = finalProducts.filter(product => 
      product.colors && product.colors.some((c: string) => selectedColors.includes(c))
    );
  }

  // Lọc theo khoảng giá
  if (selectedPrice === "Dưới 200.000đ") {
    finalProducts = finalProducts.filter(product => product.price < 200000);
  } else if (selectedPrice === "200.000đ - 300.000đ") {
    finalProducts = finalProducts.filter(product => product.price >= 200000 && product.price <= 300000);
  } else if (selectedPrice === "Trên 300.000đ") {
    finalProducts = finalProducts.filter(product => product.price > 300000);
  }

  if (selectedSort === "Giá: Tăng dần") finalProducts.sort((a, b) => a.price - b.price);
  else if (selectedSort === "Giá: Giảm dần") finalProducts.sort((a, b) => b.price - a.price);
  
  // 5. THUẬT TOÁN PHÂN TRANG (Backend đã lo phần cắt mảng theo trang)
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const paginatedProducts = finalProducts;

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
                  <input type="checkbox" className="w-4 h-4 accent-black cursor-pointer" checked={selectedColors.includes(color.name)} onChange={() => toggleColor(color.name)}/>
                  <span className={`text-sm ${selectedColors.includes(color.name) ? "font-bold text-black" : "text-gray-600 group-hover:text-black transition"}`}>{color.name}</span>
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