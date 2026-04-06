"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, ShoppingCart, Users, LayoutDashboard, LogOut, User } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Tổng quan', href: '/admin', icon: LayoutDashboard },
    { name: 'Quản lý sản phẩm', href: '/admin/products', icon: Package },
    { name: 'Quản lý đơn hàng', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Quản lý người dùng', href: '/admin/users', icon: Users },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-screen fixed top-0 left-0">
      {/* Logo Admin */}
      <div className="h-16 flex items-center justify-center border-b border-gray-800">
        <Link href="/admin" className="text-xl font-bold tracking-wider">
          SHOE<span className="text-blue-500">ADMIN</span>
        </Link>
      </div>

      {/* Danh sách Menu */}
      <nav className="flex-1 py-6 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* --- PHẦN MỚI: Hồ sơ Admin & Nút Đăng xuất --- */}
      <div className="p-4 border-t border-gray-800 bg-gray-900">
        <div className="flex items-center justify-between">
          
          {/* Thông tin User */}
          <div className="flex items-center gap-3">
            <div className="bg-gray-800 text-gray-300 p-2 rounded-full border border-gray-700">
              <User size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Quản trị viên</span>
              <span className="text-xs text-gray-400">admin@shoestore.com</span>
            </div>
          </div>

          {/* Nút Đăng xuất */}
          <Link href="/" className="text-gray-400 hover:text-red-500 hover:bg-gray-800 p-2 rounded-lg transition-colors" title="Đăng xuất">
            <LogOut size={20} />
          </Link>
          
        </div>
      </div>
      
    </div>
  );
}