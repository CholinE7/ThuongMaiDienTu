import { Search, Eye, Edit } from "lucide-react";

// Dữ liệu giả (Mock data) cho Đơn hàng
const mockOrders = [
  { id: "DH1001", customer: "Nguyễn Văn A", date: "20/10/2023", total: 1550000, status: "Hoàn thành" },
  { id: "DH1002", customer: "Trần Thị B", date: "21/10/2023", total: 850000, status: "Đang giao" },
  { id: "DH1003", customer: "Lê Văn C", date: "22/10/2023", total: 2350000, status: "Chờ xác nhận" },
  { id: "DH1004", customer: "Phạm D", date: "23/10/2023", total: 450000, status: "Đã hủy" },
  { id: "DH1005", customer: "Hoàng Thị E", date: "24/10/2023", total: 1600000, status: "Chờ xác nhận" },
];

export default function AdminOrders() {
  // Hàm chọn màu badge cho trạng thái
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hoàn thành": return "bg-green-100 text-green-700";
      case "Đang giao": return "bg-blue-100 text-blue-700";
      case "Chờ xác nhận": return "bg-yellow-100 text-yellow-700";
      case "Đã hủy": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Đơn hàng</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Tìm mã đơn hoặc tên khách..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Mã Đơn</th>
                <th className="px-6 py-4 font-medium">Khách hàng</th>
                <th className="px-6 py-4 font-medium">Ngày đặt</th>
                <th className="px-6 py-4 font-medium">Tổng tiền</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-bold text-blue-600">{order.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {new Intl.NumberFormat('vi-VN').format(order.total)} đ
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-3">
                      <button className="text-blue-500 hover:text-blue-600 transition" title="Xem chi tiết">
                        <Eye size={18} />
                      </button>
                      <button className="text-green-500 hover:text-green-600 transition" title="Cập nhật trạng thái">
                        <Edit size={18} />
                      </button>
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