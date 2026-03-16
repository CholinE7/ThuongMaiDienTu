import { products } from "@/src/data/products";// Tái sử dụng dữ liệu cũ
import { Plus, Edit, Trash2, Search } from "lucide-react";
import Image from "next/image";

export default function AdminProductsPage() {
  return (
    <div>
      {/* Header của trang */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition font-medium">
          <Plus size={20} />
          Thêm sản phẩm mới
        </button>
      </div>

      {/* Khung chứa bảng */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Thanh tìm kiếm trong bảng */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Tìm tên sản phẩm..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Bảng dữ liệu */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Sản phẩm</th>
                <th className="px-6 py-4 font-medium">Danh mục</th>
                <th className="px-6 py-4 font-medium">Giá bán</th>
                <th className="px-6 py-4 font-medium text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  {/* Cột Hình ảnh & Tên */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <span className="font-medium text-gray-900 line-clamp-1">{product.name}</span>
                    </div>
                  </td>
                  {/* Cột Danh mục */}
                  <td className="px-6 py-4 text-gray-600">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  {/* Cột Giá */}
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {new Intl.NumberFormat('vi-VN').format(product.price)} đ
                  </td>
                  {/* Cột Nút bấm */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-3">
                      <button className="text-blue-600 hover:text-blue-800 transition" title="Sửa">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-800 transition" title="Xóa">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Phân trang (Pagination giả) */}
        <div className="p-4 border-t border-gray-200 text-sm text-gray-500 flex justify-between items-center">
          <span>Hiển thị 1 - {products.length} của {products.length} sản phẩm</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50" disabled>Trước</button>
            <button className="px-3 py-1 border border-gray-300 rounded bg-blue-50 text-blue-600 border-blue-200">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50" disabled>Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
}