import { Search, Lock, Unlock, Edit } from "lucide-react";

// Dữ liệu giả (Mock data) cho Người dùng
const mockUsers = [
  { id: 1, name: "Quản trị viên", email: "admin@shoestore.com", role: "Admin", status: "Hoạt động", date: "01/01/2023" },
  { id: 2, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", role: "Khách hàng", status: "Hoạt động", date: "15/05/2023" },
  { id: 3, name: "Trần Thị B", email: "tranthib@yahoo.com", role: "Khách hàng", status: "Bị khóa", date: "20/06/2023" },
  { id: 4, name: "Lê Văn C", email: "levanc@outlook.com", role: "Khách hàng", status: "Hoạt động", date: "10/08/2023" },
];

export default function AdminUsers() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Người dùng</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Tìm tên hoặc email..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Người dùng</th>
                <th className="px-6 py-4 font-medium">Vai trò</th>
                <th className="px-6 py-4 font-medium">Ngày tham gia</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">{user.name}</span>
                      <span className="text-sm text-gray-500">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "Admin" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.date}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 text-sm font-semibold ${
                      user.status === "Hoạt động" ? "text-green-600" : "text-red-600"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${user.status === "Hoạt động" ? "bg-green-600" : "bg-red-600"}`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-3">
                      <button className="text-blue-500 hover:text-blue-600 transition" title="Chỉnh sửa quyền">
                        <Edit size={18} />
                      </button>
                      {user.status === "Hoạt động" ? (
                        <button className="text-red-500 hover:text-red-600 transition" title="Khóa tài khoản">
                          <Lock size={18} />
                        </button>
                      ) : (
                        <button className="text-green-500 hover:text-green-600 transition" title="Mở khóa">
                          <Unlock size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}