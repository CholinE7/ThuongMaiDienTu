import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import Link from 'next/link';
import { Truck, ShieldCheck, RefreshCw } from 'lucide-react';

export default function Home() {
  const shoesNu = products.filter(product => product.category === "Giày Thể Thao Nữ").slice(0,4);
  const shoesNam = products.filter(product => product.category === "Giày Thể Thao Nam").slice(0,4);
  
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
          {bestSellers.map((product) => (
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
          {shoesNu.map((product) => (
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
          {shoesNam.map((product) => (
            <ProductCard key={`nam-${product.id}`} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
            <Link href="/category/nam" className="inline-block border border-gray-800 text-gray-800 px-10 py-3 font-medium hover:bg-black hover:text-white transition uppercase text-sm tracking-wide">
                Xem thêm giày nam
            </Link>
        </div>
      </section>

      {/* 5. Section: Banner Khuyến mãi nhỏ (Promo Banner) */}
      <section className="container mx-auto px-4 mb-20">
        <div className="bg-gray-900 rounded-3xl overflow-hidden relative flex flex-col md:flex-row items-center justify-between p-8 md:p-16 text-center md:text-left">
          <div className="z-10 max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Đăng ký thành viên <br/> <span className="text-blue-400">Giảm ngay 15%</span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Nhận thông báo về các đợt giảm giá sớm nhất và ưu đãi độc quyền dành riêng cho thành viên VIP.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <input 
                type="email" 
                placeholder="Nhập email của bạn" 
                className="px-6 py-4 rounded-full bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-blue-500 w-full sm:w-auto"
              />
              <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition">
                Đăng ký ngay
              </button>
            </div>
          </div>
          {/* Họa tiết trang trí nền */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none"></div>
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
                  <li className="hover:text-blue-600 cursor-pointer transition">Câu chuyện thương hiệu</li>
                  <li className="hover:text-blue-600 cursor-pointer transition">Tuyển dụng</li>
                  <li className="hover:text-blue-600 cursor-pointer transition">Hệ thống cửa hàng</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-6 text-lg">Hỗ trợ</h3>
                <ul className="space-y-4 text-gray-500">
                  <li className="hover:text-blue-600 cursor-pointer transition">Hướng dẫn mua hàng</li>
                  <li className="hover:text-blue-600 cursor-pointer transition">Chính sách đổi trả</li>
                  <li className="hover:text-blue-600 cursor-pointer transition">Bảo mật thông tin</li>
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