"use client";

import { useState, useEffect } from "react";
import { Plus, Search, CheckCircle2, RefreshCcw, Eye, ChevronLeft, ChevronRight, X, Loader2, Trash2, ArrowLeft, Save } from "lucide-react";
import Image from "next/image";

// DANH SÁCH SẢN PHẨM MẪU DÙNG CHO DROPDOWN KHI TẠO PHIẾU NHẬP
const AVAILABLE_PRODUCTS = [
  { id: 1, name: "Giày Thể Thao Nam N801", brand: "Nike", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300" },
  { id: 2, name: "Giày Chạy Bộ Nữ A-Boost", brand: "Adidas", image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=300" },
  { id: 3, name: "Sneaker Cổ Thấp Trắng", brand: "Puma", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=300" },
  { id: 4, name: "Giày Bóng Rổ Jordan 1", brand: "Nike", image: "https://images.unsplash.com/photo-1574561569420-10ef4f21bbdd?q=80&w=300" },
  { id: 5, name: "Giày Vải Canvas Classic", brand: "Converse", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=300" },
];

const RECEIPTS_PER_PAGE = 5;

export default function AdminImportsPage() {
  // 1. STATE DỮ LIỆU & LOADING
  const [receipts, setReceipts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 2. STATES TÌM KIẾM
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({ fromDate: "", toDate: "" });

  // 3. STATES PHÂN TRANG & MODAL
  const [currentPage, setCurrentPage] = useState(1);
  const [modalMode, setModalMode] = useState<"none" | "view" | "add">("none");
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);

  // 4. STATES CHO FORM THÊM PHIẾU NHẬP
  const [importDate, setImportDate] = useState(new Date().toISOString().split('T')[0]);
  const [formItems, setFormItems] = useState([{ productId: "", importPrice: 0, quantity: 1 }]);

  // TOAST THÔNG BÁO
  const [toastMsg, setToastMsg] = useState("");
  const showToast = (msg: string) => { setToastMsg(msg); setTimeout(() => setToastMsg(""), 3000); };

  // ==========================================
  // HÀM GỌI API LẤY DỮ LIỆU
  // ==========================================
  const fetchReceipts = async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({ fromDate: appliedFilters.fromDate, toDate: appliedFilters.toDate }).toString();
      const response = await fetch(`/api/imports?${query}`);
      const result = await response.json();
      if (result.success) setReceipts(result.data);
    } catch (error) {
      showToast("Lỗi kết nối máy chủ!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReceipts();
    setCurrentPage(1);
  }, [appliedFilters]);

  const handleSearchClick = () => setAppliedFilters({ fromDate, toDate });
  const handleResetFilters = () => { setFromDate(""); setToDate(""); setAppliedFilters({ fromDate: "", toDate: "" }); };

  // ==========================================
  // LOGIC FORM THÊM PHIẾU NHẬP (CÁC DÒNG SẢN PHẨM)
  // ==========================================
  const handleAddRow = () => {
    setFormItems([...formItems, { productId: "", importPrice: 0, quantity: 1 }]);
  };

  const handleRemoveRow = (index: number) => {
    if (formItems.length === 1) return; // Luôn giữ ít nhất 1 dòng
    const newItems = [...formItems];
    newItems.splice(index, 1);
    setFormItems(newItems);
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems: any = [...formItems];
    newItems[index][field] = value;
    setFormItems(newItems);
  };

  // Tính tổng
  const totalSummary = formItems.reduce((acc, item) => {
    if (item.productId) acc.distinct += 1;
    acc.qty += Number(item.quantity) || 0;
    acc.value += (Number(item.importPrice) || 0) * (Number(item.quantity) || 0);
    return acc;
  }, { distinct: 0, qty: 0, value: 0 });

  const handleSaveReceipt = async () => {
    // Validate
    const validItems = formItems.filter(item => item.productId !== "" && item.importPrice > 0 && item.quantity > 0);
    if (validItems.length === 0) {
      showToast("Vui lòng nhập đầy đủ thông tin ít nhất 1 sản phẩm!");
      return;
    }

    setIsLoading(true);
    try {
      // Map valid items to include product details for the mock DB
      const itemsToSave = validItems.map(item => {
        const prodDetails = AVAILABLE_PRODUCTS.find(p => p.id.toString() === item.productId);
        return {
          productId: Number(item.productId),
          productName: prodDetails?.name,
          brand: prodDetails?.brand,
          image: prodDetails?.image,
          importPrice: Number(item.importPrice),
          quantity: Number(item.quantity)
        };
      });

      const payload = {
        importDate,
        items: itemsToSave,
        totalDistinct: totalSummary.distinct,
        totalQuantity: totalSummary.qty,
        totalValue: totalSummary.value
      };

      const response = await fetch('/api/imports', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      const result = await response.json();
      
      if (result.success) {
        showToast(result.message);
        setModalMode("none");
        setFormItems([{ productId: "", importPrice: 0, quantity: 1 }]); // Reset form
        fetchReceipts();
      }
    } catch (error) {
      showToast("Lỗi hệ thống!");
    }
  };

  const handleOpenView = (receipt: any) => {
    setSelectedReceipt(receipt);
    setModalMode("view");
  };

  // PHÂN TRANG
  const totalPages = Math.ceil(receipts.length / RECEIPTS_PER_PAGE);
  const startIndex = (currentPage - 1) * RECEIPTS_PER_PAGE;
  const paginatedReceipts = receipts.slice(startIndex, startIndex + RECEIPTS_PER_PAGE);

  // FORMAT
  const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + " VNĐ";
  const formatDateDisplay = (isoDate: string) => {
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="relative min-h-[80vh] font-sans pb-10">
      
      {toastMsg && (
        <div className="fixed top-6 right-6 bg-white border-l-4 border-green-500 shadow-xl px-6 py-4 rounded-lg flex items-center gap-3 z-[60] animate-in slide-in-from-right-8">
          <CheckCircle2 className="text-green-500" size={24} />
          <span className="font-medium text-gray-800">{toastMsg}</span>
        </div>
      )}

      {/* ================= MODAL THÊM PHIẾU NHẬP ================= */}
      {modalMode === "add" && (
        <div className="fixed inset-0 bg-gray-500/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-5xl my-8 flex flex-col gap-4 animate-in zoom-in-95">
            <div className="bg-white rounded-t-xl shadow-sm px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-blue-600 text-white">
              <h2 className="text-xl font-bold uppercase tracking-wide">Thông tin phiếu nhập mới</h2>
              <button onClick={() => setModalMode("none")} className="text-white hover:text-red-200 transition p-1"><X size={24} /></button>
            </div>
            
            <div className="bg-white rounded-b-xl shadow-lg border border-gray-100 p-8 space-y-8">
              {/* Ngày nhập */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Ngày nhập <span className="text-red-500">*</span></label>
                <input type="date" value={importDate} onChange={(e) => setImportDate(e.target.value)} className="w-full md:w-1/3 border border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 outline-none font-medium" />
              </div>

              {/* Danh sách sản phẩm */}
              <div>
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h3 className="text-base font-bold text-gray-800">Danh sách sản phẩm nhập</h3>
                  <button onClick={handleAddRow} className="bg-[#22C55E] hover:bg-[#16A34A] text-white px-4 py-2 rounded-lg font-bold transition flex items-center gap-2 text-sm shadow-sm">
                    <Plus size={16} /> Thêm sản phẩm
                  </button>
                </div>

                <div className="space-y-3">
                  {formItems.map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-4 items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <select value={item.productId} onChange={(e) => handleItemChange(index, "productId", e.target.value)} className="w-full md:w-[40%] border border-gray-300 rounded-md px-3 py-2 bg-white outline-none focus:border-blue-600">
                        <option value="">Chọn sản phẩm...</option>
                        {AVAILABLE_PRODUCTS.map(p => (
                          <option key={p.id} value={p.id}>{p.name} ({p.brand})</option>
                        ))}
                      </select>
                      <input type="number" placeholder="Giá nhập (VNĐ)" value={item.importPrice || ""} onChange={(e) => handleItemChange(index, "importPrice", e.target.value)} className="w-full md:w-[20%] border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-600" />
                      <input type="number" placeholder="Số lượng" value={item.quantity || ""} onChange={(e) => handleItemChange(index, "quantity", e.target.value)} className="w-full md:w-[15%] border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-600" />
                      
                      <div className="w-full md:w-[20%] font-bold text-red-500 text-right">
                        {formatPrice((item.importPrice || 0) * (item.quantity || 0))}
                      </div>
                      <button onClick={() => handleRemoveRow(index)} className="p-2 text-red-500 hover:bg-red-100 rounded-md transition"><Trash2 size={20} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Khung tổng kết (Giống hệt hình) */}
              <div className="flex justify-end pt-4">
                <div className="w-full md:w-[400px] bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600"><span className="font-semibold">Tổng số mặt hàng:</span><span>{totalSummary.distinct}</span></div>
                  <div className="flex justify-between text-gray-600"><span className="font-semibold">Tổng số lượng:</span><span>{totalSummary.qty}</span></div>
                  <div className="flex justify-between border-t border-gray-300 pt-3 text-base items-center">
                    <span className="font-bold text-gray-900">Tổng giá trị:</span>
                    <span className="font-bold text-red-500 text-lg">{formatPrice(totalSummary.value)}</span>
                  </div>
                </div>
              </div>

              {/* Nút hành động */}
              <div className="pt-4 flex justify-end gap-4 border-t border-gray-100">
                <button onClick={() => setModalMode("none")} className="px-6 py-2.5 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md font-bold transition flex items-center gap-2"><X size={18} /> Hủy bỏ</button>
                <button onClick={handleSaveReceipt} className="px-8 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-bold transition flex items-center gap-2 shadow-sm"><Save size={18} /> Lưu phiếu nhập</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL XEM CHI TIẾT (GIỐNG HÌNH) ================= */}
      {modalMode === "view" && selectedReceipt && (
        <div className="fixed inset-0 bg-gray-500/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-5xl my-8 flex flex-col animate-in zoom-in-95">
            <div className="bg-blue-600 rounded-t-xl px-6 py-5 flex justify-between items-center text-white">
              <h2 className="text-xl font-bold uppercase tracking-wide">Thông tin phiếu nhập {selectedReceipt.code}</h2>
              <button onClick={() => setModalMode("none")} className="hover:text-red-200 transition p-1"><X size={24} /></button>
            </div>
            
            <div className="bg-white rounded-b-xl shadow-lg p-8">
              {/* Thông tin chung */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Thông tin chung</h3>
                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div><p className="text-gray-500 font-medium mb-1">Mã phiếu nhập</p><p className="font-bold text-gray-900 text-base">{selectedReceipt.code}</p></div>
                  <div><p className="text-gray-500 font-medium mb-1">Ngày nhập</p><p className="font-bold text-gray-900 text-base">{formatDateDisplay(selectedReceipt.importDate)}</p></div>
                  <div><p className="text-gray-500 font-medium mb-1">Tổng số lượng sản phẩm</p><p className="font-bold text-blue-700 text-base">{selectedReceipt.totalQuantity} sản phẩm</p></div>
                </div>
              </div>

              {/* Bảng sản phẩm */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Danh sách sản phẩm nhập</h3>
                <div className="overflow-x-auto border rounded-lg">
                  <table className="w-full text-center">
                    <thead className="bg-gray-50 text-gray-700 text-xs font-bold uppercase">
                      <tr>
                        <th className="px-4 py-3">STT</th>
                        <th className="px-4 py-3 text-left">SẢN PHẨM</th>
                        <th className="px-4 py-3">GIÁ NHẬP</th>
                        <th className="px-4 py-3">SỐ LƯỢNG</th>
                        <th className="px-4 py-3 text-right">TỔNG CỘNG</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                      {selectedReceipt.items.map((item: any, idx: number) => (
                        <tr key={idx}>
                          <td className="px-4 py-4">{idx + 1}</td>
                          <td className="px-4 py-4 text-left flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded border"><Image src={item.image} alt="shoes" fill className="object-cover rounded" /></div>
                            <div>
                              <p className="font-bold text-blue-700">{item.productName}</p>
                              <p className="text-xs text-gray-500 mt-0.5">Thương hiệu: {item.brand}</p>
                            </div>
                          </td>
                          <td className="px-4 py-4 font-semibold text-[#16A34A]">{formatPrice(item.importPrice)}</td>
                          <td className="px-4 py-4 font-medium">{item.quantity}</td>
                          <td className="px-4 py-4 font-bold text-red-500 text-right">{formatPrice(item.importPrice * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tổng kết */}
              <div className="flex justify-end pt-6">
                <div className="w-full md:w-[400px] bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600"><span className="font-semibold">Tổng số mặt hàng:</span><span>{selectedReceipt.totalDistinct}</span></div>
                  <div className="flex justify-between text-gray-600"><span className="font-semibold">Tổng số lượng nhập:</span><span>{selectedReceipt.totalQuantity}</span></div>
                  <div className="flex justify-between border-t border-gray-300 pt-3 text-base items-center">
                    <span className="font-bold text-gray-900">Tổng giá trị phiếu nhập:</span>
                    <span className="font-bold text-red-500 text-lg">{formatPrice(selectedReceipt.totalValue)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6"><button onClick={() => setModalMode("none")} className="px-6 py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-bold transition flex items-center gap-2"><ArrowLeft size={18} /> Quay về</button></div>
            </div>
          </div>
        </div>
      )}

      {/* --- TIÊU ĐỀ & NÚT TẠO PHIẾU --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600 uppercase">Quản lý nhập hàng</h1>
        <button onClick={() => setModalMode("add")} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition flex items-center gap-2 font-medium">
          <Plus size={18} /> Tạo phiếu nhập
        </button>
      </div>

      {/* --- BỘ LỌC TÌM KIẾM --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-base font-bold text-blue-800 mb-4">Tra cứu phiếu nhập</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
          <div><label className="block text-sm font-semibold text-gray-900 mb-2">Từ ngày</label><input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full border-2 border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm transition-all" /></div>
          <div><label className="block text-sm font-semibold text-gray-900 mb-2">Đến ngày</label><input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full border-2 border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm transition-all" /></div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleSearchClick} className="bg-[#22C55E] text-white px-6 py-2.5 rounded-lg shadow-sm hover:bg-[#16A34A] transition flex items-center gap-2 font-bold"><Search size={18} /> Tìm kiếm</button>
          <button onClick={handleResetFilters} className="bg-gray-600 text-white px-6 py-2.5 rounded-lg shadow-sm hover:bg-gray-700 transition flex items-center gap-2 font-bold"><RefreshCcw size={18} /> Đặt lại</button>
        </div>
      </div>

      {/* --- BẢNG DỮ LIỆU --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8 min-h-[400px] relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center backdrop-blur-[1px]">
            <div className="flex flex-col items-center gap-2"><Loader2 className="w-8 h-8 text-blue-600 animate-spin" /><span className="font-semibold text-gray-600">Đang tải dữ liệu...</span></div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#E11D48] text-white text-sm font-bold uppercase tracking-wide">
                <th className="px-4 py-4 whitespace-nowrap">STT</th>
                <th className="px-4 py-4 whitespace-nowrap">MÃ PHIẾU</th>
                <th className="px-4 py-4 whitespace-nowrap">NGÀY NHẬP</th>
                <th className="px-4 py-4 whitespace-nowrap">SỐ LƯỢNG SẢN PHẨM</th>
                <th className="px-4 py-4 whitespace-nowrap">TỔNG GIÁ TRỊ</th>
                <th className="px-4 py-4 whitespace-nowrap">THAO TÁC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700 font-medium">
              {!isLoading && paginatedReceipts.length > 0 ? (
                paginatedReceipts.map((receipt, index) => (
                  <tr key={receipt.id} className="hover:bg-red-50/50 transition-colors">
                    <td className="px-4 py-5 text-blue-600">{startIndex + index + 1}</td>
                    <td className="px-4 py-5 font-bold text-[#E11D48]">{receipt.code}</td>
                    <td className="px-4 py-5">{formatDateDisplay(receipt.importDate)}</td>
                    <td className="px-4 py-5">
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-gray-900">{receipt.totalQuantity} sản phẩm</span>
                        <span className="text-gray-400 text-xs mt-0.5">{receipt.totalDistinct} mặt hàng</span>
                      </div>
                    </td>
                    <td className="px-4 py-5 font-bold text-[#16A34A]">{formatPrice(receipt.totalValue)}</td>
                    <td className="px-4 py-5">
                      <button onClick={() => handleOpenView(receipt)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded shadow-sm transition font-semibold inline-flex items-center gap-1.5"><Eye size={16} /> Xem</button>
                    </td>
                  </tr>
                ))
              ) : (
                !isLoading && <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500">Không tìm thấy phiếu nhập nào.</td></tr>
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