'use client';

import React, { useState, useEffect } from 'react';
// LƯU Ý: Trong dự án Next.js thực tế của bạn, hãy mở comment 2 dòng bên dưới.
// Tạm thời tôi comment lại để tránh lỗi biên dịch trong môi trường Xem trước (Preview).
// import { useParams } from 'next/navigation'; 

import { 
  Heart, 
  ChevronLeft, 
  Plus,
  Minus,
  ShoppingCart,
  Search,
  Loader2 
} from 'lucide-react';

// Giả lập một "Database" chứa thông tin các sản phẩm
const MOCK_DATABASE: Record<string, any> = {
  "1": {
    id: "1",
    name: "Nike Air Max 270 Red Edition",
    price: 3500000,
    category: "Giày Nam",
    description: "Phiên bản màu đỏ nổi bật với công nghệ đế đệm khí Air Max cực êm ái. Phù hợp cho hoạt động thể thao và dạo phố.",
    sizes: [39, 40, 41, 42, 43],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    ]
  },
  "2": {
    id: "2",
    name: "Adidas Ultraboost 22 Core Black",
    price: 4200000,
    category: "Giày Chạy Bộ",
    description: "Đôi giày chạy bộ huyền thoại với công nghệ đệm Boost hoàn trả năng lượng vô tận. Thiết kế đen tuyền mạnh mẽ.",
    sizes: [40, 41, 42],
    images: [
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1200&auto=format&fit=crop",
    ]
  },
  // Sản phẩm mặc định nếu ID không nằm trong 1 và 2
  "default": {
    id: "G270",
    name: "Giày Cao Gót G270 - Sandal Gót Trụ",
    price: 235000,
    category: "Giày Nữ",
    description: "Thiết kế thanh lịch, dễ phối đồ. Phù hợp cho cả môi trường công sở lẫn những buổi tiệc nhẹ nhàng. Chất liệu da PU cao cấp, đế êm ái chống trượt.",
    sizes: [35, 36, 37, 38, 39],
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=1200&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1515347619362-7ddbf0fb48b0?q=80&w=1200&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop", 
    ]
  }
};

