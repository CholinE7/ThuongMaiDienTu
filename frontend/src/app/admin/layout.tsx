import AdminSidebar from "@/src/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Dashboard - Shoe Store",
  description: "Trang quản trị hệ thống",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Cột trái: Thanh Menu (Cố định 64 theo thiết kế Tailwind) */}
      <AdminSidebar />
      
      {/* Cột phải: Nội dung chính */}
      <div className="flex-1 ml-64 p-8">
        {children}
      </div>
    </div>
  );
}