'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Chrome, Github, ChevronLeft, Loader2 } from 'lucide-react';

const LoginPage = () => {
  // 1. Khai báo State để hứng dữ liệu từ Form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 2. Hàm xử lý gửi dữ liệu sang Backend Spring Boot
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Chú ý: Gửi 'email' vào trường 'username' để khớp với MyUserDetailsService của bạn
        body: JSON.stringify({ username: email, password }), 
      });

      const token = await res.text();

      if (res.ok && token !== "fail") {
        // Lưu chìa khóa JWT vào túi của trình duyệt
        localStorage.setItem("token", token);
        alert("Đăng nhập thành công!");
        router.push("/"); // Chuyển về trang chủ
      } else {
        alert("Email hoặc mật khẩu không chính xác!");
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      alert("Không thể kết nối tới Server. Hãy kiểm tra Backend và CORS!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Thay vì import Navbar bên ngoài có thể gây lỗi đường dẫn trong một số môi trường,
         tôi sẽ nhúng một phiên bản Navbar đơn giản tại đây để bạn có thể xem preview ngay lập tức.
      */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-black text-blue-600 tracking-tighter italic">
            SHOE<span className="text-black">STORE</span>
          </a>
          <a href="/" className="text-sm font-bold text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
            <ChevronLeft size={16} /> Quay lại trang chủ
          </a>
        </div>
      </nav>
      
      <div className="flex-grow flex items-center justify-center px-4 pt-24 pb-12">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/30 p-8 md:p-12 border border-gray-100 relative overflow-hidden">
          {/* Hiệu ứng trang trí góc */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50"></div>
          
          <div className="text-center mb-10 relative">
            {/* Đã sửa font chữ: bỏ italic, đổi thành font-bold, tăng khoảng cách tracking-wide */}
            <h1 className="text-3xl font-bold text-gray-900 tracking-wide uppercase mb-2">
              Chào mừng <span className="text-blue-600">trở lại!</span>
            </h1>
            <p className="text-gray-500 font-medium">Đăng nhập để sở hữu đôi giày mơ ước của bạn.</p>
          </div>

          <form className="space-y-6 relative" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700 ml-1">Địa chỉ Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={18} />
                </div>
                {/* Đã cập nhật ô input đậm hơn 20% giống form Đăng ký */}
                <input 
                  type="email" 
                  required
                  // THÊM 2 DÒNG NÀY:
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-340 placeholder:text-gray-500 focus:border-blue-500 focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium text-gray-900 shadow-sm"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700">Mật khẩu</label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Quên mật khẩu?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-3 placeholder:text-gray-500 focus:border-blue-500 focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium text-gray-900 shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-200 flex items-center justify-center gap-3 group uppercase tracking-wide"
            >
              Đăng nhập ngay
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="h-[1px] bg-gray-200 flex-grow"></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hoặc đăng nhập với</span>
            <div className="h-[1px] bg-gray-200 flex-grow"></div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-2xl hover:bg-gray-100 transition font-bold text-gray-700 text-sm shadow-sm active:scale-95">
              <Chrome size={18} className="text-red-500" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-2xl hover:bg-gray-100 transition font-bold text-gray-700 text-sm shadow-sm active:scale-95">
              <Github size={18} /> Github
            </button>
          </div>

          <p className="mt-10 text-center text-sm font-medium text-gray-500">
            Chưa có tài khoản? <a href="/register" className="text-blue-600 font-bold hover:underline ml-1">Đăng ký thành viên</a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;