// src/app/api/orders/route.ts
import { NextResponse } from 'next/server';

// DATABASE GIẢ: Đã bổ sung email, address và mảng items (danh sách giày) cho các đơn hàng
let mockOrdersDatabase = [
  { 
    id: 1, orderCode: "#ORD-089", customerName: "Nguyễn Văn An", totalProducts: 2, phone: "0901234567", 
    email: "an.nguyen@gmail.com", address: "123 Đường Giày, Quận 1, TP.HCM",
    orderDate: "2026-04-06", orderTime: "14:30", totalAmount: 850000, paymentMethod: "COD", status: "unpaid",
    items: [
      { id: "#SP101", name: "Giày Thể Thao Nam N801", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=150", quantity: 1, price: 400000, discount: 0, total: 400000 },
      { id: "#SP102", name: "Giày Chạy Bộ Nữ A-Boost", image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=150", quantity: 1, price: 450000, discount: 0, total: 450000 }
    ]
  },
  { 
    id: 2, orderCode: "#ORD-088", customerName: "Trần Thị Bích", totalProducts: 1, phone: "0912345678", 
    email: "bichtran.99@gmail.com", address: "45 Lê Lợi, Phường Bến Nghé, Quận 1",
    orderDate: "2026-04-05", orderTime: "09:15", totalAmount: 350000, paymentMethod: "MOMO", status: "paid",
    items: [
      { id: "#SP105", name: "Giày Vải Canvas Classic", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=150", quantity: 1, price: 350000, discount: 0, total: 350000 }
    ]
  },
  { 
    id: 3, orderCode: "#ORD-087", customerName: "Lê Hoàng Cường", totalProducts: 1, phone: "0923456789", 
    email: "cuong.le@yahoo.com", address: "Khu công nghệ cao, Quận 9, TP.Thủ Đức",
    orderDate: "2026-04-05", orderTime: "16:45", totalAmount: 1250000, paymentMethod: "VNPAY", status: "processing",
    items: [
      { id: "#SP108", name: "Giày Bóng Rổ Jordan 1", image: "https://images.unsplash.com/photo-1574561569420-10ef4f21bbdd?q=80&w=150", quantity: 1, price: 1250000, discount: 0, total: 1250000 }
    ]
  },
  { id: 4, orderCode: "#ORD-086", customerName: "Phạm Duyên", totalProducts: 1, phone: "0934567890", orderDate: "2026-04-04", orderTime: "10:20", totalAmount: 420000, paymentMethod: "COD", status: "cancelled" },
  { id: 5, orderCode: "#ORD-085", customerName: "Hoàng Tuấn Anh", totalProducts: 2, phone: "0945678901", orderDate: "2026-04-03", orderTime: "20:00", totalAmount: 960000, paymentMethod: "VNPAY", status: "delivering" },
  { id: 6, orderCode: "#ORD-084", customerName: "Vũ Thị Hoa", totalProducts: 1, phone: "0956789012", orderDate: "2026-04-02", orderTime: "08:30", totalAmount: 250000, paymentMethod: "COD", status: "delivered" },
  { id: 7, orderCode: "#ORD-083", customerName: "Đặng Quang Huy", totalProducts: 4, phone: "0967890123", orderDate: "2026-04-01", orderTime: "15:10", totalAmount: 2100000, paymentMethod: "VNPAY", status: "unpaid" },
  { id: 8, orderCode: "#ORD-082", customerName: "Bùi Thị Lan", totalProducts: 1, phone: "0978901234", orderDate: "2026-03-28", orderTime: "11:45", totalAmount: 550000, paymentMethod: "MOMO", status: "delivered" },
  { id: 9, orderCode: "#ORD-081", customerName: "Đỗ Minh Đức", totalProducts: 2, phone: "0989012345", orderDate: "2026-03-25", orderTime: "19:20", totalAmount: 1150000, paymentMethod: "COD", status: "cancelled" },
  { id: 10, orderCode: "#ORD-080", customerName: "Ngô Thanh Vân", totalProducts: 1, phone: "0990123456", orderDate: "2026-03-20", orderTime: "13:00", totalAmount: 680000, paymentMethod: "MOMO", status: "delivered" },
  { id: 11, orderCode: "#ORD-079", customerName: "Lý Hải", totalProducts: 3, phone: "0881234567", orderDate: "2026-03-15", orderTime: "09:50", totalAmount: 1850000, paymentMethod: "VNPAY", status: "paid" },
  { id: 12, orderCode: "#ORD-078", customerName: "Tạ Thị Mai", totalProducts: 1, phone: "0872345678", orderDate: "2026-03-10", orderTime: "17:30", totalAmount: 320000, paymentMethod: "COD", status: "processing" },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request: Request) {
  await delay(800); 

  const { searchParams } = new URL(request.url);
  const fromDate = searchParams.get('fromDate') || "";
  const toDate = searchParams.get('toDate') || "";
  const status = searchParams.get('status') || "all";

  const filteredData = mockOrdersDatabase.filter(order => {
    let matchFromDate = true;
    let matchToDate = true;
    const matchStatus = status === "all" ? true : order.status === status;

    if (fromDate) matchFromDate = new Date(order.orderDate) >= new Date(fromDate);
    if (toDate) matchToDate = new Date(order.orderDate) <= new Date(toDate);

    return matchFromDate && matchToDate && matchStatus;
  });

  return NextResponse.json({ 
    success: true, 
    total: filteredData.length,
    data: filteredData 
  });
}

export async function PUT(request: Request) {
  await delay(500);
  try {
    const body = await request.json();
    const { id, status } = body;

    const orderIndex = mockOrdersDatabase.findIndex(o => o.id === id);
    if (orderIndex > -1) {
      mockOrdersDatabase[orderIndex].status = status;
      return NextResponse.json({ 
        success: true, 
        message: status === 'cancelled' ? "Đã hủy đơn hàng thành công!" : "Đã cập nhật trạng thái đơn hàng!" 
      });
    }

    return NextResponse.json({ success: false, message: "Không tìm thấy đơn hàng!" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Lỗi hệ thống" }, { status: 400 });
  }
}