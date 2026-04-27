"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // BƯỚC QUAN TRỌNG: Nếu đang ở trang đăng nhập thì KHÔNG in ra Sidebar
  if (pathname === "/admin/login") {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        {children}
      </div>
    );
  }

  // CÒN LẠI: Hiển thị giao diện Admin bình thường có Sidebar
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Cột trái: Thanh Menu */}
      <AdminSidebar />
      
      {/* Cột phải: Nội dung chính */}
      <div className="flex-1 ml-64 p-8">
        {children}
      </div>
    </div>
  );
}