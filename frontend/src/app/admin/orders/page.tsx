"use client";

import { useState, useEffect } from "react";
import { Search, RefreshCcw, CheckCircle2, Clock, XCircle, Eye, ChevronLeft, ChevronRight, X, Loader2, Truck, Package, ArrowLeft,Save } from "lucide-react";
import Image from "next/image";

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
  const [statusUpdateValue, setStatusUpdateValue] = useState("");

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

  // HÀM CẬP NHẬT TRẠNG THÁI (Trong Modal Chi tiết)
  const handleUpdateStatus = async () => {
    if (!statusUpdateValue || !selectedOrder) return;
    
    if (statusUpdateValue === 'cancelled') {
      if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedOrder.id, status: statusUpdateValue })
      });
      const result = await response.json();
      
      if (result.success) {
        showToast(result.message, "success");
        setSelectedOrder({...selectedOrder, status: statusUpdateValue});
        fetchOrders(); 
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
  
  const handleOpenDetails = (order: any) => { 
    setSelectedOrder(order); 
    setStatusUpdateValue(order.status); 
    setIsModalOpen(true); 
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + " đ";
  
  const formatDateDisplay = (isoDate: string) => {
    if(!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
  };

  const renderStatusBadge = (status: string, forModal: boolean = false) => {
    const baseClass = forModal 
      ? "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-sm font-bold" 
      : "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold tracking-wide";
      
    switch (status) {
      case 'unpaid': return <span className={`${baseClass} border-orange-400 text-orange-600 bg-orange-50`}><Clock size={forModal ? 16 : 14} /> Chưa thanh toán</span>;
      case 'paid': return <span className={`${baseClass} border-blue-400 text-blue-600 bg-blue-50`}><CheckCircle2 size={forModal ? 16 : 14} /> Đã thanh toán</span>;
      case 'processing': return <span className={`${baseClass} border-yellow-400 text-yellow-600 bg-yellow-50`}><Package size={forModal ? 16 : 14} /> Đang xử lý</span>;
      case 'delivering': return <span className={`${baseClass} border-indigo-400 text-indigo-600 bg-indigo-50`}><Truck size={forModal ? 16 : 14} /> Đang giao</span>;
      case 'delivered': return <span className={`${baseClass} border-green-500 text-green-600 bg-green-50`}><CheckCircle2 size={forModal ? 16 : 14} /> Đã giao</span>;
      case 'cancelled': return <span className={`${baseClass} border-red-500 text-red-600 bg-red-50`}><XCircle size={forModal ? 16 : 14} /> Đã hủy</span>;
      default: return null;
    }
  };

  return (
    <div className="relative min-h-[80vh] font-sans pb-10 bg-gray-50">
      
      {/* THÔNG BÁO TOAST */}
      {toastMsg && (
        <div className={`fixed top-6 right-6 bg-white border-l-4 shadow-xl px-6 py-4 rounded-lg flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 ${toastType === 'success' ? 'border-green-500' : 'border-red-500'}`}>
          {toastType === 'success' ? <CheckCircle2 className="text-green-500" size={24} /> : <XCircle className="text-red-500" size={24} />}
          <span className="font-medium text-gray-800">{toastMsg}</span>
        </div>
      )}

      {/* =============================================================== */}
      {/* MODAL CHI TIẾT ĐƠN HÀNG (THIẾT KẾ MỚI MÀU XANH DƯƠNG ĐỒNG BỘ) */}
      {/* =============================================================== */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-500/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl my-8 animate-in zoom-in-95 overflow-hidden">
            
            {/* Header: Chi tiết đơn hàng */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
              <h2 className="text-lg font-bold text-blue-600">Chi tiết đơn hàng</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition p-1"><X size={24} /></button>
            </div>

            {/* Header: Thông tin đơn hàng #Mã */}
            <div className="bg-blue-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white">Thông tin đơn hàng {selectedOrder.orderCode}</h3>
            </div>

            <div className="p-8 space-y-8 bg-white">
              
              {/* BLOCK 1: THÔNG TIN KHÁCH HÀNG */}
              <div>
                <h4 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">Thông tin khách hàng</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div><p className="text-gray-500 mb-1">Họ và tên</p><p className="font-bold text-gray-900 text-base">{selectedOrder.customerName}</p></div>
                  <div><p className="text-gray-500 mb-1">Số điện thoại</p><p className="font-bold text-gray-900 text-base">{selectedOrder.phone}</p></div>
                  <div><p className="text-gray-500 mb-1">Email</p><p className="font-bold text-gray-900 text-base">{selectedOrder.email || "Chưa cập nhật"}</p></div>
                  <div className="md:col-span-3"><p className="text-gray-500 mb-1">Địa chỉ</p><p className="font-bold text-gray-900 text-base">{selectedOrder.address || "Chưa cập nhật địa chỉ giao hàng"}</p></div>
                </div>
              </div>

              {/* BLOCK 2: THÔNG TIN ĐƠN HÀNG */}
              <div>
                <h4 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">Thông tin đơn hàng</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm items-center">
                  <div><p className="text-gray-500 mb-1">Mã đơn hàng</p><p className="font-bold text-gray-900 text-base">{selectedOrder.orderCode}</p></div>
                  <div><p className="text-gray-500 mb-1">Ngày đặt hàng</p><p className="font-bold text-gray-900 text-base">{formatDateDisplay(selectedOrder.orderDate)} {selectedOrder.orderTime}</p></div>
                  <div><p className="text-gray-500 mb-1">Phương thức thanh toán</p><p className="font-bold text-gray-900 text-base">{selectedOrder.paymentMethod}</p></div>
                  <div><p className="text-gray-500 mb-1">Trạng thái</p><div>{renderStatusBadge(selectedOrder.status, true)}</div></div>
                </div>
              </div>

              {/* BLOCK 3: CẬP NHẬT TRẠNG THÁI */}
              <div>
                <h4 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">Cập nhật trạng thái</h4>
                <div className="flex flex-col gap-4">
                  <div className="w-full md:w-1/3">
                    <label className="block text-sm text-gray-500 mb-2">Chọn trạng thái mới</label>
                    <select 
                      value={statusUpdateValue} 
                      onChange={(e) => setStatusUpdateValue(e.target.value)} 
                      className="w-full border border-gray-300 rounded px-4 py-2.5 outline-none focus:border-blue-500 bg-white"
                    >
                      <option value="unpaid">Chưa thanh toán</option>
                      <option value="paid">Đã thanh toán</option>
                      <option value="processing">Đang xử lý</option>
                      <option value="delivering">Đang giao</option>
                      <option value="delivered">Đã giao</option>
                      <option value="cancelled">Đã hủy</option>
                    </select>
                  </div>
                  <div>
                    <button onClick={handleUpdateStatus} className="bg-[#22C55E] hover:bg-[#16A34A] text-white px-5 py-2.5 rounded shadow-sm font-semibold text-sm transition flex items-center gap-2">
                       <Save size={18} /> Cập nhật trạng thái
                    </button>
                  </div>
                </div>
              </div>

              {/* BLOCK 4: DANH SÁCH SẢN PHẨM */}
              <div>
                <h4 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">Danh sách sản phẩm</h4>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-center text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-700">
                        <th className="px-4 py-3 font-bold uppercase">STT</th>
                        <th className="px-4 py-3 font-bold uppercase text-left">Tên sản phẩm</th>
                        <th className="px-4 py-3 font-bold uppercase">Số lượng</th>
                        <th className="px-4 py-3 font-bold uppercase">Đơn giá</th>
                        <th className="px-4 py-3 font-bold uppercase text-right">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {selectedOrder.items && selectedOrder.items.length > 0 ? (
                        selectedOrder.items.map((item: any, idx: number) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-4 py-4">{idx + 1}</td>
                            <td className="px-4 py-4 text-left font-medium text-gray-800">
                               <div className="flex items-center gap-3">
                                  {item.image && <div className="relative w-10 h-10 border rounded flex-shrink-0"><Image src={item.image} alt="shoes" fill className="object-cover rounded" /></div>}
                                  <span>{item.name || "Sản phẩm giày"}</span>
                               </div>
                            </td>
                            <td className="px-4 py-4">{item.quantity || 1}</td>
                            <td className="px-4 py-4">{formatPrice(item.price || selectedOrder.totalAmount)}</td>
                            <td className="px-4 py-4 font-bold text-red-500 text-right">{formatPrice(item.total || selectedOrder.totalAmount)}</td>
                          </tr>
                        ))
                      ) : (
                         <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-gray-500 italic">
                               Đơn hàng này chưa có dữ liệu chi tiết sản phẩm trong hệ thống (Dữ liệu mẫu).
                            </td>
                         </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* BLOCK 5: TỔNG KẾT & NÚT QUAY VỀ */}
              <div className="flex flex-col items-end pt-4">
                <div className="w-full md:w-[400px] bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4 text-sm mb-6">
                  <div className="flex justify-between text-gray-600"><span className="font-semibold">Tổng số lượng:</span><span>{selectedOrder.totalProducts || 1}</span></div>
                  <div className="flex justify-between border-t border-gray-300 pt-4 text-base items-center">
                    <span className="font-bold text-gray-900 text-lg">Tổng tiền hàng:</span>
                    <span className="font-bold text-blue-600 text-xl">{formatPrice(selectedOrder.totalAmount)}</span>
                  </div>
                </div>
                
                <button onClick={() => setIsModalOpen(false)} className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2.5 rounded shadow-sm font-semibold transition flex items-center gap-2">
                  <ArrowLeft size={18} /> Quay về
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
      {/* =============================================================== */}


      {/* GIAO DIỆN TRANG CHÍNH */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 mt-6 mx-6">
        <h1 className="text-xl font-bold text-blue-600 uppercase">Quản lý đơn hàng</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 mx-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div><label className="block text-sm font-semibold text-gray-900 mb-2">Từ ngày</label><input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full border-2 border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 outline-none shadow-sm transition-all" /></div>
          <div><label className="block text-sm font-semibold text-gray-900 mb-2">Đến ngày</label><input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full border-2 border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 outline-none shadow-sm transition-all" /></div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Tình trạng đơn hàng</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full border-2 border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 outline-none shadow-sm transition-all bg-white font-medium">
              <option value="all">Tất cả trạng thái</option>
              <option value="unpaid">Chưa thanh toán</option>
              <option value="paid">Đã thanh toán</option>
              <option value="processing">Đang xử lý</option>
              <option value="delivering">Đang giao</option>
              <option value="delivered">Đã giao</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleSearchClick} className="bg-[#22C55E] text-white px-6 py-2.5 rounded-lg shadow-sm hover:bg-[#16A34A] transition flex items-center gap-2 font-bold"><Search size={18} /> Tìm kiếm</button>
          <button onClick={handleResetFilters} className="bg-gray-600 text-white px-6 py-2.5 rounded-lg shadow-sm hover:bg-gray-700 transition flex items-center gap-2 font-bold"><RefreshCcw size={18} /> Đặt lại</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8 min-h-[400px] relative mx-6">
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
              <tr className="bg-blue-600 text-white text-sm font-bold uppercase tracking-wide">
                <th className="px-4 py-4 whitespace-nowrap">STT</th>
                <th className="px-4 py-4 whitespace-nowrap">MÃ ĐƠN</th>
                <th className="px-4 py-4 whitespace-nowrap text-left">KHÁCH HÀNG</th>
                <th className="px-4 py-4 whitespace-nowrap">SỐ ĐIỆN THOẠI</th>
                <th className="px-4 py-4 whitespace-nowrap">NGÀY ĐẶT</th>
                <th className="px-4 py-4 whitespace-nowrap">TỔNG TIỀN</th>
                <th className="px-4 py-4 whitespace-nowrap">THANH TOÁN</th>
                <th className="px-4 py-4 whitespace-nowrap">TRẠNG THÁI</th>
                <th className="px-4 py-4 whitespace-nowrap">CHI TIẾT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {!isLoading && paginatedOrders.length > 0 ? (
                paginatedOrders.map((order, index) => (
                  <tr key={order.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-4 py-5">{startIndex + index + 1}</td>
                    <td className="px-4 py-5 font-bold text-gray-800">{order.orderCode}</td>
                    <td className="px-4 py-5 text-left">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-base">{order.customerName}</span>
                        <span className="text-gray-500 text-xs font-medium mt-0.5">{order.totalProducts} sản phẩm</span>
                      </div>
                    </td>
                    <td className="px-4 py-5 font-medium">{order.phone}</td>
                    <td className="px-4 py-5 text-gray-600">{formatDateDisplay(order.orderDate)} {order.orderTime}</td>
                    <td className="px-4 py-5 font-bold text-red-500">{formatPrice(order.totalAmount)}</td>
                    <td className="px-4 py-5 font-semibold text-gray-800">{order.paymentMethod}</td>
                    <td className="px-4 py-5">{renderStatusBadge(order.status)}</td>
                    
                    <td className="px-4 py-5">
                      <div className="flex justify-center items-center">
                        <button onClick={() => handleOpenDetails(order)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded shadow-sm transition font-semibold inline-flex items-center gap-1.5" title="Xem chi tiết">
                          <Eye size={16} /> Xem
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                !isLoading && <tr><td colSpan={9} className="px-4 py-12 text-center text-gray-500 font-medium">Không tìm thấy đơn hàng nào.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pb-6">
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