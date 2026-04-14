"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Search, CheckCircle2, Lock, ChevronLeft, ChevronRight, X, ArrowLeft, Edit, UserCog, User, Loader2 } from "lucide-react";

const USERS_PER_PAGE = 5;
const API_BASE_URL = "http://localhost:8080";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchAccount, setSearchAccount] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("customer");

  const [appliedFilters, setAppliedFilters] = useState({
    name: "", account: "", status: "all", role: "customer"
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentUser, setCurrentUser] = useState({ 
    id: 0, fullName: "", email: "", phone: "", city: "", address: "", password: "", role: "customer", status: 1, dateOfBirth: "", salary: 0 
  });

  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToastMsg(msg); setToastType(type); setTimeout(() => setToastMsg(""), 3000);
  };

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const isStaffTab = appliedFilters.role === "staff" || appliedFilters.role === "admin";
      const endpoint = isStaffTab ? `${API_BASE_URL}/api/employers` : `${API_BASE_URL}/api/customers`;
      const params = new URLSearchParams({ page_no: "0", page_size: "1000" }).toString();

      const response = await fetch(`${endpoint}?${params}`, {
        headers: {
          "Content-Type": "application/json",
          ...(token && token !== "null" ? { "Authorization": `Bearer ${token}` } : {})
        }
      });

      if (!response.ok) { setUsers([]); return; }
      const json = await response.json();
      if (json.code === 200 && json.result) {
        const dataList = json.result.content || json.result;
        setUsers(Array.isArray(dataList) ? dataList : []); 
      } else { setUsers([]); }
    } catch (error) { console.error("Lỗi fetch:", error); } finally { setIsLoading(false); }
  }, [appliedFilters]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleSearchClick = () => {
    setAppliedFilters({ name: searchName, account: searchAccount, status: filterStatus, role: filterRole });
    setCurrentPage(1);
  };

  const filteredData = users.filter(user => {
    const matchName = !appliedFilters.name || user.fullName?.toLowerCase().includes(appliedFilters.name.toLowerCase());
    const userEmail = (user.email || user.username || "").toLowerCase();
    const matchAccount = !appliedFilters.account || userEmail.includes(appliedFilters.account.toLowerCase());
    const matchStatus = appliedFilters.status === "all" || user.status === Number(appliedFilters.status);
    return matchName && matchAccount && matchStatus;
  });

  const totalPages = Math.ceil(filteredData.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredData.slice(startIndex, startIndex + USERS_PER_PAGE);

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const isStaff = currentUser.role === "staff" || currentUser.role === "admin";
    const endpoint = isStaff ? `${API_BASE_URL}/api/employers` : `${API_BASE_URL}/api/customers`;
    const method = modalMode === "add" ? "POST" : "PUT";
    const url = modalMode === "add" ? endpoint : `${endpoint}/${currentUser.id}`;

    const payload: any = {
      fullName: currentUser.fullName,
      email: currentUser.email,
      username: currentUser.email,
      phone: currentUser.phone,
      status: Number(currentUser.status),
      dateOfBirth: currentUser.dateOfBirth || null,
      address: currentUser.address || "",
    };

    if (modalMode === "add") payload.password = currentUser.password;
    if (isStaff) payload.salary = currentUser.salary || 0;

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        showToast(modalMode === "add" ? "Thêm thành công!" : "Cập nhật thành công!");
        fetchUsers(); setIsModalOpen(false);
      } else { showToast(result.message || "Lỗi dữ liệu", "error"); }
    } catch (error) { showToast("Lỗi kết nối!", "error"); }
  };

 const toggleStatus = async (user: any) => {
  const token = localStorage.getItem("token");
  const newStatus = user.status === 1 ? 0 : 1;
  
  // Dùng appliedFilters.role để biết chắc chắn đang ở tab nào
  const isStaff = appliedFilters.role === "staff" || appliedFilters.role === "admin";
  const endpoint = isStaff ? `${API_BASE_URL}/api/employers` : `${API_BASE_URL}/api/customers`;

  // Tạo payload sạch để gửi lên, đảm bảo không thiếu các trường bắt buộc
  const payload = { 
    ...user, 
    status: newStatus, 
    username: user.email || user.username,
    // Nếu là staff thì gửi kèm salary để tránh lỗi 400 ở Backend
    ...(isStaff && { salary: user.salary || 0 })
  };

  try {
    const response = await fetch(`${endpoint}/${user.id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      showToast(newStatus === 0 ? "Đã khóa tài khoản!" : "Đã mở khóa thành công!");
      fetchUsers();
    } else {
      const errorData = await response.json();
      showToast(errorData.message || "Không thể cập nhật trạng thái", "error");
    }
  } catch (error) { 
    showToast("Lỗi kết nối máy chủ", "error"); 
  }
};

  const handleOpenAdd = () => {
    setModalMode("add");
    setCurrentUser({ id: 0, fullName: "", email: "", phone: "", city: "", address: "", password: "", role: appliedFilters.role, status: 1, dateOfBirth: "", salary: 0 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: any) => {
    setModalMode("edit");
    setCurrentUser({ ...user, email: user.email || user.username || "", dateOfBirth: user.dateOfBirth || "", address: user.address || "", salary: user.salary || 0, role: user.role || appliedFilters.role,});
    setIsModalOpen(true);
  };

  const renderRoleBadge = (role: string) => {
    const r = role?.toLowerCase();
    if (r === 'admin' || r === 'staff' || r === 'employer') {
      return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold"><UserCog size={12} /> Nhân viên</span>;
    }
    return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-gray-100 text-gray-700 text-xs font-bold"><User size={12} /> Khách hàng</span>;
  };

  return (
    <div className="relative min-h-[80vh] font-sans pb-10">
      {toastMsg && (
        <div className={`fixed top-6 right-6 bg-white border-l-4 shadow-xl px-6 py-4 rounded-lg flex items-center gap-3 z-[60] animate-in slide-in-from-right-8 ${toastType === 'success' ? 'border-green-500' : 'border-red-500'}`}>
          {toastType === 'success' ? <CheckCircle2 className="text-green-500" size={24} /> : <X className="text-red-500" size={24} />}
          <span className="font-medium text-gray-800">{toastMsg}</span>
        </div>
      )}

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
                  <div><label className="block text-sm font-semibold text-gray-800 mb-2">Họ tên <span className="text-red-500">*</span></label><input required type="text" value={currentUser.fullName} onChange={(e) => setCurrentUser({...currentUser, fullName: e.target.value})} className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" /></div>
                  <div><label className="block text-sm font-semibold text-gray-800 mb-2">Email <span className="text-red-500">*</span></label><input required type="email" value={currentUser.email} onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})} className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" /></div>
                  <div><label className="block text-sm font-semibold text-gray-800 mb-2">Số điện thoại <span className="text-red-500">*</span></label><input required type="tel" value={currentUser.phone} onChange={(e) => setCurrentUser({...currentUser, phone: e.target.value})} className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" /></div>
                  <div><label className="block text-sm font-semibold text-gray-800 mb-2">Ngày sinh</label><input type="date" value={currentUser.dateOfBirth || ""} onChange={(e) => setCurrentUser({...currentUser, dateOfBirth: e.target.value})} className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" /></div>
                  
                  {/* TRƯỜNG ADDRESS */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Địa chỉ</label>
                    <input type="text" value={currentUser.address || ""} onChange={(e) => setCurrentUser({...currentUser, address: e.target.value})} className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" />
                  </div>
                  
                  {/* TRƯỜNG LƯƠNG - Chỉ hiển thị cho Nhân viên */}
                  {(currentUser.role === "staff" || currentUser.role === "admin" || currentUser.role === "employer") && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-800 mb-2 font-sans">
                        Mức lương (VNĐ) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <input 
                          required
                          type="number" 
                          value={currentUser.salary || 0} 
                          onChange={(e) => setCurrentUser({...currentUser, salary: Number(e.target.value)})} 
                          className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 pl-12 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all font-bold" 
                          placeholder="Nhập mức lương..."
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold border-r pr-2 border-gray-300">
                          ₫
                        </span>
                      </div>
                    </div>
                  )}

                  {modalMode === "add" && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Mật khẩu <span className="text-red-500">*</span></label>
                      <input required type="password" value={currentUser.password} onChange={(e) => setCurrentUser({...currentUser, password: e.target.value})} className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" />
                    </div>
                  )}

                  {modalMode === "add" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Vai trò <span className="text-red-500">*</span></label>
                      <select required value={currentUser.role} onChange={(e) => setCurrentUser({...currentUser, role: e.target.value})} className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-white font-medium">
                        <option value="customer">Khách hàng</option>
                        <option value="staff">Nhân viên</option>
                      </select>
                    </div>
                  )}

                  <div className={modalMode === "edit" ? "md:col-span-2" : ""}>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Trạng thái <span className="text-red-500">*</span></label>
                    <select required value={currentUser.status} onChange={(e) => setCurrentUser({...currentUser, status: Number(e.target.value)})} className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-white font-medium">
                      <option value={1}>🟢 Hoạt động</option>
                      <option value={0}>🔴 Bị khóa</option>
                    </select>
                  </div>
                </div>

                <div className="pt-8 flex justify-end gap-4 border-t border-gray-100 mt-8">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md font-semibold transition flex items-center gap-2"><ArrowLeft size={18} /> Quay về</button>
                  <button type="submit" className="px-8 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition flex items-center gap-2">
                    {modalMode === "add" ? <Plus size={18} /> : <CheckCircle2 size={18} />}
                    {modalMode === "add" ? "Thêm tài khoản" : "Lưu thay đổi"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Quản lý người dùng</h1>
        <button onClick={handleOpenAdd} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition flex items-center gap-2 font-medium"><Plus size={18} /> Thêm tài khoản</button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div><label className="block text-sm font-semibold text-gray-900 mb-1.5">Tìm theo họ tên</label><input type="text" placeholder="Nhập họ tên..." value={searchName} onChange={(e) => setSearchName(e.target.value)} className="w-full border-2 border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm transition-all" /></div>
          <div><label className="block text-sm font-semibold text-gray-900 mb-1.5">Tìm theo email</label><input type="text" placeholder="Nhập email..." value={searchAccount} onChange={(e) => setSearchAccount(e.target.value)} className="w-full border-2 border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm transition-all" /></div>
          <div><label className="block text-sm font-semibold text-gray-900 mb-1.5">Vai trò</label><select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="w-full border-2 border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm transition-all bg-white font-medium"><option value="customer">Khách hàng</option><option value="staff">Nhân viên</option></select></div>
          <div><label className="block text-sm font-semibold text-gray-900 mb-1.5">Trạng thái</label><select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full border-2 border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm transition-all bg-white font-medium"><option value="all">Tất cả</option><option value={1}>Hoạt động</option><option value={0}>Bị khóa</option></select></div>
          <div><button onClick={handleSearchClick} className="bg-[#22C55E] text-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-[#16A34A] transition flex items-center justify-center gap-2 font-bold w-full md:w-auto"><Search size={18} /> Tìm kiếm</button></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8 min-h-[400px] relative">
        {isLoading && <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center"><Loader2 className="w-8 h-8 text-blue-600 animate-spin" /></div>}
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white text-sm font-semibold uppercase tracking-wide">
                <th className="px-4 py-4 whitespace-nowrap">STT</th>
                <th className="px-4 py-4 whitespace-nowrap">HỌ VÀ TÊN</th>
                <th className="px-4 py-4 whitespace-nowrap">EMAIL</th>
                <th className="px-4 py-4 whitespace-nowrap">SỐ ĐIỆN THOẠI</th>
                <th className="px-4 py-4 whitespace-nowrap">VAI TRÒ</th>
                {(appliedFilters.role === "staff" || appliedFilters.role === "admin") && (
                <th className="px-4 py-4 whitespace-nowrap text-yellow-300">LƯƠNG</th>
              )}
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
                    <td className="px-4 py-4">{user.email || user.username}</td>
                    <td className="px-4 py-4">{user.phone}</td>
                    <td className="px-4 py-4">{renderRoleBadge(user.role || appliedFilters.role)}</td>
                    <td className="px-4 py-4">
                      {user.status === 1 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-green-50 text-green-700 border border-green-200 text-xs font-bold tracking-wide"><CheckCircle2 size={12} />Hoạt động</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-50 text-red-600 border border-red-200 text-xs font-bold tracking-wide"><Lock size={12} />Đã khóa</span>
                      )}
                    </td>
                    {(appliedFilters.role === "staff" || appliedFilters.role === "admin") && (
                    <td className="px-4 py-4 font-bold text-blue-600">
                      {user.salary?.toLocaleString('vi-VN')} ₫
                    </td>
                  )}
                    <td className="px-4 py-4">
                      <div className="flex justify-center items-center gap-2">
                        <button onClick={() => handleOpenEdit(user)} className="px-3 py-1.5 rounded-lg text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-100 transition flex items-center gap-1 font-semibold"><Edit size={16} /> Sửa</button>
                        <button onClick={() => toggleStatus(user)} className={`px-3 py-1.5 rounded-lg text-white shadow-sm transition font-semibold min-w-[90px] ${user.status === 1 ? "bg-red-500 hover:bg-red-600" : "bg-gray-500 hover:bg-gray-600"}`}>{user.status === 1 ? "Khóa" : "Mở khóa"}</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                !isLoading && <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-500">Không tìm thấy người dùng nào.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`w-9 h-9 flex items-center justify-center border rounded-lg transition ${currentPage === 1 ? "border-gray-200 text-gray-300 cursor-not-allowed bg-white" : "border-gray-300 text-gray-500 bg-white hover:bg-blue-50 hover:text-blue-600 shadow-sm"}`}><ChevronLeft size={18} /></button>
          {[...Array(totalPages)].map((_, index) => (
            <button key={index} onClick={() => setCurrentPage(index + 1)} className={`w-9 h-9 flex items-center justify-center border rounded-lg font-bold transition shadow-sm ${currentPage === index + 1 ? "border-blue-600 bg-blue-600 text-white shadow-md" : "border-gray-300 bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`}>{index + 1}</button>
          ))}
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className={`w-9 h-9 flex items-center justify-center border rounded-lg transition ${currentPage === totalPages ? "border-gray-200 text-gray-300 cursor-not-allowed bg-white" : "border-gray-300 text-gray-500 bg-white hover:bg-blue-50 hover:text-blue-600 shadow-sm"}`}><ChevronRight size={18} /></button>
        </div>
      )}
    </div>
  );
}