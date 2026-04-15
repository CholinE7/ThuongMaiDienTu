'use client';

import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, ChevronLeft, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  
  // Các state để lưu trữ giá trị người dùng nhập và lỗi
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState(''); // THÊM STATE CHO ĐỊA CHỈ
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(''); // Xóa lỗi cũ khi ấn submit

    // BƯỚC 1: XÁC THỰC FRONTEND (Kiểm tra 2 email có giống nhau không)
    if (email !== confirmEmail) {
      setErrorMsg('Email xác nhận không khớp. Vui lòng kiểm tra lại!');
      return; // Dừng việc gửi form
    }

    if (password.length < 8) {
      setErrorMsg('Mật khẩu phải có ít nhất 8 ký tự!');
      return;
    }

    if (address.trim() === '') {
      setErrorMsg('Vui lòng nhập địa chỉ của bạn!');
      return;
    }

    // BƯỚC 2: Nếu mọi thứ OK, gửi dữ liệu lên Backend
    console.log("Dữ liệu hợp lệ. Đang xử lý đăng ký cho:", email, "tại địa chỉ:", address);
    alert("Đăng ký thành công (Mô phỏng)!");
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans pb-12">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-black text-blue-600 tracking-tighter italic">
            SHOE<span className="text-black">STORE</span>
          </a>
          <a href="/login" className="text-sm font-bold text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
            <ChevronLeft size={16} /> Quay lại Đăng nhập
          </a>
        </div>
      </nav>
      
      <div className="flex-grow flex items-center justify-center px-4 pt-28">
        <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-xl shadow-blue-100/20 p-8 md:p-12 border border-gray-100 relative">
          
          <div className="mb-10 border-b border-gray-100 pb-6">
            <h1 className="text-3xl font-bold text-gray-900 tracking-wide uppercase mb-2">
              Tạo tài khoản <span className="text-blue-600">khách hàng</span>
            </h1>
            <p className="text-gray-500 font-medium">Tạo tài khoản để tận hưởng trải nghiệm mua sắm được cá nhân hóa và nhận ưu đãi 15%.</p>
            <p className="text-sm mt-4 text-gray-900 font-bold">
              Bạn đã có tài khoản? <a href="/login" className="text-blue-600 hover:underline">Đăng nhập tại đây</a>
            </p>
          </div>

          {/* Hiển thị thông báo lỗi nếu có */}
          {errorMsg && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600">
              <AlertCircle size={20} />
              <p className="text-sm font-bold">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Cấu trúc Grid mới: Render theo từng hàng ngang (Row) thay vì chia 2 cột */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 items-start">
              
              {/* --- HÀNG 1 --- */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Email *</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 placeholder:text-gray-500 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-medium text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Danh xưng *</label>
                <select required defaultValue="" className="w-full bg-gray-100 border border-gray-300 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-medium text-gray-900 appearance-none cursor-pointer">
                  <option value="" disabled>Chọn danh xưng</option>
                  <option value="mr">Ông (Mr.)</option>
                  <option value="ms">Bà (Ms.)</option>
                  <option value="mrs">Cô (Mrs.)</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              {/* --- HÀNG 2 --- */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Xác nhận Email *</label>
                <input 
                  type="email" 
                  required
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  className={`w-full bg-gray-100 border ${errorMsg.includes('Email') ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-500'} placeholder:text-gray-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-medium text-gray-900`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Tên *</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-gray-100 border border-gray-300 placeholder:text-gray-500 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-medium text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Họ *</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-gray-100 border border-gray-300 placeholder:text-gray-500 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-medium text-gray-900"
                  />
                </div>
              </div>

              {/* --- HÀNG 3 --- */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Mật khẩu *</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-300 placeholder:text-gray-500 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 pr-12 outline-none transition-all font-medium text-gray-900"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-2">Mật khẩu phải dài ít nhất 8 ký tự, bao gồm chữ cái và số.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Số điện thoại *</label>
                <div className="flex gap-2">
                  <select defaultValue="+84" className="bg-gray-100 border border-gray-300 rounded-xl py-3 px-3 outline-none font-medium text-gray-900 w-24 text-center cursor-pointer">
                    <option value="+84">+84</option>
                  </select>
                  <input 
                    type="tel" 
                    required
                    className="flex-1 bg-gray-100 border border-gray-300 placeholder:text-gray-500 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-medium text-gray-900"
                  />
                </div>
              </div>

              {/* --- HÀNG 4: ĐỊA CHỈ & NGÀY SINH NGANG HÀNG --- */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Địa chỉ *</label>
                <input 
                  type="text" 
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Số nhà, tên đường, phường/xã..."
                  className="w-full bg-gray-100 border border-gray-300 placeholder:text-gray-500 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-medium text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Ngày sinh</label>
                <input 
                  type="date" 
                  className="w-full bg-gray-100 border border-gray-300 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-medium text-gray-900 uppercase cursor-pointer text-sm"
                />
              </div>

            </div>

            {/* ================= PHẦN CHECKBOX & NÚT SUBMIT ================= */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row md:items-start justify-between gap-8">
              
              <div className="space-y-4 flex-1">
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 w-4 h-4 rounded text-blue-600 border-gray-300 cursor-pointer" id="newsletter" />
                  <label htmlFor="newsletter" className="text-sm text-gray-600 cursor-pointer">
                    Đăng ký nhận tin tức ưu đãi, bộ sưu tập mới từ SHOESTORE.
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" required className="mt-1 w-4 h-4 rounded text-blue-600 border-gray-300 cursor-pointer" id="privacy" />
                  <label htmlFor="privacy" className="text-sm text-gray-600 cursor-pointer">
                    Tôi đã đọc và đồng ý với <a href="#" className="text-black font-bold hover:underline">Chính sách quyền riêng tư</a>. *
                  </label>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider mt-4">
                  <ShieldCheck size={14} className="text-green-500" />
                  Bảo mật thông tin khách hàng tuyệt đối
                </div>
              </div>

              <div className="w-full md:w-auto md:min-w-[200px]">
                <button 
                  type="submit"
                  className="w-full bg-black text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-gray-800 transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 group"
                >
                  Tạo tài khoản
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          </form>

        </div>
      </div>
    </main>
  );
}