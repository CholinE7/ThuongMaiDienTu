// src/app/api/imports/route.ts
import { NextResponse } from 'next/server';

// 1. DATABASE GIẢ: 12 Phiếu nhập hàng
let mockImportsDatabase = [
  { id: 1, code: "#PN029", importDate: "2026-05-01", totalDistinct: 1, totalQuantity: 200, totalValue: 2800000, items: [{ productId: 1, productName: "Giày Thể Thao Nam N801", brand: "Nike", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300", importPrice: 14000, quantity: 200 }] },
  { id: 2, code: "#PN028", importDate: "2026-04-28", totalDistinct: 2, totalQuantity: 50, totalValue: 35000000, items: [{ productId: 2, productName: "Giày Chạy Bộ Nữ A-Boost", brand: "Adidas", image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=300", importPrice: 500000, quantity: 40 }, { productId: 3, productName: "Sneaker Cổ Thấp Trắng", brand: "Puma", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=300", importPrice: 1500000, quantity: 10 }] },
  { id: 3, code: "#PN027", importDate: "2026-04-24", totalDistinct: 1, totalQuantity: 10, totalValue: 6130500, items: [{ productId: 4, productName: "Giày Bóng Rổ Jordan 1", brand: "Nike", image: "https://images.unsplash.com/photo-1574561569420-10ef4f21bbdd?q=80&w=300", importPrice: 613050, quantity: 10 }] },
  { id: 4, code: "#PN026", importDate: "2026-04-20", totalDistinct: 1, totalQuantity: 5, totalValue: 750000, items: [{ productId: 5, productName: "Giày Vải Canvas Classic", brand: "Converse", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=300", importPrice: 150000, quantity: 5 }] },
  { id: 5, code: "#PN025", importDate: "2026-04-15", totalDistinct: 3, totalQuantity: 150, totalValue: 85000000, items: [{ productId: 1, productName: "Giày Thể Thao Nam N801", brand: "Nike", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300", importPrice: 400000, quantity: 50 }, { productId: 6, productName: "Giày Thể Thao Nữ P-01", brand: "Puma", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=300", importPrice: 500000, quantity: 50 }, { productId: 7, productName: "Giày Lười Nam Da Thật", brand: "Local Brand", image: "https://images.unsplash.com/photo-1614252339460-e171b3e9a7e0?q=80&w=300", importPrice: 800000, quantity: 50 }] },
  { id: 6, code: "#PN024", importDate: "2026-04-10", totalDistinct: 1, totalQuantity: 20, totalValue: 12000000, items: [{ productId: 3, productName: "Sneaker Cổ Thấp Trắng", brand: "Puma", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=300", importPrice: 600000, quantity: 20 }] },
  { id: 7, code: "#PN023", importDate: "2026-04-05", totalDistinct: 1, totalQuantity: 30, totalValue: 27000000, items: [{ productId: 2, productName: "Giày Chạy Bộ Nữ A-Boost", brand: "Adidas", image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=300", importPrice: 900000, quantity: 30 }] },
  { id: 8, code: "#PN022", importDate: "2026-03-28", totalDistinct: 2, totalQuantity: 100, totalValue: 45000000, items: [{ productId: 8, productName: "Giày Chạy Trail V2", brand: "Salomon", image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=300", importPrice: 300000, quantity: 50 }, { productId: 9, productName: "Sneaker Đế Chunky", brand: "Fila", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=300", importPrice: 600000, quantity: 50 }] },
  { id: 9, code: "#PN021", importDate: "2026-03-25", totalDistinct: 1, totalQuantity: 40, totalValue: 18000000, items: [{ productId: 10, productName: "Giày Slip-on Caro", brand: "Vans", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=300", importPrice: 450000, quantity: 40 }] },
  { id: 10, code: "#PN020", importDate: "2026-03-20", totalDistinct: 1, totalQuantity: 60, totalValue: 48000000, items: [{ productId: 11, productName: "Giày Thể Thao Nữ N802", brand: "Nike", image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=300", importPrice: 800000, quantity: 60 }] },
  { id: 11, code: "#PN019", importDate: "2026-03-15", totalDistinct: 1, totalQuantity: 25, totalValue: 16250000, items: [{ productId: 12, productName: "Giày Tập Gym Nam", brand: "Reebok", image: "https://images.unsplash.com/photo-1584735174965-48c48d7028a9?q=80&w=300", importPrice: 650000, quantity: 25 }] },
  { id: 12, code: "#PN018", importDate: "2026-03-10", totalDistinct: 1, totalQuantity: 10, totalValue: 15000000, items: [{ productId: 4, productName: "Giày Bóng Rổ Jordan 1", brand: "Nike", image: "https://images.unsplash.com/photo-1574561569420-10ef4f21bbdd?q=80&w=300", importPrice: 1500000, quantity: 10 }] },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request: Request) {
  await delay(600); 
  const { searchParams } = new URL(request.url);
  const fromDate = searchParams.get('fromDate') || "";
  const toDate = searchParams.get('toDate') || "";

  const filteredData = mockImportsDatabase.filter(receipt => {
    let matchFrom = true;
    let matchTo = true;
    if (fromDate) matchFrom = new Date(receipt.importDate) >= new Date(fromDate);
    if (toDate) matchTo = new Date(receipt.importDate) <= new Date(toDate);
    return matchFrom && matchTo;
  });

  return NextResponse.json({ success: true, data: filteredData });
}

export async function POST(request: Request) {
  await delay(800); 
  try {
    const body = await request.json(); // Nhận dữ liệu { importDate, items, totalDistinct, totalQuantity, totalValue }
    
    // Tự động sinh mã phiếu
    const newId = mockImportsDatabase.length > 0 ? Math.max(...mockImportsDatabase.map(p => p.id)) + 1 : 1;
    const newCode = `#PN0${newId + 29}`; 

    const newReceipt = { id: newId, code: newCode, ...body };
    mockImportsDatabase = [newReceipt, ...mockImportsDatabase];

    // =======================================================================
    // LOGIC TÍNH GIÁ VỐN BÌNH QUÂN (Theo đúng yêu cầu của bạn)
    // Trong thực tế, Backend sẽ lặp qua từng `item` trong phiếu nhập này:
    // 1. Lấy thông tin Tồn kho hiện tại & Giá vốn hiện tại từ Database.
    // 2. Áp dụng: Giá vốn mới = (Tồn cũ * Giá vốn cũ + Nhập mới * Giá nhập) / (Tồn cũ + Nhập mới)
    // 3. Cập nhật lại Số lượng tồn và Giá vốn mới vào bảng Products.
    // =======================================================================

    return NextResponse.json({ success: true, message: "Lưu phiếu nhập thành công!", data: newReceipt });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Lỗi dữ liệu" }, { status: 400 });
  }
}