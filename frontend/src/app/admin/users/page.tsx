"use client";

import { useState, useEffect } from "react";
import { Plus, Search, CheckCircle2, Lock, ChevronLeft, ChevronRight, X, ArrowLeft, Edit, ShieldAlert, UserCog, User, Loader2 } from "lucide-react";

const USERS_PER_PAGE = 5;

export default function AdminUsersPage() {
  // 1. STATE DỮ LIỆU & LOADING (Mới)
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 2. STATES TÌM KIẾM (UI)
  const [searchName, setSearchName] = useState("");
  const [searchAccount, setSearchAccount] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");

  // 3. STATE LƯU BỘ LỌC CHÍNH THỨC
  const [appliedFilters, setAppliedFilters] = useState({
    name: "", account: "", status: "all", role: "all"
  });

  // 4. STATES PHÂN TRANG & MODAL
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentUser, setCurrentUser] = useState({ 
    id: 0, fullName: "", account: "", phone: "", city: "", ward: "", street: "", password: "", confirmPassword: "", role: "customer", status: "active"
  });

  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToastMsg(msg); setToastType(type); setTimeout(() => setToastMsg(""), 3000);
  };

  // ==========================================
  // HÀM GỌI API ĐỂ LẤY DỮ LIỆU
  // ==========================================
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Gọi API kèm theo các tham số (query string)
      const query = new URLSearchParams({
        name: appliedFilters.name,
        account: appliedFilters.account,
        role: appliedFilters.role,
        status: appliedFilters.status
      }).toString();

      const response = await fetch(`/api/users?${query}`);
      const result = await response.json();

      if (result.success) {
        setUsers(result.data); // Nhận dữ liệu từ Backend
      }
    } catch (error) {
      showToast("Lỗi kết nối máy chủ!", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Chạy hàm lấy dữ liệu mỗi khi bộ lọc chính thức (appliedFilters) thay đổi
  useEffect(() => {
    fetchUsers();
    setCurrentPage(1); // Reset về trang 1
  }, [appliedFilters]);


  // HÀM XỬ LÝ KHI BẤM NÚT TÌM KIẾM
  const handleSearchClick = () => {
    setAppliedFilters({
      name: searchName, account: searchAccount, status: filterStatus, role: filterRole
    });
  };

  // LOGIC PHÂN TRANG (Client-side cho nhẹ vì dữ liệu trả về đã được lọc)
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  // ==========================================
  // HÀM GỌI API ĐỂ THÊM NGƯỜI DÙNG
  // ==========================================
  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();

   
    if (modalMode === "add") {
      try {
        const payload = {
          fullName: currentUser.fullName, account: currentUser.account, phone: currentUser.phone,
          street: currentUser.street, ward: currentUser.ward, city: currentUser.city,
          role: currentUser.role, status: currentUser.status
        };

        // GỌI API POST ĐỂ LƯU
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (result.success) {
          showToast(result.message, "success");
          fetchUsers(); // TẢI LẠI DANH SÁCH MỚI NHẤT TỪ SERVER
        }
      } catch (error) {
        showToast("Lỗi khi thêm người dùng!", "error");
      }
    } else {
      // Chỉnh sửa (Tạm thời bỏ qua phần API Edit, vẫn sửa tạm trên Frontend)
      setUsers(users.map(u => u.id === currentUser.id ? { ...u, ...currentUser } : u));
      showToast("Đã cập nhật thông tin thành công!", "success");
    }
    
    setIsModalOpen(false);
  };

  const toggleStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "locked" : "active";
    setUsers(users.map(user => user.id === id ? { ...user, status: newStatus } : user));
    showToast(newStatus === "locked" ? "Đã khóa tài khoản!" : "Đã mở khóa tài khoản!", "success");
  };

  const handleOpenAdd = () => {
    setModalMode("add");
    setCurrentUser({ id: 0, fullName: "", account: "", phone: "", city: "", ward: "", street: "", password: "", confirmPassword: "", role: "customer", status: "active" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: any) => {
    setModalMode("edit");
    setCurrentUser({ ...user, password: "", confirmPassword: "" });
    setIsModalOpen(true);
  };

  const renderRoleBadge = (role: string) => {
    switch (role) {
      case 'admin': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-purple-100 text-purple-700 text-xs font-bold tracking-wide"><ShieldAlert size={12} /> Quản trị viên</span>;
      case 'staff': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold tracking-wide"><UserCog size={12} /> Nhân viên</span>;
      default: return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-gray-100 text-gray-700 text-xs font-bold tracking-wide"><User size={12} /> Khách hàng</span>;
    }
  };

  return (
    <div className="relative min-h-[80vh] font-sans pb-10">
      
      {/* THÔNG BÁO TOAST */}
      {toastMsg && (
        <div className={`fixed top-6 right-6 bg-white border-l-4 shadow-xl px-6 py-4 rounded-lg flex items-center gap-3 z-[60] animate-in slide-in-from-right-8 ${toastType === 'success' ? 'border-green-500' : 'border-red-500'}`}>
          {toastType === 'success' ? <CheckCircle2 className="text-green-500" size={24} /> : <X className="text-red-500" size={24} />}
          <span className="font-medium text-gray-800">{toastMsg}</span>
        </div>
      )}

      {/* ================= MODAL THÊM / SỬA ================= (GIỮ NGUYÊN) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-4xl my-8 flex flex-col gap-4 animate-in zoom-in-95">
            <div className="bg-white rounded-xl shadow-sm px-6 py-4 border border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-blue-600 border-l-4 border-blue-600 pl-3">
                {modalMode === "add" ? "Thêm tài khoản người dùng" : "Chỉnh sửa thông tin"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full"><X size={24} /></button>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              <form onSubmit={handleSaveUser} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* ... CÁC INPUT FORM ĐƯỢC GIỮ NGUYÊN ... */}
                  <div><label className="block text-sm font-semibold text-gray-800 mb-2">Họ tên <span className="text-red-500">*</span></label><input required type="text" value={currentUser.fullName} onChange={(e) => setCurrentUser({...currentUser, fullName: e.target.value})} className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" /></div>
                  <div><label className="block text-sm font-semibold text-gray-800 mb-2">Email <span className="text-red-500">*</span></label><input required type="email" value={currentUser.account} onChange={(e) => setCurrentUser({...currentUser, account: e.target.value})} className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" /></div>
                  <div><label className="block text-sm font-semibold text-gray-800 mb-2">Số điện thoại <span className="text-red-500">*</span></label><input required type="tel" value={currentUser.phone} onChange={(e) => setCurrentUser({...currentUser, phone: e.target.value})} className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" /></div>
                  <div><label className="block text-sm font-semibold text-gray-800 mb-2">Tỉnh/Thành phố <span className="text-red-500">*</span></label><select required value={currentUser.city} onChange={(e) => setCurrentUser({...currentUser, city: e.target.value})} className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-white"><option value="">Chọn tỉnh/thành phố</option><option value="TP.HCM">Hồ Chí Minh</option><option value="Hà Nội">Hà Nội</option><option value="Đà Nẵng">Đà Nẵng</option><option value="Cần Thơ">Cần Thơ</option></select></div>
                  <div className="md:col-span-2"><div className="grid grid-cols-1 md:grid-cols-2 gap-x-8"><div><label className="block text-sm font-semibold text-gray-800 mb-2">Phường/Xã <span className="text-red-500">*</span></label><select required value={currentUser.ward} onChange={(e) => setCurrentUser({...currentUser, ward: e.target.value})} className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-white"><option value="">Chọn phường/xã</option><option value="Phường 1">Phường 1</option><option value="Phường Bến Nghé">Phường Bến Nghé</option><option value="Phường Quang Trung">Phường Quang Trung</option><option value="Phường Nam Dương">Phường Nam Dương</option><option value="Phường Hưng Lợi">Phường Hưng Lợi</option><option value="Phường 14">Phường 14</option></select></div><div><label className="block text-sm font-semibold text-gray-800 mb-2">Số nhà (Địa chỉ chi tiết) <span className="text-red-500">*</span></label><input required type="text" value={currentUser.street} onChange={(e) => setCurrentUser({...currentUser, street: e.target.value})} className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" /></div></div></div>
                  <div><label className="block text-sm font-semibold text-gray-800 mb-2">Vai trò <span className="text-red-500">*</span></label><select required value={currentUser.role} onChange={(e) => setCurrentUser({...currentUser, role: e.target.value})} className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-white font-medium"><option value="customer">Khách hàng</option><option value="staff">Nhân viên</option><option value="admin">Quản trị viên</option></select></div>
                  <div><label className="block text-sm font-semibold text-gray-800 mb-2">Trạng thái <span className="text-red-500">*</span></label><select required value={currentUser.status} onChange={(e) => setCurrentUser({...currentUser, status: e.target.value})} className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-white font-medium"><option value="active">🟢 Hoạt động</option><option value="locked">🔴 Bị khóa</option></select></div>
                  <div><label className="block text-sm font-semibold text-gray-800 mb-2">Mật khẩu {modalMode === "edit" && <span className="text-gray-400 font-normal text-xs ml-1">(Để trống nếu không đổi)</span>}{modalMode === "add" && <span className="text-red-500">*</span>}</label><input required={modalMode === "add"} type="password" placeholder={modalMode === "edit" ? "********" : ""} value={currentUser.password} onChange={(e) => setCurrentUser({...currentUser, password: e.target.value})} className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" /></div>
                  <div><label className="block text-sm font-semibold text-gray-800 mb-2">Xác nhận mật khẩu{modalMode === "add" && <span className="text-red-500">*</span>}</label><input required={modalMode === "add"} type="password" placeholder={modalMode === "edit" ? "********" : ""} value={currentUser.confirmPassword} onChange={(e) => setCurrentUser({...currentUser, confirmPassword: e.target.value})} className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" /></div> 
                </div>
                <div className="pt-8 flex justify-end gap-4 border-t border-gray-100 mt-8">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md font-semibold transition flex items-center gap-2"><ArrowLeft size={18} /> Quay về</button>
                  <button type="submit" className="px-8 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition flex items-center gap-2">{modalMode === "add" ? <Plus size={18} /> : <CheckCircle2 size={18} />}{modalMode === "add" ? "Thêm tài khoản" : "Lưu thay đổi"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* --- TIÊU ĐỀ & NÚT THÊM --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Quản lý người dùng</h1>
        <button onClick={handleOpenAdd} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition flex items-center gap-2 font-medium"><Plus size={18} /> Thêm tài khoản</button>
      </div>

      {/* --- BỘ LỌC TÌM KIẾM --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div><label className="block text-sm font-semibold text-gray-900 mb-1.5">Tìm theo họ tên</label><input type="text" placeholder="Nhập họ tên..." value={searchName} onChange={(e) => setSearchName(e.target.value)} className="w-full border-2 border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm transition-all" /></div>
          <div><label className="block text-sm font-semibold text-gray-900 mb-1.5">Tìm theo tài khoản</label><input type="text" placeholder="Nhập email..." value={searchAccount} onChange={(e) => setSearchAccount(e.target.value)} className="w-full border-2 border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm transition-all" /></div>
          <div><label className="block text-sm font-semibold text-gray-900 mb-1.5">Vai trò</label><select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="w-full border-2 border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm transition-all bg-white font-medium"><option value="all">Tất cả vai trò</option><option value="customer">Khách hàng</option><option value="staff">Nhân viên</option><option value="admin">Quản trị viên</option></select></div>
          <div><label className="block text-sm font-semibold text-gray-900 mb-1.5">Trạng thái</label><select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full border-2 border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm transition-all bg-white font-medium"><option value="all">Tất cả trạng thái</option><option value="active">Hoạt động</option><option value="locked">Bị khóa</option></select></div>
          <div><button onClick={handleSearchClick} className="bg-[#22C55E] text-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-[#16A34A] transition flex items-center justify-center gap-2 font-bold w-full md:w-auto"><Search size={18} /> Tìm kiếm</button></div>
        </div>
      </div>

      {/* --- BẢNG DỮ LIỆU CÓ HIỆU ỨNG LOADING --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8 min-h-[400px] relative">
        
        {/* HIỆU ỨNG LOADING (SPINNER) KHI GỌI MẠNG */}
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
                <th className="px-4 py-4 whitespace-nowrap">HỌ VÀ TÊN</th>
                <th className="px-4 py-4 whitespace-nowrap">TÀI KHOẢN</th>
                <th className="px-4 py-4 whitespace-nowrap">SỐ ĐIỆN THOẠI</th>
                <th className="px-4 py-4 whitespace-nowrap max-w-[200px]">ĐỊA CHỈ</th>
                <th className="px-4 py-4 whitespace-nowrap">VAI TRÒ</th>
                <th className="px-4 py-4 whitespace-nowrap">TRẠNG THÁI</th>
                <th className="px-4 py-4 whitespace-nowrap">THAO TÁC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {!isLoading && paginatedUsers.length > 0 ? (
                paginatedUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-4 py-4">{startIndex + index + 1}</td>
                    <td className="px-4 py-4 font-semibold text-gray-900">{user.fullName}</td>
                    <td className="px-4 py-4">{user.account}</td>
                    <td className="px-4 py-4">{user.phone}</td>
                    <td className="px-4 py-4 text-left max-w-[200px] truncate" title={`${user.street}, ${user.ward}, ${user.city}`}>
                      {user.street}, {user.ward}, {user.city}
                    </td>
                    <td className="px-4 py-4">{renderRoleBadge(user.role)}</td>
                    <td className="px-4 py-4">
                      {user.status === "active" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-green-50 text-green-700 border border-green-200 text-xs font-bold tracking-wide"><CheckCircle2 size={12} />Hoạt động</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-gray-100 text-gray-600 border border-gray-200 text-xs font-bold tracking-wide"><Lock size={12} />Đã khóa</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center items-center gap-2">
                        <button onClick={() => handleOpenEdit(user)} className="px-3 py-1.5 rounded-lg text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-100 transition flex items-center gap-1 font-semibold" title="Sửa thông tin">
                          <Edit size={16} /> Sửa
                        </button>
                        <button onClick={() => toggleStatus(user.id, user.status)} className={`px-3 py-1.5 rounded-lg text-white shadow-sm transition font-semibold min-w-[90px] ${user.status === "active" ? "bg-red-500 hover:bg-red-600" : "bg-gray-500 hover:bg-gray-600"}`}>
                          {user.status === "active" ? "Khóa" : "Mở khóa"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                !isLoading && <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-500">Không tìm thấy người dùng nào.</td></tr>
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