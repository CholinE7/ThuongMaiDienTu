"use client"; 

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* 1. LOGO */}
        <Link href="/" className="text-2xl font-bold text-gray-800 flex-shrink-0">
          SHOE<span className="text-blue-600">STORE</span>
        </Link>

        {/* 2. THANH TÌM KIẾM (Desktop) */}
        <div className="hidden md:block flex-1 max-w-md mx-8">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Tìm kiếm sản phẩm..." 
              className="w-full bg-gray-100 border border-transparent text-gray-800 text-sm rounded-full pl-4 pr-12 py-2.5 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-full transition-colors">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* 3. MENU & ICONS */}
        <div className="flex items-center space-x-6">
          
          {/* Menu Text (Desktop) */}
          <div className="hidden lg:flex space-x-6 text-gray-600 font-medium text-sm">
            {/* <Link href="/" className="hover:text-blue-600 transition">Trang chủ</Link> */}
            <Link href="/category/nam" className="hover:text-blue-600 transition">Giày Nam</Link>
            <Link href="/category/nu" className="hover:text-blue-600 transition">Giày Nữ</Link>
            {/* <Link href="/category/cap" className="hover:text-blue-600 transition">Giày Cặp</Link> */}
          </div>

          {/* Icons Group */}
          <div className="flex items-center space-x-4">
            
            {/* ---  ICON USER CÓ MENU DROPDOWN --- */}
            <div className="relative group cursor-pointer">
              {/* Vùng icon */}
              <div className="p-2 rounded-full text-gray-600 group-hover:bg-gray-100 group-hover:text-blue-600 transition">
                <User size={24} />
              </div>

              {/* Bảng Dropdown Đăng nhập / Đăng ký */}
              <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-1 transition-all duration-300 z-50">
                {/* Vùng đệm trong suốt: Giúp khi di chuyển chuột từ icon xuống menu không bị mất hover */}
                <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
                
                <div className="py-2 flex flex-col">
                  <Link href="/login" className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                    Đăng nhập
                  </Link>
                  <Link href="/register" className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                    Đăng ký
                  </Link>
                </div>
              </div>
            </div>

            {/* ICON GIỎ HÀNG */}
            <div className="relative cursor-pointer group" title="Giỏ hàng">
              <div className="p-2 rounded-full group-hover:bg-gray-100 transition">
                <ShoppingCart size={24} className="text-gray-600 group-hover:text-blue-600 transition" />
              </div>
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                0
              </span>
            </div>

            {/* Nút mở Menu Mobile */}
            <button 
              className="lg:hidden text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. MENU MOBILE */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 px-4 py-4 flex flex-col space-y-4 shadow-lg">
           <div className="relative">
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              className="w-full bg-gray-100 border border-transparent rounded-full pl-4 pr-10 py-2 focus:outline-none focus:border-blue-500"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
              <Search size={18} />
            </button>
          </div>

          <Link href="/" className="block py-2 text-gray-700 font-medium hover:text-blue-600 border-b border-gray-50">Trang chủ</Link>
          <Link href="/category/nam" className="block py-2 text-gray-700 font-medium hover:text-blue-600 border-b border-gray-50">Giày Nam</Link>
          <Link href="/category/nu" className="block py-2 text-gray-700 font-medium hover:text-blue-600 border-b border-gray-50">Giày Nữ</Link>
          <Link href="/category/cap" className="block py-2 text-gray-700 font-medium hover:text-blue-600 border-b border-gray-50">Giày Cặp</Link>
          
          <div className="flex gap-4 pt-2">
            <Link href="/login" className="flex-1 text-center bg-gray-100 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-200">Đăng nhập</Link>
            <Link href="/register" className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">Đăng ký</Link>
          </div>
        </div>
      )}
    </nav>
  );
}