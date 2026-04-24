"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ChevronLeft, Loader2, CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const router = useRouter();

  // 1. CÁC STATES LƯU TRỮ DỮ LIỆU VÀ TRẠNG THÁI
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // TOAST THÔNG BÁO
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const showToast = (msg: string, type: "success" | "error") => {
    setToastMsg(msg);
    setToastType(type);
    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => setToastMsg(""), 3000);
  };

  // 2. HÀM XỬ LÝ KHI BẤM NÚT ĐĂNG NHẬP (GỌI BACKEND 8080)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Gửi 'email' vào trường 'username' để khớp với MyUserDetailsService của bạn
        body: JSON.stringify({ username: email, password }),
      });

      const token = await res.text();

      if (res.ok && token !== "fail") {
        // Lưu chìa khóa JWT vào túi của trình duyệt
        localStorage.setItem("token", token);

        // Gọi /api/auth/me để lấy user info
        try {
          const meRes = await fetch("http://localhost:8080/api/auth/me", {
            headers: { "Authorization": `Bearer ${token}` }
          });
          if (meRes.ok) {
            const meData = await meRes.json();
            if (meData.code === 200) {
              localStorage.setItem("customerName", meData.result.fullName);
              localStorage.setItem("customerEmail", meData.result.email);
              localStorage.setItem("customerId", meData.result.id.toString());
            }
          }
        } catch (e) {
          console.error("Lỗi lấy thông tin user", e);
        }

        showToast("Đăng nhập thành công!", "success");

        // Chờ 1 giây để hiện hiệu ứng thành công rồi mới chuyển hướng
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        showToast("Email hoặc mật khẩu không chính xác!", "error");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      showToast("Lỗi kết nối máy chủ 8080!", "error");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans relative">

      {/* THÔNG BÁO TOAST */}
      {toastMsg && (
        <div className={`fixed top-20 right-6 bg-white border-l-4 shadow-xl px-6 py-4 rounded-lg flex items-center gap-3 z-[60] animate-in slide-in-from-right-8 ${toastType === 'success' ? 'border-green-500' : 'border-red-500'}`}>
          {toastType === 'success' ? <CheckCircle2 className="text-green-500" size={24} /> : <XCircle className="text-red-500" size={24} />}
          <span className="font-medium text-gray-800">{toastMsg}</span>
        </div>
      )}

      {/* NAVBAR */}
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

          {/* Hiệu ứng loading mờ nền */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/60 z-20 flex items-center justify-center backdrop-blur-[2px]">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
          )}

          <div className="text-center mb-10 relative">
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
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 placeholder:text-gray-500 focus:border-blue-500 focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium text-gray-900 shadow-sm"
                  placeholder="nguyenvana@gmail.com"
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700 ml-1">Mật khẩu</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 placeholder:text-gray-500 focus:border-blue-500 focus:bg-white rounded-2xl py-4 pl-12 pr-12 outline-none transition-all font-medium text-gray-900 shadow-sm"
                  placeholder="••••••••"
                />
                {/* NÚT CON MẮT ĐỂ TOGGLE */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 transition-colors outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-200 flex items-center justify-center gap-3 group uppercase tracking-wide disabled:opacity-70"
            >
              Đăng nhập ngay
              {!isLoading && <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="h-[1px] bg-gray-200 flex-grow"></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hoặc</span>
            <div className="h-[1px] bg-gray-200 flex-grow"></div>
          </div>

          <p className="mt-10 text-center text-sm font-medium text-gray-500">
            Chưa có tài khoản? <a href="/register" className="text-blue-600 font-bold hover:underline ml-1">Đăng ký ngay</a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;