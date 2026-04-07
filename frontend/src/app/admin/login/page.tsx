"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ArrowRight, XCircle, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  
  // STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // TOAST THÔNG BÁO
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const showToast = (msg: string, type: "success" | "error") => {
    setToastMsg(msg);
    setToastType(type);
    if (type === "error") {
      setTimeout(() => setToastMsg(""), 3000);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (result.success) {
        showToast(result.message, "success");
        // Đăng nhập đúng -> Chuyển hướng vào trang Thống kê Admin
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1000);
      } else {
        showToast(result.message, "error");
        setIsLoading(false);
      }
    } catch (error) {
      showToast("Lỗi kết nối máy chủ!", "error");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative">
      
      {/* THÔNG BÁO TOAST */}
      {toastMsg && (
        <div className={`fixed top-6 right-6 bg-white border-l-4 shadow-xl px-6 py-4 rounded-lg flex items-center gap-3 z-[60] animate-in slide-in-from-right-8 ${toastType === 'success' ? 'border-green-500' : 'border-red-500'}`}>
          {toastType === 'success' ? <CheckCircle2 className="text-green-500" size={24} /> : <XCircle className="text-red-500" size={24} />}
          <span className="font-medium text-gray-800">{toastMsg}</span>
        </div>
      )}

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 uppercase tracking-tight">
          Shoe<span className="text-blue-600">Store</span> Admin
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Vui lòng đăng nhập để truy cập Trung tâm điều khiển
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100 relative overflow-hidden">
          
          {/* Hiệu ứng loading mờ nền */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[1px]">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tài khoản Email
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm outline-none transition-all"
                  placeholder="admin@gmail.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm outline-none transition-all"
                  placeholder="••••••"
                />
              </div>
            </div>

            {/* Nút Đăng nhập */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70"
              >
                Đăng nhập hệ thống
                {!isLoading && <ArrowRight size={18} />}
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800 flex flex-col gap-1 border border-blue-100">
              <span className="font-bold mb-1">Thông tin test (Mock Data):</span>
              <span>Email: <strong>admin@gmail.com</strong></span>
              <span>Mật khẩu: <strong>123456</strong></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}