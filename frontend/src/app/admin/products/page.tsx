"use client";

import { useState, useEffect } from "react";
import { Plus, Search, CheckCircle2, XCircle, Edit, Trash2, ChevronLeft, ChevronRight, X, Loader2, ImageIcon, ArrowLeft } from "lucide-react";
import Image from "next/image";

const PRODUCTS_PER_PAGE = 5;

export default function AdminProductsPage() {
  // 1. STATE DỮ LIỆU & LOADING
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 2. STATES TÌM KIẾM
  const [searchName, setSearchName] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [appliedFilters, setAppliedFilters] = useState({ name: "", category: "all" });

  // 3. STATES PHÂN TRANG & MODAL
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentProduct, setCurrentProduct] = useState({ 
    id: 0, name: "", brand: "", image: "", importPrice: 0, sellPrice: 0, category: "Giày Thể Thao Nam", status: "visible", description: ""
  });

  // TOAST THÔNG BÁO
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToastMsg(msg); setToastType(type); setTimeout(() => setToastMsg(""), 3000);
  };

  // ==========================================
  // HÀM GỌI API LẤY DỮ LIỆU
  // ==========================================
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({ name: appliedFilters.name, category: appliedFilters.category }).toString();
      const response = await fetch(`/api/products?${query}`);
      const result = await response.json();
      if (result.success) setProducts(result.data);
    } catch (error) {
      showToast("Lỗi kết nối máy chủ!", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    setCurrentPage(1);
  }, [appliedFilters]);

  // HÀNH ĐỘNG TÌM KIẾM
  const handleSearchClick = () => {
    setAppliedFilters({ name: searchName, category: filterCategory });
  };

  // ==========================================
  // HÀM GỌI API THÊM/SỬA/XÓA
  // ==========================================
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = '/api/products';
      const method = modalMode === "add" ? 'POST' : 'PUT';
      
      // Nếu chưa có ảnh, gán tạm 1 ảnh giày mặc định
      const payload = { 
        ...currentProduct, 
        image: currentProduct.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300"
      };

      const response = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      const result = await response.json();
      
      if (result.success) {
        showToast(result.message, "success");
        fetchProducts(); // Tải lại bảng
      }
    } catch (error) {
      showToast("Lỗi hệ thống!", "error");
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa sản phẩm "${name}" không?`)) {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
        const result = await response.json();
        if (result.success) {
          showToast(result.message, "success");
          fetchProducts();
        }
      } catch (error) {
        showToast("Lỗi khi xóa!", "error");
        setIsLoading(false);
      }
    }
  };

  const handleOpenAdd = () => {
    setModalMode("add");
    setCurrentProduct({ id: 0, name: "", brand: "", image: "", importPrice: 0, sellPrice: 0, category: "Giày Thể Thao Nam", status: "visible", description: "" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod: any) => {
    setModalMode("edit");
    setCurrentProduct(prod);
    setIsModalOpen(true);
  };

  // PHÂN TRANG
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  // FORMAT TIỀN TỆ
  const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + " đ";

  return (
    <div className="relative min-h-[80vh] font-sans pb-10">
      
      {/* THÔNG BÁO TOAST */}
      {toastMsg && (
        <div className={`fixed top-6 right-6 bg-white border-l-4 shadow-xl px-6 py-4 rounded-lg flex items-center gap-3 z-[60] animate-in slide-in-from-right-8 ${toastType === 'success' ? 'border-green-500' : 'border-red-500'}`}>
          {toastType === 'success' ? <CheckCircle2 className="text-green-500" size={24} /> : <XCircle className="text-red-500" size={24} />}
          <span className="font-medium text-gray-800">{toastMsg}</span>
        </div>
      )}

      {/* ================= MODAL THÊM / SỬA (CHIA 2 CỘT NHƯ HÌNH) ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-5xl my-8 flex flex-col gap-4 animate-in zoom-in-95">
            <div className="bg-white rounded-xl shadow-sm px-6 py-4 border border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-blue-600 border-l-4 border-blue-600 pl-3">
                {modalMode === "add" ? "Thêm sản phẩm mới" : "Cập nhật sản phẩm"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition p-1 rounded-full"><X size={24} /></button>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              <div className="mb-6 border-b pb-4">
                <h3 className="text-lg font-bold text-gray-900">Thông tin sản phẩm</h3>
                <p className="text-sm text-gray-500">Cập nhật các thông tin cơ bản của giày</p>
              </div>

              <form onSubmit={handleSaveProduct}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  
                  {/* CỘT TRÁI: ĐIỀN CHỮ (Chiếm 2 phần) */}
                  <div className="lg:col-span-2 space-y-5">
                    <div><label className="block text-sm font-semibold text-gray-800 mb-2">Tên sản phẩm <span className="text-red-500">*</span></label><input required type="text" value={currentProduct.name} onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none" /></div>
                    
                    <div className="grid grid-cols-2 gap-5">
                      <div><label className="block text-sm font-semibold text-gray-800 mb-2">Thương hiệu <span className="text-red-500">*</span></label><input required type="text" value={currentProduct.brand} onChange={(e) => setCurrentProduct({...currentProduct, brand: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none" /></div>
                      <div><label className="block text-sm font-semibold text-gray-800 mb-2">Danh mục <span className="text-red-500">*</span></label><select required value={currentProduct.category} onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none bg-white"><option value="Giày Thể Thao Nam">Giày Thể Thao Nam</option><option value="Giày Thể Thao Nữ">Giày Thể Thao Nữ</option><option value="Giày Chạy Bộ">Giày Chạy Bộ</option><option value="Giày Sneaker">Giày Sneaker</option><option value="Giày Lười">Giày Lười</option></select></div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div><label className="block text-sm font-semibold text-gray-800 mb-2">Giá nhập (VNĐ) <span className="text-red-500">*</span></label><input required type="number" value={currentProduct.importPrice || ""} onChange={(e) => setCurrentProduct({...currentProduct, importPrice: Number(e.target.value)})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none" /></div>
                      <div><label className="block text-sm font-semibold text-gray-800 mb-2">Giá bán (VNĐ) <span className="text-red-500">*</span></label><input required type="number" value={currentProduct.sellPrice || ""} onChange={(e) => setCurrentProduct({...currentProduct, sellPrice: Number(e.target.value)})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none" /></div>
                    </div>

                    <div><label className="block text-sm font-semibold text-gray-800 mb-2">Trạng thái <span className="text-red-500">*</span></label><select required value={currentProduct.status} onChange={(e) => setCurrentProduct({...currentProduct, status: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none bg-white"><option value="visible">Hiển thị</option><option value="hidden">Ẩn</option></select></div>
                    
                    <div><label className="block text-sm font-semibold text-gray-800 mb-2">Mô tả sản phẩm</label><textarea rows={4} value={currentProduct.description} onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none resize-none" /></div>
                  </div>

                  {/* CỘT PHẢI: ẢNH (Chiếm 1 phần) */}
                 {/* CỘT PHẢI: ẢNH (Chiếm 1 phần) */}
<div className="lg:col-span-1 flex flex-col items-center">
  <label className="block text-sm font-semibold text-gray-800 mb-4 w-full text-center">Hình ảnh sản phẩm</label>
  
  <div className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-gray-50 overflow-hidden relative group">
    {currentProduct.image ? (
      <Image src={currentProduct.image} alt="Preview" fill className="object-cover" />
    ) : (
      <div className="text-gray-400 flex flex-col items-center"><ImageIcon size={48} className="mb-2 opacity-50" /><span>Chưa có ảnh</span></div>
    )}
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      <span className="text-white font-medium text-sm">Bấm nút bên dưới để đổi</span>
    </div>
  </div>

  {/* KHUNG CHỨA NÚT VÀ INPUT FILE (ẨN) */}
  <div className="w-full relative mt-4">
    {/* Thẻ input ẩn đi */}
    <input 
      type="file" 
      accept="image/*"
      id="imageUpload"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          // Tạo một URL tạm thời (blob URL) để preview ảnh vừa chọn ngay lập tức
          const imageUrl = URL.createObjectURL(file);
          setCurrentProduct({...currentProduct, image: imageUrl});
        }
      }}
    />
    {/* Label này đóng vai trò như một nút bấm, khi click vào nó sẽ kích hoạt thẻ input ẩn bên trên */}
    <label 
      htmlFor="imageUpload" 
      className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition"
    >
      <Edit size={16} /> Thay đổi hình ảnh
    </label>
  </div>
  
  <p className="text-xs text-gray-500 mt-3 text-center">Hỗ trợ JPG, PNG, WEBP. Kích thước tối đa 5MB.</p>
</div>
</div>

                {/* NÚT LƯU Ở DƯỚI CÙNG */}
                <div className="pt-8 flex justify-end gap-4 border-t border-gray-100 mt-8">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md font-semibold transition flex items-center gap-2"><ArrowLeft size={18} /> Quay về</button>
                  <button type="submit" className="px-8 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition flex items-center gap-2">{modalMode === "add" ? <Plus size={18} /> : <CheckCircle2 size={18} />}{modalMode === "add" ? "Thêm sản phẩm" : "Lưu thay đổi"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* --- TIÊU ĐỀ & NÚT THÊM SẢN PHẨM --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600 uppercase">Quản lý sản phẩm</h1>
        <button onClick={handleOpenAdd} className="bg-[#F97316] text-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-[#EA580C] transition flex items-center gap-2 font-medium">
          <Plus size={18} /> Thêm sản phẩm
        </button>
      </div>

      {/* --- BỘ LỌC TÌM KIẾM --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
          <div><label className="block text-sm font-semibold text-gray-900 mb-1.5">Tìm theo tên / thương hiệu</label><input type="text" placeholder="Nhập tên giày hoặc hãng..." value={searchName} onChange={(e) => setSearchName(e.target.value)} className="w-full border-2 border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm transition-all" /></div>
          <div><label className="block text-sm font-semibold text-gray-900 mb-1.5">Tìm theo danh mục</label><select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="w-full border-2 border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm transition-all bg-white font-medium"><option value="all">Tất cả danh mục</option><option value="Giày Thể Thao Nam">Giày Thể Thao Nam</option><option value="Giày Thể Thao Nữ">Giày Thể Thao Nữ</option><option value="Giày Chạy Bộ">Giày Chạy Bộ</option><option value="Giày Sneaker">Giày Sneaker</option><option value="Giày Lười">Giày Lười</option></select></div>
          <div><button onClick={handleSearchClick} className="bg-[#22C55E] text-white px-6 py-2.5 rounded-lg shadow-sm hover:bg-[#16A34A] transition flex items-center justify-center gap-2 font-bold w-full md:w-auto"><Search size={18} /> Tìm kiếm</button></div>
        </div>
      </div>

      {/* --- BẢNG DỮ LIỆU CÓ HIỆU ỨNG LOADING --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8 min-h-[400px] relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center backdrop-blur-[1px]">
            <div className="flex flex-col items-center gap-2"><Loader2 className="w-8 h-8 text-blue-600 animate-spin" /><span className="font-semibold text-gray-600">Đang tải dữ liệu...</span></div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white text-sm font-semibold uppercase tracking-wide">
                <th className="px-4 py-4 whitespace-nowrap">STT</th>
                <th className="px-4 py-4 whitespace-nowrap text-left w-[30%]">TÊN SẢN PHẨM</th>
                <th className="px-4 py-4 whitespace-nowrap">HÌNH ẢNH</th>
                <th className="px-4 py-4 whitespace-nowrap">GIÁ BÁN</th>
                <th className="px-4 py-4 whitespace-nowrap">GIÁ NHẬP</th>
                <th className="px-4 py-4 whitespace-nowrap">DANH MỤC</th>
                <th className="px-4 py-4 whitespace-nowrap">TRẠNG THÁI</th>
                <th className="px-4 py-4 whitespace-nowrap">THAO TÁC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {!isLoading && paginatedProducts.length > 0 ? (
                paginatedProducts.map((prod, index) => (
                  <tr key={prod.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-4 py-4">{startIndex + index + 1}</td>
                    <td className="px-4 py-4 text-left">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-base">{prod.name}</span>
                        <span className="text-gray-500 text-xs mt-1">Thương hiệu: <span className="font-semibold">{prod.brand}</span></span>
                      </div>
                    </td>
                    <td className="px-4 py-4 flex justify-center">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                        <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="px-4 py-4 font-bold text-red-500">{formatPrice(prod.sellPrice)}</td>
                    <td className="px-4 py-4 font-semibold text-gray-600">{formatPrice(prod.importPrice)}</td>
                    <td className="px-4 py-4"><span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-bold border border-gray-200">{prod.category}</span></td>
                    <td className="px-4 py-4">
                      {prod.status === "visible" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-green-700 border border-green-200 bg-green-50 text-xs font-bold"><CheckCircle2 size={14}/> Hiển thị</span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-500 border border-gray-200 bg-gray-100 text-xs font-bold"><XCircle size={14}/> Đã ẩn</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center items-center gap-2">
                        <button onClick={() => handleOpenEdit(prod)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded shadow-sm transition font-semibold flex items-center gap-1.5"><Edit size={16}/> Sửa</button>
                        <button onClick={() => handleDelete(prod.id, prod.name)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded shadow-sm transition font-semibold flex items-center gap-1.5"><Trash2 size={16}/> Xóa</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                !isLoading && <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-500 font-medium">Không tìm thấy sản phẩm nào.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- PHÂN TRANG --- */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`w-9 h-9 flex items-center justify-center border rounded-lg transition ${currentPage === 1 ? "border-gray-200 text-gray-300 cursor-not-allowed bg-white" : "border-gray-300 text-gray-500 bg-white hover:bg-blue-50 hover:text-blue-600 shadow-sm"}`}><ChevronLeft size={18} /></button>
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            return <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)} className={`w-9 h-9 flex items-center justify-center border rounded-lg font-bold transition shadow-sm ${currentPage === pageNumber ? "border-blue-600 bg-blue-600 text-white shadow-md" : "border-gray-300 bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`}>{pageNumber}</button>;
          })}
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className={`w-9 h-9 flex items-center justify-center border rounded-lg transition ${currentPage === totalPages ? "border-gray-200 text-gray-300 cursor-not-allowed bg-white" : "border-gray-300 text-gray-500 bg-white hover:bg-blue-50 hover:text-blue-600 shadow-sm"}`}><ChevronRight size={18} /></button>
        </div>
      )}
    </div>
  );
}