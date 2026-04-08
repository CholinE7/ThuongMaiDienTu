'use client';

import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, ChevronLeft, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    firstName: '', 
    lastName: '', 
    phone: '',
    dateOfBirth: '',
  });

  // Hàm cập nhật state chung
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(''); 

    // 1. Kiểm tra khớp Email ở phía Client trước
    if (formData.email !== formData.confirmEmail) {
      setErrorMsg('Email xác nhận không khớp. Vui lòng kiểm tra lại!');
      return;
    }

    setIsLoading(true);

    // 2. Gom dữ liệu chuẩn UserDTO
    const registerData = {
      username: formData.email, 
      email: formData.email,
      password: formData.password,
      fullName: `${formData.lastName} ${formData.firstName}`.trim(),
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
    };

    try {
      const res = await fetch("http://localhost:8080/api/customers/register/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      // 3. Xử lý kết quả từ Backend
      if (res.ok) {
        alert("Chúc mừng! Bạn đã đăng ký thành công.");
        router.push("/login");
      } else {
        const errorMessageFromServer = await res.text();
        setErrorMsg(errorMessageFromServer || "Đăng ký thất bại. Vui lòng thử lại!");
      }
    } catch (error) {
      setErrorMsg("Lỗi kết nối tới Server. Hãy kiểm tra Backend của bạn!");
    } finally {
      setIsLoading(false);
    }
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
          </div>

          {errorMsg && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600">
              <AlertCircle size={20} />
              <p className="text-sm font-bold">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              
              {/* CỘT TRÁI */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Email *</label>
                  <input 
                    name="email" type="email" required
                    value={formData.email} onChange={handleChange}
                    className="w-full bg-gray-100 border border-gray-300 rounded-xl py-3 px-4 outline-none transition-all font-medium text-gray-900 focus:bg-white focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Xác nhận Email *</label>
                  <input 
                    name="confirmEmail" type="email" required
                    value={formData.confirmEmail} onChange={handleChange}
                    className={`w-full bg-gray-100 border ${errorMsg.includes('Email') ? 'border-red-500' : 'border-gray-300'} rounded-xl py-3 px-4 outline-none transition-all font-medium text-gray-900 focus:bg-white focus:border-blue-500`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Mật khẩu *</label>
                  <div className="relative">
                    <input 
                      name="password" type={showPassword ? "text" : "password"} required
                      value={formData.password} onChange={handleChange}
                      className="w-full bg-gray-100 border border-gray-300 rounded-xl py-3 px-4 pr-12 outline-none transition-all font-medium text-gray-900 focus:bg-white focus:border-blue-500"
                    />
                    <button 
                      type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* CỘT PHẢI */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Họ *</label>
                    <input 
                      name="lastName" type="text" required
                      value={formData.lastName} onChange={handleChange}
                      className="w-full bg-gray-100 border border-gray-300 rounded-xl py-3 px-4 outline-none transition-all font-medium text-gray-900 focus:bg-white focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Tên *</label>
                    <input 
                      name="firstName" type="text" required
                      value={formData.firstName} onChange={handleChange}
                      className="w-full bg-gray-100 border border-gray-300 rounded-xl py-3 px-4 outline-none transition-all font-medium text-gray-900 focus:bg-white focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Số điện thoại *</label>
                  <input 
                    name="phone" type="tel" required
                    value={formData.phone} onChange={handleChange}
                    placeholder="0901234567"
                    className="w-full bg-gray-100 border border-gray-300 rounded-xl py-3 px-4 outline-none transition-all font-medium text-gray-900 focus:bg-white focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Ngày sinh</label>
                  <input 
                    name="dateOfBirth" type="date"
                    value={formData.dateOfBirth} onChange={handleChange}
                    className="w-full bg-gray-100 border border-gray-300 rounded-xl py-3 px-4 outline-none font-medium text-gray-900 focus:bg-white focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div className="space-y-4 flex-1">
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 w-4 h-4 rounded text-blue-600 border-gray-300 cursor-pointer" id="newsletter" />
                  <label htmlFor="newsletter" className="text-sm text-gray-600 cursor-pointer">
                    Đăng ký nhận tin tức ưu đãi, bộ sưu tập mới từ SHOESTORE.
                  </label>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <input type="checkbox" required className="mt-1 w-4 h-4 cursor-pointer" id="privacy" />
                  <label htmlFor="privacy">Tôi đã đọc và đồng ý với Chính sách quyền riêng tư. *</label>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-green-500" /> Bảo mật thông tin khách hàng tuyệt đối
                </div>
              </div>

              <div className="w-full md:w-auto">
                <button 
                  type="submit" disabled={isLoading}
                  className="w-full bg-black text-white py-4 px-12 rounded-full font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group disabled:bg-gray-400"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : "Tạo tài khoản"}
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