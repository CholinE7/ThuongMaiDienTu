"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Navbar from '@/src/components/Navbar';
import ProductCard from '@/src/components/ProductCard';
import { products } from '@/src/data/products';
import { Search } from 'lucide-react';

// Component con xử lý logic tìm kiếm
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || ""; // Lấy từ khóa "q" từ URL
  const queryLower = query.toLowerCase();

  // Lọc sản phẩm khớp với Tên hoặc Danh mục
  const searchResults = products.filter(product => 
    product.name.toLowerCase().includes(queryLower) ||
    product.category.toLowerCase().includes(queryLower)
  );

  return (
    <div className="pt-24 pb-20 container mx-auto px-4">
      {/* Tiêu đề kết quả tìm kiếm */}
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-medium text-gray-800 uppercase tracking-widest">
          Kết quả tìm kiếm
        </h1>
        <p className="text-gray-500 mt-2">
          Tìm thấy {searchResults.length} sản phẩm cho <strong>"{query}"</strong>
        </p>
        <div className="w-16 h-0.5 bg-gray-300 mx-auto mt-4"></div>
      </div>

      {/* Danh sách sản phẩm */}
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Giao diện khi không tìm thấy kết quả nào */
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Search size={60} className="text-gray-200 mb-6" />
          <h2 className="text-xl font-medium text-gray-800 mb-2">Không tìm thấy sản phẩm nào!</h2>
          <p>Xin lỗi, chúng tôi không tìm thấy sản phẩm nào khớp với từ khóa của bạn.</p>
          <p>Vui lòng thử lại với một từ khóa khác ngắn gọn hơn (Ví dụ: "G270", "Nam").</p>
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
      {/* Bắt buộc phải bọc trong Suspense khi dùng useSearchParams 
        để tránh lỗi khi build dự án trên Next.js 
      */}
      <Suspense fallback={<div className="pt-32 text-center text-gray-500">Đang tìm kiếm...</div>}>
        <SearchContent />
      </Suspense>
    </main>
  );
}