export default function ProductDetailPage() {
  // --- LẤY ID THỰC TẾ TỪ URL ---
  // Trong dự án thực tế, bạn sẽ mở comment 2 dòng này để lấy ID thực từ Next.js:
  // const params = useParams();
  // const productId = params?.id as string;
  
  // Dòng này chỉ dùng để hiển thị mô phỏng trong môi trường Xem trước hiện tại:git 
  const productId = "1"; 

  // --- STATE ---
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [openSection, setOpenSection] = useState<string | null>('description');

  // --- MÔ PHỎNG GỌI API LẤY DỮ LIỆU ---
  useEffect(() => {
    if (!productId) return; 

    setIsLoading(true);
    
    setTimeout(() => {
      // Tìm sản phẩm trong DB giả lập dựa vào ID
      const foundProduct = MOCK_DATABASE[productId] || {
        ...MOCK_DATABASE["default"],
        id: productId,
        name: `Sản phẩm mã ${productId}` 
      };
      
      setProduct(foundProduct);
      setIsLoading(false);
    }, 500);
  }, [productId]);

  const formatPrice = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Màn hình Loading
  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-gray-900 animate-spin mb-4" />
        <p className="font-medium text-gray-500 uppercase tracking-widest text-sm">Đang tải thông tin...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white font-sans">
      {/* --- HEADER --- */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          
          {/* Bên trái: Nút Back (cho mobile) & Logo SHOESTORE */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a href="/" className="p-2 hover:bg-gray-50 rounded-full transition-colors md:hidden">
              <ChevronLeft size={20} className="text-gray-900" />
            </a>
            {/* Logo: Chữ thẳng, đậm vừa phải (semibold) */}
            <a href="/" className="text-2xl font-semibold text-gray-900 tracking-tight uppercase">
              SHOE<span className="text-blue-600">STORE</span>
            </a>
          </div>
          
          {/* Ở giữa: Thanh tìm kiếm */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Tìm kiếm sản phẩm..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm font-medium text-gray-900"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            </div>
          </div>
          
          {/* Bên phải: Nút Liên hệ & Giỏ hàng */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-900 uppercase tracking-widest hidden sm:block">Liên hệ</span>
            <a href="/cart" className="relative p-2 hover:bg-gray-50 rounded-full transition-colors group">
              <ShoppingCart size={24} className="text-gray-700 group-hover:text-blue-600 transition-colors" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center border-2 border-white">2</span>
            </a>
          </div>

        </div>
      </nav>

      {/* --- LAYOUT CHÍNH (CHIA 2 CỘT) --- */}
      <div className="max-w-[1400px] mx-auto pt-16 grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-16">
        
        {/* ================= CỘT TRÁI: DÃY ẢNH ================= */}
        <div className="lg:col-span-7 flex flex-col">
          {product.images.map((img: string, idx: number) => (
            <div key={idx} className="w-full bg-gray-50 border-b border-gray-100 last:border-b-0">
              <img 
                src={img} 
                alt={`${product.name} - Góc ${idx + 1}`} 
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        {/* ================= CỘT PHẢI: THÔNG TIN ================= */}
        <div className="lg:col-span-5 px-6 lg:px-0 py-10 lg:py-16 relative">
          <div className="sticky top-24 max-w-md">
            
            {/* Danh mục & Nút yêu thích */}
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">{product.category}</span>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Heart size={20} />
              </button>
            </div>
            
            {/* Tên sản phẩm - Font chữ mảnh hơn */}
            <h1 className="text-2xl font-medium text-gray-900 leading-tight tracking-wide mb-4 uppercase">
              {product.name}
            </h1>

            {/* Giá tiền - Font chữ mảnh hơn */}
            <div className="text-xl font-medium text-gray-900 mb-10">
              {formatPrice(product.price)}
            </div>

            {/* Chọn kích thước (Size) */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-medium text-gray-900 uppercase tracking-widest">Kích thước</span>
                <button className="text-xs text-gray-500 underline hover:text-gray-900 transition-colors font-medium">Bảng kích cỡ</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size: number) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-none text-sm font-medium transition-all border 
                      ${selectedSize === size 
                        ? 'border-gray-900 bg-gray-900 text-white' 
                        : 'border-gray-200 text-gray-900 hover:border-gray-900 bg-white'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Nút Call to Action */}
            <button className="w-full bg-black text-white py-4 rounded-full font-medium text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors mb-10 active:scale-95">
              Thêm vào giỏ hàng
            </button>

            {/* Mô tả ngắn */}
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* ================= CÁC THẺ ACCORDION ================= */}
            <div className="border-t border-gray-200">
              
              {/* Thẻ 1: Chi tiết sản phẩm */}
              <div className="border-b border-gray-200">
                <button 
                  onClick={() => toggleSection('details')}
                  className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="text-xs font-medium text-gray-900 uppercase tracking-widest group-hover:text-gray-600 transition-colors">Chi tiết sản phẩm</span>
                  {openSection === 'details' ? <Minus size={16} className="text-gray-900" /> : <Plus size={16} className="text-gray-900" />}
                </button>
                {openSection === 'details' && (
                  <div className="pb-5 text-sm text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-2">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Mã sản phẩm: {product.id}</li>
                      <li>Chất liệu: Da PU và Vải cao cấp.</li>
                      <li>Đế ngoài bằng cao su đúc nguyên khối chống trượt.</li>
                      <li>Thiết kế tại studio của SHOESTORE.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Thẻ 2: Dịch vụ tại cửa hàng */}
              <div className="border-b border-gray-200">
                <button 
                  onClick={() => toggleSection('store')}
                  className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="text-xs font-medium text-gray-900 uppercase tracking-widest group-hover:text-gray-600 transition-colors">Dịch vụ tại cửa hàng</span>
                  {openSection === 'store' ? <Minus size={16} className="text-gray-900" /> : <Plus size={16} className="text-gray-900" />}
                </button>
                {openSection === 'store' && (
                  <div className="pb-5 text-sm text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-2">
                    Nhận hàng và thử trực tiếp tại hệ thống 15 cửa hàng SHOESTORE trên toàn quốc. Hỗ trợ vệ sinh giày miễn phí trong 6 tháng đầu cho khách hàng thành viên.
                  </div>
                )}
              </div>

              {/* Thẻ 3: Chính sách giao hàng */}
              <div className="border-b border-gray-200">
                <button 
                  onClick={() => toggleSection('shipping')}
                  className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="text-xs font-medium text-gray-900 uppercase tracking-widest group-hover:text-gray-600 transition-colors">Chính sách giao hàng và đổi hàng</span>
                  {openSection === 'shipping' ? <Minus size={16} className="text-gray-900" /> : <Plus size={16} className="text-gray-900" />}
                </button>
                {openSection === 'shipping' && (
                  <div className="pb-5 text-sm text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-2">
                    Giao hàng miễn phí toàn quốc cho đơn hàng trên 500.000đ. Thời gian giao hàng dự kiến từ 2-4 ngày làm việc. Hỗ trợ đổi size tận nhà trong vòng 7 ngày nếu không vừa.
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </main>
  );
}