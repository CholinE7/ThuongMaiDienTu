import Navbar from '@/components/Navbar';
import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Truck, ShieldCheck, RefreshCw } from 'lucide-react';

// Hàm lấy dữ liệu sản phẩm từ API
async function getProducts() {
  try {
    const res = await fetch('http://localhost:8080/api/products?page_size=50', { 
      cache: 'no-store' 
    });
    if (!res.ok) return [];
    const data = await res.json();
    
    // Map dữ liệu từ API về định dạng Frontend cần
    return (data.result?.content || []).map((p: any) => ({
      ...p,
      category: p.category?.name || "Khác", // Backend trả về object category
      imageUrl: p.imageUrl || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400",
      image: p.imageUrl || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400"
    }));
  } catch (error) {
    console.error("Lỗi lấy sản phẩm trang chủ:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  const shoesNu = products.filter((product: any) => product.category === "Giày Thể Thao Nữ").slice(0,4);
  const shoesNam = products.filter((product: any) => product.category === "Giày Thể Thao Nam").slice(0,4);
  
  // Lấy 4 sản phẩm đầu tiên làm sản phẩm bán chạy
  const bestSellers = products.slice(0, 4); 

  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />
      
      <div className="pt-16"> 
        <HeroSlider />
      </div>

      {/* --- CAM KẾT DỊCH VỤ --- */}
     <section className="bg-white py-10 border-b border-gray-100">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:bg-blue-100 transition">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Miễn phí vận chuyển</h3>
            <p className="text-gray-500 text-sm">Cho đơn hàng trên 2.000.000đ</p>
          </div>
          <div className="flex flex-col items-center group cursor-pointer">
             <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:bg-blue-100 transition">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Bảo hành chính hãng</h3>
            <p className="text-gray-500 text-sm">Cam kết 100% hàng Authentic</p>
          </div>
          <div className="flex flex-col items-center group cursor-pointer">
             <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:bg-blue-100 transition">
              <RefreshCw className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Đổi trả dễ dàng</h3>
            <p className="text-gray-500 text-sm">Trong vòng 30 ngày nếu lỗi</p>
          </div>
        </div>
      </section>

      {/* --- DANH MỤC: SẢN PHẨM BÁN CHẠY --- */}
      <section className="pt-16 pb-10 container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-800 uppercase tracking-widest">
            Sản Phẩm Bán Chạy
          </h2>
          <div className="w-16 h-0.5 bg-gray-300 mx-auto mt-4"></div>
        </div>
        
        {/* Lưới sản phẩm */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {bestSellers.map((product: any) => (
            <ProductCard key={`bs-${product.id}`} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
            <Link href="/category/banchay" className="inline-block border border-gray-800 text-gray-800 px-10 py-3 font-medium hover:bg-black hover:text-white transition uppercase text-sm tracking-wide">
                Xem thêm
            </Link>
        </div>
      </section>

      {/* --- DANH MỤC: GIÀY CAO GÓT NỮ --- */}
      <section className="pt-10 pb-10 container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-800 uppercase tracking-widest">
            Giày Thể Thao Nữ
          </h2>
          <div className="w-16 h-0.5 bg-gray-300 mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {shoesNu.map((product: any) => (
            <ProductCard key={`nu-${product.id}`} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
            <Link href="/category/nu" className="inline-block border border-gray-800 text-gray-800 px-10 py-3 font-medium hover:bg-black hover:text-white transition uppercase text-sm tracking-wide">
                Xem thêm giày nữ
            </Link>
        </div>
      </section>

      {/* --- DANH MỤC: SANDAL VÀ DÉP NAM --- */}
      <section className="pt-10 pb-20 container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-800 uppercase tracking-widest">
            Giày Thể Thao Nam
          </h2>
          <div className="w-16 h-0.5 bg-gray-300 mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {shoesNam.map((product: any) => (
            <ProductCard key={`nam-${product.id}`} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
            <Link href="/category/nam" className="inline-block border border-gray-800 text-gray-800 px-10 py-3 font-medium hover:bg-black hover:text-white transition uppercase text-sm tracking-wide">
                Xem thêm giày nam
            </Link>
        </div>
      </section>

     
     

      {/* --- FOOTER --- */}
      {/* <footer className="bg-white border-t border-gray-100 pt-10 pb-10">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
             © 2026 SHOESTORE. All rights reserved.
          </div>
      </footer> */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  SHOE<span className="text-blue-600">STORE</span>
                </h2>
                <p className="text-gray-500 leading-relaxed">
                  Chúng tôi mang đến những đôi giày tốt nhất, giúp bạn tự tin trên mọi hành trình. Chất lượng - Uy tín - Tận tâm.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-6 text-lg">Về chúng tôi</h3>
                <ul className="space-y-4 text-gray-500">
                  <li><Link href="/about/brand-story" className="hover:text-blue-600 transition">Câu chuyện thương hiệu</Link></li>
                  <li><Link href="/about/careers" className="hover:text-blue-600 transition">Tuyển dụng</Link></li>
                  <li><Link href="/about/stores" className="hover:text-blue-600 transition">Hệ thống cửa hàng</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-6 text-lg">Hỗ trợ</h3>
                <ul className="space-y-4 text-gray-500">
                  <li><Link href="/help/buying-guide" className="hover:text-blue-600 transition">Hướng dẫn mua hàng</Link></li>
                  <li><Link href="/help/returns" className="hover:text-blue-600 transition">Chính sách đổi trả</Link></li>
                  <li><Link href="/help/privacy" className="hover:text-blue-600 transition">Bảo mật thông tin</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-6 text-lg">Liên hệ</h3>
                <p className="text-gray-500 mb-2">Hotline: 1900 1234</p>
                <p className="text-gray-500">Email: support@shoestore.com</p>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-8 text-center text-gray-400 text-sm">
              © 2026 SHOESTORE. All rights reserved.
            </div>
          </div>
      </footer>
    </main>
  );
}