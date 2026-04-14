"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  // 1. DỮ LIỆU GỐC HIỂN THỊ TRÊN BẢNG
  const [userInfo, setUserInfo] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0814567821",
    address: "121 Mai Chí Thọ, Phường An Khánh, Hồ Chí Minh"
  });

  // 2. DỮ LIỆU TẠM DÙNG CHO FORM CHỈNH SỬA
  const [editForm, setEditForm] = useState(userInfo);
  
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState("");

  // Lấy tên từ localStorage lúc mới vào trang
  useEffect(() => {
    const storedName = localStorage.getItem("customerName");
    if (storedName) {
      setUserInfo(prev => ({ ...prev, name: storedName }));
      setEditForm(prev => ({ ...prev, name: storedName }));
    }
  }, []);

  // HÀM XỬ LÝ KHI BẤM "LƯU THAY ĐỔI"
  const handleSave = () => {
    // Cập nhật lại dữ liệu gốc bằng dữ liệu vừa nhập trong Form
    setUserInfo(editForm);
    
    // Lưu tên mới vào localStorage để Navbar tự cập nhật
    localStorage.setItem("customerName", editForm.name);
    
    // Đóng Form và hiện thông báo
    setIsEditing(false);
    setToast("Cập nhật thông tin thành công!");
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <main className="min-h-screen bg-[#F4F6F9] pt-24 pb-12 font-sans relative">
      
      {/* HIỆU ỨNG THÔNG BÁO (TOAST) */}
      {toast && (
        <div className="fixed top-24 right-6 bg-white border-l-4 border-green-500 shadow-xl px-6 py-4 rounded-lg flex items-center gap-3 z-50 animate-in slide-in-from-right-8">
          <CheckCircle2 className="text-green-500" size={24} />
          <span className="font-medium text-gray-800">{toast}</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4">
        
        {/* --- BREADCRUMB (Đường dẫn) --- */}
        <div className="text-sm font-medium mb-6 flex items-center gap-1.5">
          <Link href="/" className="text-[#FA5C52] hover:underline">Trang chủ</Link> 
          <span className="text-gray-500">/</span> 
          <span className="text-gray-600">Tài khoản</span>
        </div>

        {/* --- KHUNG THÔNG TIN CHÍNH --- */}
        <div className="bg-white border border-gray-200 shadow-sm p-8 md:p-10">
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Thông Tin Tài Khoản</h1>
            <div className="h-[2px] w-full bg-[#FA5C52] opacity-80"></div>
          </div>

          {/* Bảng thông tin */}
          <div className="w-full border border-gray-200 rounded-sm overflow-hidden mb-6">
            <table className="w-full text-left text-sm md:text-base">
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="w-1/3 py-4 px-6 font-bold text-gray-800 bg-gray-50/50">Họ và tên</td>
                  <td className="w-2/3 py-4 px-6 text-gray-700">{userInfo.name}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="w-1/3 py-4 px-6 font-bold text-gray-800 bg-gray-50/50">Email</td>
                  <td className="w-2/3 py-4 px-6 text-gray-700">{userInfo.email}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="w-1/3 py-4 px-6 font-bold text-gray-800 bg-gray-50/50">Số điện thoại</td>
                  <td className="w-2/3 py-4 px-6 text-gray-700">{userInfo.phone}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="w-1/3 py-4 px-6 font-bold text-gray-800 bg-gray-50/50">Địa chỉ</td>
                  <td className="w-2/3 py-4 px-6 text-gray-700 leading-relaxed">{userInfo.address}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Nút bật Form chỉnh sửa */}
          {!isEditing && (
            <div className="flex justify-end">
              <button 
                onClick={() => {
                  setEditForm(userInfo); // Reset lại form bằng dữ liệu hiện tại trước khi mở
                  setIsEditing(true);
                }}
                className="bg-[#FA5C52] hover:bg-[#E04A41] text-white px-6 py-2.5 rounded shadow-sm font-semibold text-sm transition-all flex items-center gap-2 active:scale-95"
              >
                <Edit size={16} /> 
                Chỉnh sửa thông tin
              </button>
            </div>
          )}

          {/* FORM CHỈNH SỬA THÔNG TIN */}
          {isEditing && (
            <div className="mt-8 p-6 lg:p-8 bg-gray-50 border border-gray-200 rounded animate-in fade-in slide-in-from-top-4">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Edit size={20} className="text-[#FA5C52]"/> Cập nhật thông tin
              </h3>
              
              <div className="space-y-5 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Cột 1: Tên & Điện thoại */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Họ và tên</label>
                      <input 
                        type="text" 
                        value={editForm.name} 
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full border border-gray-300 rounded px-4 py-2.5 outline-none focus:border-[#FA5C52] focus:ring-1 focus:ring-[#FA5C52] transition-shadow bg-white" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Số điện thoại</label>
                      <input 
                        type="text" 
                        value={editForm.phone} 
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        className="w-full border border-gray-300 rounded px-4 py-2.5 outline-none focus:border-[#FA5C52] focus:ring-1 focus:ring-[#FA5C52] transition-shadow bg-white" 
                      />
                    </div>
                  </div>

                  {/* Cột 2: Email & Địa chỉ */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Email <span className="text-gray-400 font-normal text-xs">(Không thể thay đổi)</span></label>
                      <input 
                        type="email" 
                        disabled 
                        value={editForm.email} 
                        className="w-full border border-gray-200 rounded px-4 py-2.5 outline-none bg-gray-100 text-gray-500 cursor-not-allowed" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Địa chỉ giao hàng mặc định</label>
                      <textarea 
                        rows={1}
                        value={editForm.address} 
                        onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                        className="w-full border border-gray-300 rounded px-4 py-2.5 outline-none focus:border-[#FA5C52] focus:ring-1 focus:ring-[#FA5C52] transition-shadow bg-white resize-none" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                 <button 
                  onClick={() => setIsEditing(false)} 
                  className="px-6 py-2.5 border border-gray-300 bg-white text-gray-700 rounded font-bold text-sm hover:bg-gray-100 transition shadow-sm"
                 >
                   Hủy bỏ
                 </button>
                 <button 
                  onClick={handleSave} 
                  className="px-8 py-2.5 bg-[#FA5C52] text-white rounded font-bold text-sm hover:bg-[#E04A41] transition shadow-sm active:scale-95"
                 >
                   Lưu thay đổi
                 </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}