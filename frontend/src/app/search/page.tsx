"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { apiRequest } from "@/services/app";
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';  // ← Thêm dòng này

// Số lượng sản phẩm hiển thị trên 1 trang
const ITEMS_PER_PAGE = 8;

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || ""; 

  // State lưu trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const PRODUCTS_PER_PAGE = 8;
  const [totalProducts, setTotalProducts] = useState(0);

  // Reset về trang 1 mỗi khi người dùng đổi từ khóa tìm kiếm mới
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          name: query,
          page_no: (currentPage - 1).toString(),
          page_size: PRODUCTS_PER_PAGE.toString()
        }).toString();

        const response = await apiRequest(`/api/products?${queryParams}`, 'GET');
        const res = await response.json();
        
        if (res.code === 200 && res.result) {
          setSearchResults(res.result.content.map((p: any) => ({
            ...p,
            category: p.category?.name || "Khác"
          })));
          setTotalProducts(res.result.total);
        }
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (query) fetchSearchResults();
  }, [query, currentPage]);

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const paginatedResults = searchResults; // Dữ liệu từ API đã là trang hiện tại

  return (
    <div className="pt-24 pb-20 container mx-auto px-4">
      {/* Tiêu đề kết quả tìm kiếm */}
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-medium text-gray-800 uppercase tracking-widest">
          Kết quả tìm kiếm
        </h1>
        <p className="text-gray-500 mt-2">
          Tìm thấy <strong>{totalProducts}</strong> sản phẩm cho <strong>"{query}"</strong>
        </p>
        <div className="w-16 h-0.5 bg-gray-300 mx-auto mt-4"></div>
      </div>

      {/* Danh sách sản phẩm theo trang */}
      {searchResults.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12 mb-12">
            {paginatedResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* THANH PHÂN TRANG (PAGINATION UI) */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                disabled={currentPage === 1} 
                className={`w-10 h-10 flex items-center justify-center border rounded-lg transition ${currentPage === 1 ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50" : "border-gray-300 text-gray-600 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 shadow-sm"}`}
              >
                <ChevronLeft size={20} />
              </button>
              
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button 
                    key={pageNumber} 
                    onClick={() => setCurrentPage(pageNumber)} 
                    className={`w-10 h-10 flex items-center justify-center border rounded-lg font-bold transition shadow-sm ${currentPage === pageNumber ? "border-blue-600 bg-blue-600 text-white shadow-md" : "border-gray-300 bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"}`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                disabled={currentPage === totalPages} 
                className={`w-10 h-10 flex items-center justify-center border rounded-lg transition ${currentPage === totalPages ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50" : "border-gray-300 text-gray-600 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 shadow-sm"}`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        /* Giao diện khi không tìm thấy kết quả nào */
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Search size={60} className="text-gray-200 mb-6" />
          <h2 className="text-xl font-medium text-gray-800 mb-2">Không tìm thấy sản phẩm nào!</h2>
          <p>Xin lỗi, chúng tôi không tìm thấy sản phẩm nào khớp với từ khóa của bạn.</p>
          <p>Vui lòng thử lại với một từ khóa khác ngắn gọn hơn.</p>
        </div>
      )}
    </div>
  );
}

// Trang chính
export default function SearchPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />
      <Suspense fallback={<div className="pt-32 text-center text-gray-500">Đang tìm kiếm...</div>}>
        <SearchContent />
      </Suspense>
    </main>
  );
}