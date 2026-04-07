"use client";

import { useState, useEffect } from "react";
import { Search, RefreshCcw, CheckCircle2, Clock, XCircle, Eye, ChevronLeft, ChevronRight, X, Loader2, Truck } from "lucide-react";

const ORDERS_PER_PAGE = 5;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [appliedFilters, setAppliedFilters] = useState({
    fromDate: "", toDate: "", status: "all"
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  
  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToastMsg(msg); setToastType(type); setTimeout(() => setToastMsg(""), 3000);
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        fromDate: appliedFilters.fromDate,
        toDate: appliedFilters.toDate,
        status: appliedFilters.status
      }).toString();

      const response = await fetch(`/api/orders?${query}`);
      const result = await response.json();

      if (result.success) setOrders(result.data);
    } catch (error) {
      showToast("Lỗi kết nối máy chủ!", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    setCurrentPage(1);
  }, [appliedFilters]);

  // ==========================================
  // HÀM MỚI: XỬ LÝ CHUYỂN GIAI ĐOẠN / HỦY ĐƠN (Theo Barem điểm)
  // ==========================================
  const handleUpdateStatus = async (id: number, newStatus: string) => {
    if (newStatus === 'cancelled') {
      if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không? Hành động này không thể hoàn tác.")) return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      const result = await response.json();
      
      if (result.success) {
        showToast(result.message, "success");
        fetchOrders(); // Tải lại bảng dữ liệu để cập nhật trạng thái mới
      } else {
        showToast(result.message, "error");
      }
    } catch (error) {
      showToast("Lỗi khi cập nhật trạng thái!", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
  const paginatedOrders = orders.slice(startIndex, startIndex + ORDERS_PER_PAGE);

  const handleSearchClick = () => setAppliedFilters({ fromDate, toDate, status: filterStatus });
  const handleResetFilters = () => {
    setFromDate(""); setToDate(""); setFilterStatus("all");
    setAppliedFilters({ fromDate: "", toDate: "", status: "all" });
  };
  const handleOpenDetails = (order: any) => { setSelectedOrder(order); setIsModalOpen(true); };

  const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + " đ";
  const formatDateDisplay = (isoDate: string) => {
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered': return <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-green-500 text-green-600 bg-green-50 text-xs font-bold tracking-wide"><CheckCircle2 size={14} /> Đã giao</span>;
      case 'pending': return <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-orange-400 text-orange-500 bg-orange-50 text-xs font-bold tracking-wide"><Clock size={14} /> Chờ xử lý</span>;
      case 'cancelled': return <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-500 text-red-600 bg-red-50 text-xs font-bold tracking-wide"><XCircle size={14} /> Đã hủy</span>;
      default: return null;
    }
  };

  return (
    <div className="relative min-h-[80vh] font-sans pb-10">
      
      {/* THÔNG BÁO TOAST */}
      {toastMsg && (
        <div className={`fixed top-6 right-6 bg-white border-l-4 shadow-xl px-6 py-4 rounded-lg flex items-center gap-3 z-[60] animate-in slide-in-from-right-8 ${toastType === 'success' ? 'border-green-500' : 'border-red-500'}`}>
          {toastType === 'success' ? <CheckCircle2 className="text-green-500" size={24} /> : <XCircle className="text-red-500" size={24} />}
          <span className="font-medium text-gray-800">{toastMsg}</span>
        </div>
      )}

      {/* MODAL CHI TIẾT ĐƠN HÀNG (GIỮ NGUYÊN) */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-500/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95">
            <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-bold text-blue-600 uppercase tracking-wide">Chi tiết đơn hàng {selectedOrder.orderCode}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition p-1 bg-white rounded-full hover:bg-red-50"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4 text-sm text-gray-800">
              <div className="flex justify-between border-b border-gray-100 pb-3"><span className="font-semibold text-gray-500">Khách hàng:</span><span className="font-bold">{selectedOrder.customerName}</span></div>
              <div className="flex justify-between border-b border-gray-100 pb-3"><span className="font-semibold text-gray-500">Số điện thoại:</span><span className="font-medium">{selectedOrder.phone}</span></div>
              <div className="flex justify-between border-b border-gray-100 pb-3"><span className="font-semibold text-gray-500">Thời gian đặt:</span><span className="font-medium">{formatDateDisplay(selectedOrder.orderDate)} - {selectedOrder.orderTime}</span></div>
              <div className="flex justify-between border-b border-gray-100 pb-3"><span className="font-semibold text-gray-500">Thanh toán:</span><span className="font-bold text-blue-600">{selectedOrder.paymentMethod}</span></div>
              <div className="flex justify-between border-b border-gray-100 pb-3 items-center"><span className="font-semibold text-gray-500">Trạng thái:</span>{renderStatusBadge(selectedOrder.status)}</div>
              <div className="flex justify-between pt-3 text-lg items-center"><span className="font-bold text-gray-900">Tổng tiền:</span><span className="font-bold text-red-500">{formatPrice(selectedOrder.totalAmount)}</span></div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 bg-white border-2 border-gray-200 hover:bg-gray-100 text-gray-700 rounded-lg font-bold transition shadow-sm">Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* TIÊU ĐỀ */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <h1 className="text-xl font-bold text-blue-600 uppercase">Quản lý & Xử lý đơn hàng</h1>
      </div>

      {/* BỘ LỌC */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div><label className="block text-sm font-semibold text-gray-900 mb-2">Từ ngày</label><input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full border-2 border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm transition-all" /></div>
          <div><label className="block text-sm font-semibold text-gray-900 mb-2">Đến ngày</label><input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full border-2 border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm transition-all" /></div>
          <div><label className="block text-sm font-semibold text-gray-900 mb-2">Tình trạng đơn hàng</label><select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full border-2 border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm transition-all bg-white font-medium"><option value="all">Tất cả trạng thái</option><option value="pending">Chờ xử lý</option><option value="delivered">Đã giao hàng</option><option value="cancelled">Đã hủy</option></select></div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleSearchClick} className="bg-[#22C55E] text-white px-6 py-2.5 rounded-lg shadow-sm hover:bg-[#16A34A] transition flex items-center gap-2 font-bold"><Search size={18} /> Tìm kiếm</button>
          <button onClick={handleResetFilters} className="bg-gray-600 text-white px-6 py-2.5 rounded-lg shadow-sm hover:bg-gray-700 transition flex items-center gap-2 font-bold"><RefreshCcw size={18} /> Đặt lại</button>
        </div>
      </div>

      {/* BẢNG DỮ LIỆU ĐƠN HÀNG */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8 min-h-[400px] relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center backdrop-blur-[1px]">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <span className="font-semibold text-gray-600">Đang tải dữ liệu...</span>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white text-sm font-semibold uppercase tracking-wide">
                <th className="px-4 py-4 whitespace-nowrap">STT</th>
                <th className="px-4 py-4 whitespace-nowrap">MÃ ĐƠN</th>
                <th className="px-4 py-4 whitespace-nowrap text-left">KHÁCH HÀNG</th>
                <th className="px-4 py-4 whitespace-nowrap">SỐ ĐIỆN THOẠI</th>
                <th className="px-4 py-4 whitespace-nowrap">TỔNG TIỀN</th>
                <th className="px-4 py-4 whitespace-nowrap">THANH TOÁN</th>
                <th className="px-4 py-4 whitespace-nowrap">TRẠNG THÁI</th>
                <th className="px-4 py-4 whitespace-nowrap">THAO TÁC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {!isLoading && paginatedOrders.length > 0 ? (
                paginatedOrders.map((order, index) => (
                  <tr key={order.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-4 py-5">{startIndex + index + 1}</td>
                    <td className="px-4 py-5 font-bold text-blue-700">{order.orderCode}</td>
                    <td className="px-4 py-5 text-left">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-base">{order.customerName}</span>
                        <span className="text-gray-500 text-xs font-medium mt-0.5">{order.totalProducts} sản phẩm</span>
                      </div>
                    </td>
                    <td className="px-4 py-5 font-medium">{order.phone}</td>
                    <td className="px-4 py-5 font-bold text-red-500">{formatPrice(order.totalAmount)}</td>
                    <td className="px-4 py-5 font-semibold text-gray-800">{order.paymentMethod}</td>
                    <td className="px-4 py-5">{renderStatusBadge(order.status)}</td>
                    
                    {/* CỘT THAO TÁC MỚI */}
                    <td className="px-4 py-5">
                      <div className="flex justify-center items-center gap-2">
                        {/* Nút Xem (Luôn hiện) */}
                        <button onClick={() => handleOpenDetails(order)} className="bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg shadow-sm transition font-semibold inline-flex items-center gap-1.5" title="Xem chi tiết">
                          <Eye size={16} /> Xem
                        </button>

                        {/* Nút Giao Hàng & Hủy Đơn (Chỉ hiện khi đơn đang Chờ xử lý) */}
                        {order.status === 'pending' && (
                          <>
                            <button onClick={() => handleUpdateStatus(order.id, 'delivered')} className="bg-[#22C55E] hover:bg-[#16A34A] text-white px-3 py-1.5 rounded-lg shadow-sm transition font-semibold inline-flex items-center gap-1.5" title="Xác nhận & Giao hàng">
                              <Truck size={16} /> Giao
                            </button>
                            <button onClick={() => handleUpdateStatus(order.id, 'cancelled')} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg shadow-sm transition font-semibold inline-flex items-center gap-1.5" title="Hủy đơn hàng này">
                              <XCircle size={16} /> Hủy
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                !isLoading && <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-500 font-medium">Không tìm thấy đơn hàng nào.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PHÂN TRANG */}
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