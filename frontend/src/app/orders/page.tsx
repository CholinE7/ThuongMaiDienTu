"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiRequest } from '@/services/app';
import Navbar from '@/components/Navbar';
import { ChevronRight, Package, AlertCircle, Loader2 } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiRequest('/api/orders/my-orders?page_size=50', 'GET');
        const res = await response.json();
        if (res.code === 200 && res.result) {
          setOrders(res.result.content || []);
        } else {
          setError(res.message || "Không thể tải lịch sử đơn hàng.");
        }
      } catch (err) {
        console.error("Lỗi lấy lịch sử đơn hàng", err);
        setError("Lỗi kết nối đến máy chủ. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    };

    // Chỉ gọi khi có token
    const token = localStorage.getItem("token");
    if (token) {
      fetchOrders();
    } else {
      setError("Vui lòng đăng nhập để xem lịch sử mua hàng.");
      setIsLoading(false);
    }
  }, []);

  const formatPrice = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider">Chờ xác nhận</span>;
      case 'APPROVED':
        return <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider">Đã xác nhận</span>;
      case 'SHIPPED':
        return <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider">Đang giao</span>;
      case 'DELIVERED':
        return <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider">Thành công</span>;
      case 'CANCELLED':
        return <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider">Đã hủy</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider">{status}</span>;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="pt-24 pb-20 container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <div className="text-sm font-medium mb-8 flex items-center gap-2">
          <Link href="/" className="text-gray-500 hover:text-black transition">Trang chủ</Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-black">Lịch sử đơn hàng</span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-900 uppercase tracking-widest mb-2">Lịch sử đơn hàng</h1>
          <p className="text-gray-500 text-sm">Theo dõi trạng thái các đơn hàng bạn đã đặt mua</p>
        </div>

        {isLoading ? (
          <div className="bg-white p-12 rounded shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 text-gray-900 animate-spin mb-4" />
            <p className="text-sm text-gray-500 uppercase tracking-widest">Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <div className="bg-white p-12 rounded shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
            <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
            <p className="text-base font-medium text-gray-900 mb-2">{error}</p>
            {error.includes("đăng nhập") ? (
              <Link href="/login" className="mt-4 px-6 py-2 bg-black text-white text-sm font-medium rounded uppercase tracking-widest hover:bg-gray-800 transition">
                Đăng nhập ngay
              </Link>
            ) : (
              <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-gray-100 text-gray-900 text-sm font-medium rounded uppercase tracking-widest hover:bg-gray-200 transition">
                Thử lại
              </button>
            )}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-16 rounded shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
            <Package className="w-16 h-16 text-gray-300 mb-6" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Bạn chưa có đơn hàng nào</h2>
            <p className="text-gray-500 mb-8 text-center max-w-md">Hãy khám phá các sản phẩm mới nhất của chúng tôi và đặt ngay cho mình đôi giày ưng ý nhất.</p>
            <Link href="/" className="px-8 py-3 bg-black text-white text-sm font-medium rounded-full uppercase tracking-widest hover:bg-gray-800 transition shadow-lg shadow-gray-200">
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((item) => {
              const { order, details } = item;
              return (
                <div key={order.id} className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-widest">Mã đơn hàng: </span>
                      <span className="font-bold text-gray-900">#{order.id}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-widest">Phương thức: </span>
                      <span className="font-medium text-gray-900">{order.method}</span>
                    </div>
                    <div>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Danh sách sản phẩm trong đơn */}
                    <div className="space-y-4 mb-6">
                      {details && details.map((detail: any, index: number) => (
                        <div key={index} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <div className="w-20 h-20 bg-gray-100 flex-shrink-0">
                            {detail.product?.imageUrl ? (
                              <img src={detail.product.imageUrl} alt={detail.product?.name || "Product"} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <Package size={24} />
                                </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900 mb-1">{detail.product?.name || "Sản phẩm"}</h3>
                            <div className="text-sm text-gray-900">
                              Số lượng: x{detail.quantity}
                            </div>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatPrice(detail.cost)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tổng tiền */}
                    <div className="flex justify-end items-center border-t border-gray-100 pt-4">
                      <span className="text-sm text-gray-500 uppercase tracking-widest mr-4">Tổng tiền:</span>
                      <span className="text-xl font-bold text-[#FA5C52]">{formatPrice(order.totalPrice)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
