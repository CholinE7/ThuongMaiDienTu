'use client';

import React, { useState, useEffect } from 'react';
import { 
  Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight, 
  X, MapPin, Phone, User, Ticket, QrCode, CreditCard, Banknote,
  Wallet, Landmark, CircleDollarSign, Loader2
} from 'lucide-react';
import { getCart, updateQuantity as updateCartQuantity, removeFromCart, clearCart, CartItem } from '@/utils/cartUtils';
import { apiRequest } from '@/services/app';
import toast from 'react-hot-toast';

const Cart = () => {
  // Dữ liệu mẫu khởi tạo
  const [items, setItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    const fetchCart = async () => {
      const data = await getCart();
      setItems(data);
    };
    fetchCart();
    
    const handleCartUpdate = () => fetchCart();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  // State cho Checkout Modal & Phương thức vận chuyển/thanh toán
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('qr'); // Mặc định chọn thanh toán QR
  const [shippingMethod, setShippingMethod] = useState('standard'); // 'standard' hoặc 'express'

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    // Auto-fill thông tin khi modal thanh toán được mở  
    const updateCustomerInfo = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) return;
      try {
        const response = await apiRequest('/api/auth/me', 'GET');
        const res = await response.json();
        if (res.code === 200 && res.result) {
          const u = res.result;
          setCustomerName(u.fullName || '');
          setCustomerPhone(u.phone || '');
          // Ghép địa chỉ mặc định từ 3 trường street, ward, city
          const addr = [u.street, u.ward, u.city].filter(Boolean).join(', ');
          setCustomerAddress(addr);
        }
      } catch (e) {
        console.error('Không thể tải thông tin khách hàng', e);
      }
    };

    if (showCheckoutModal) {
      updateCustomerInfo();
    }

    window.addEventListener("authUpdated", updateCustomerInfo);
    return () => window.removeEventListener("authUpdated", updateCustomerInfo);
  }, [showCheckoutModal]);

  const updateQuantity = async (id: number, delta: number) => {
    const item = items.find(i => i.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + delta);
      await updateCartQuantity(id, newQuantity);
    }
  };

  const removeItem = async (id: number) => {
    await removeFromCart(id);
  };


  // Tính toán Tạm tính, Phí vận chuyển và Tổng tiền
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  // Logic phí vận chuyển: Nhanh thì +5% tổng đơn, Tiêu chuẩn thì cố định 50k
  const shippingFee = items.length > 0 
    ? (shippingMethod === 'express' ? subtotal * 0.05 : 50000) 
    : 0;
    
  const total = subtotal + shippingFee;
  
  const formatPrice = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 font-sans bg-white min-h-screen relative">
      <div className="mb-6">
        <a href="/" className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Tiếp tục mua sắm
        </a>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-wide uppercase mb-1">
            Giỏ hàng <span className="text-blue-600">của bạn</span>
          </h1>
          <p className="text-gray-500 font-medium">Giao hàng nhanh từ 2-3 ngày làm việc</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg">
          <ShoppingBag className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">
            {items.length} sản phẩm
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* ================= CỘT TRÁI: DANH SÁCH SẢN PHẨM ================= */}
        <div className="lg:col-span-8 space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="group flex flex-col sm:flex-row items-center bg-gray-50 p-6 rounded-3xl border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-2xl transition-all duration-300">
                <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-2xl bg-white border border-gray-50">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110" />
                </div>
                
                <div className="sm:ml-8 flex-grow text-center sm:text-left mt-4 sm:mt-0">
                  <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.15em] mb-1">{item.category}</p>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1 uppercase tracking-wide">{item.name}</h3>
                  <div className="flex items-center justify-center sm:justify-start gap-4 mb-3">
                    {item.color && (
                      <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded uppercase border border-gray-200">Màu: {item.color}</span>
                    )}
                    {item.size && (
                      <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded uppercase border border-gray-200">Size: {item.size}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-bold uppercase">Đơn giá</span>
                    <p className="text-lg font-bold text-gray-900">{formatPrice(item.price)}</p>
                  </div>
                </div>

                <div className="flex items-center bg-white rounded-2xl px-3 py-2 my-4 sm:my-0 sm:mx-6 shadow-sm border border-gray-100">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-blue-50 rounded-xl transition-all text-gray-400 hover:text-blue-600">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="mx-6 font-bold text-gray-900 min-w-[24px] text-center text-lg">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-blue-50 rounded-xl transition-all text-gray-400 hover:text-blue-600">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hidden sm:block text-right min-w-[140px]">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Thành tiền</p>
                    <p className="font-bold text-blue-700 text-lg">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-3 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all active:scale-90">
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-50 rounded-[2rem] p-20 text-center border-2 border-dashed border-gray-200">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <ShoppingBag className="w-10 h-10 text-gray-200" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 uppercase tracking-wide">Giỏ hàng đang trống</h3>
              <p className="text-gray-400 mb-10 font-medium">Có vẻ như bạn chưa chọn được đôi giày nào ưng ý.</p>
              <a href="/" className="inline-block bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold uppercase tracking-wide hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95">
                Khám phá ngay
              </a>
            </div>
          )}
        </div>

        {/* ================= CỘT PHẢI: TÓM TẮT ĐƠN HÀNG TRONG GIỎ ================= */}
        <div className="lg:col-span-4">
          <div className="bg-gray-900 text-white p-8 rounded-[2rem] sticky top-24 shadow-2xl border border-gray-800 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            
            <h2 className="text-2xl font-bold mb-10 border-b border-gray-800 pb-5 uppercase tracking-wide">Đơn hàng</h2>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase font-bold text-gray-400 tracking-widest">Tạm tính</span>
                <span className="font-bold text-gray-200 tracking-wide">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase font-bold text-gray-400 tracking-widest">Phí vận chuyển</span>
                <span className="font-bold text-gray-200 tracking-wide">{formatPrice(shippingFee)}</span>
              </div>
              
              <div className="pt-8 border-t border-gray-800 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Tổng thanh toán</span>
                  <p className="text-3xl font-bold text-white mt-1 tracking-wide">
                    {formatPrice(total)}
                  </p>
                </div>
              </div>
            </div>

            <button 
              disabled={items.length === 0} 
              onClick={() => setShowCheckoutModal(true)} // MỞ MODAL KHI CLICK
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-600 transition-all uppercase tracking-wide shadow-2xl shadow-blue-900/40 active:scale-95 flex items-center justify-center gap-3 group"
            >
              Thanh toán 
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            
            <p className="mt-8 text-[10px] text-gray-500 text-center uppercase font-bold tracking-widest leading-relaxed">
              Thanh toán an toàn bảo mật 100% <br/>
              Hỗ trợ đổi trả trong vòng 30 ngày
            </p>
          </div>
        </div>
      </div>

      {/* ================= MODAL THANH TOÁN (CHECKOUT MODAL) ================= */}
      {showCheckoutModal && items.length > 0 && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
          {/* Vùng chứa Modal */}
          <div className="relative w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl flex flex-col lg:flex-row overflow-hidden max-h-[90vh] lg:max-h-[85vh] animate-in zoom-in-95 duration-300">
            
            {/* Nút Đóng Modal */}
            <button 
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 lg:right-6 lg:top-6 z-10 p-2 bg-gray-100/80 hover:bg-gray-200 text-gray-600 rounded-full transition-colors backdrop-blur-sm"
            >
              <X size={24} />
            </button>

            {/* --- NỬA TRÁI MODAL: THÔNG TIN & PHƯƠNG THỨC --- */}
            <div className="w-full lg:w-3/5 p-6 sm:p-10 overflow-y-auto border-r border-gray-100 hide-scrollbar">
              <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-8">Thông tin thanh toán</h2>
              
              {/* Form Thông tin */}
              <div className="space-y-4 mb-10">
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={customerName} onChange={e => setCustomerName(e.target.value)} type="text" placeholder="Họ và tên người nhận" className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 pl-12 pr-4 outline-none transition-all font-medium text-gray-900" />
                </div>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} type="tel" placeholder="Số điện thoại di động" className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 pl-12 pr-4 outline-none transition-all font-medium text-gray-900" />
                </div>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} type="text" placeholder="Địa chỉ giao hàng chi tiết" className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 pl-12 pr-4 outline-none transition-all font-medium text-gray-900" />
                </div>
                <div className="flex items-center gap-2 mt-2 ml-1">
                  <input type="checkbox" id="save-info" className="w-4 h-4 rounded text-blue-600 border-gray-300 cursor-pointer" />
                  <label htmlFor="save-info" className="text-xs font-bold text-gray-500 cursor-pointer">Lưu lại thông tin này cho lần sau</label>
                </div>
              </div>

              {/* Phương thức vận chuyển */}
              <div className="mb-10">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Phương thức vận chuyển</h3>
                <div className="space-y-3">
                  {/* Tiêu chuẩn */}
                  <div 
                    onClick={() => setShippingMethod('standard')}
                    className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex justify-between items-center ${shippingMethod === 'standard' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${shippingMethod === 'standard' ? 'border-blue-600' : 'border-gray-300'}`}>
                        {shippingMethod === 'standard' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                      </div>
                      <div>
                        <p className={`font-bold ${shippingMethod === 'standard' ? 'text-gray-900' : 'text-gray-600'}`}>Giao hàng tiêu chuẩn</p>
                        <p className="text-xs text-gray-500 mt-1">Thời gian nhận: 2-3 ngày làm việc</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900 uppercase text-sm tracking-wide">50.000 ₫</span>
                  </div>

                  {/* Nhanh (+5%) */}
                  <div 
                    onClick={() => setShippingMethod('express')}
                    className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex justify-between items-center ${shippingMethod === 'express' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${shippingMethod === 'express' ? 'border-blue-600' : 'border-gray-300'}`}>
                        {shippingMethod === 'express' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                      </div>
                      <div>
                        <p className={`font-bold ${shippingMethod === 'express' ? 'text-gray-900' : 'text-gray-600'}`}>Giao hàng nhanh</p>
                        <p className="text-xs text-gray-500 mt-1">Thời gian nhận: Trong ngày</p>
                      </div>
                    </div>
                    <span className="font-bold text-blue-600 uppercase text-sm tracking-wide">+5% Phí</span>
                  </div>
                </div>
              </div>

              {/* Phương thức thanh toán */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2">Thanh toán</h3>
                <p className="text-xs text-gray-500 mb-4">Toàn bộ các giao dịch đều được bảo mật và mã hóa an toàn.</p>
                
                <div className="space-y-3">
                  {/* Option: Payoo QR */}
                  <div 
                    onClick={() => setPaymentMethod('qr')}
                    className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex items-center gap-4 ${paymentMethod === 'qr' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'qr' ? 'border-blue-600' : 'border-gray-300'}`}>
                      {paymentMethod === 'qr' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                    </div>
                    <QrCode size={24} className={paymentMethod === 'qr' ? 'text-blue-600' : 'text-gray-500'} />
                    <div className="flex-grow">
                      <p className={`font-bold ${paymentMethod === 'qr' ? 'text-gray-900' : 'text-gray-600'}`}>Thanh toán QR Code</p>
                    </div>
                  </div>
                  {/* Option: Ví MoMo */}
                  <div 
                    onClick={() => setPaymentMethod('momo')}
                    className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex items-center gap-4 ${paymentMethod === 'momo' ? 'border-pink-600 bg-pink-50/50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'momo' ? 'border-pink-600' : 'border-gray-300'}`}>
                      {paymentMethod === 'momo' && <div className="w-2.5 h-2.5 bg-pink-600 rounded-full" />}
                    </div>
                    <Wallet size={24} className={paymentMethod === 'momo' ? 'text-pink-600' : 'text-gray-500'} />
                    <div className="flex-grow">
                      <p className={`font-bold ${paymentMethod === 'momo' ? 'text-gray-900' : 'text-gray-600'}`}>Ví MoMo</p>
                    </div>
                  </div>
                  {/* Option: VNPAY */}
                  <div 
                    onClick={() => setPaymentMethod('vnpay')}
                    className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex items-center gap-4 ${paymentMethod === 'vnpay' ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'vnpay' ? 'border-blue-500' : 'border-gray-300'}`}>
                      {paymentMethod === 'vnpay' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                    </div>
                    <Landmark size={24} className={paymentMethod === 'vnpay' ? 'text-blue-500' : 'text-gray-500'} />
                    <div className="flex-grow">
                      <p className={`font-bold ${paymentMethod === 'vnpay' ? 'text-gray-900' : 'text-gray-600'}`}>VNPAY</p>
                    </div>
                  </div>
                  {/* Option: PayPal */}
                  <div 
                    onClick={() => setPaymentMethod('paypal')}
                    className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex items-center gap-4 ${paymentMethod === 'paypal' ? 'border-sky-500 bg-sky-50/50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'paypal' ? 'border-sky-500' : 'border-gray-300'}`}>
                      {paymentMethod === 'paypal' && <div className="w-2.5 h-2.5 bg-sky-500 rounded-full" />}
                    </div>
                    <CircleDollarSign size={24} className={paymentMethod === 'paypal' ? 'text-sky-500' : 'text-gray-500'} />
                    <div className="flex-grow">
                      <p className={`font-bold ${paymentMethod === 'paypal' ? 'text-gray-900' : 'text-gray-600'}`}>PayPal</p>
                    </div>
                  </div>
                  {/* Option: Thẻ tín dụng */}
                  <div 
                    onClick={() => setPaymentMethod('card')}
                    className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex items-center gap-4 ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-blue-600' : 'border-gray-300'}`}>
                      {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                    </div>
                    <CreditCard size={24} className={paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-500'} />
                    <div className="flex-grow">
                      <p className={`font-bold ${paymentMethod === 'card' ? 'text-gray-900' : 'text-gray-600'}`}>Thẻ Credit/ATM Card</p>
                    </div>
                  </div>
                  {/* Option: COD */}
                  <div 
                    onClick={() => setPaymentMethod('cod')}
                    className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex items-center gap-4 ${paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-blue-600' : 'border-gray-300'}`}>
                      {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                    </div>
                    <Banknote size={24} className={paymentMethod === 'cod' ? 'text-blue-600' : 'text-gray-500'} />
                    <div className="flex-grow">
                      <p className={`font-bold ${paymentMethod === 'cod' ? 'text-gray-900' : 'text-gray-600'}`}>Thanh toán khi nhận hàng (COD)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- NỬA PHẢI MODAL: TÓM TẮT ĐƠN & NÚT CHỐT ĐƠN --- */}
            <div className="w-full lg:w-2/5 bg-gray-50 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto hide-scrollbar">
              <div>
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-6">Tóm tắt đơn hàng</h3>
                
                {/* Danh sách sản phẩm thu gọn */}
                <div className="space-y-4 mb-8 max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4 items-center bg-white p-3 rounded-2xl border border-gray-100">
                      <div className="relative w-16 h-16 bg-gray-50 rounded-xl flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                        <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <p className="text-xs font-bold text-gray-900 line-clamp-1 uppercase tracking-wide">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mã giảm giá */}
                <div className="flex gap-2 mb-8">
                  <div className="relative flex-grow">
                    <Ticket size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Mã giảm giá" className="w-full bg-white border border-gray-200 focus:border-gray-900 rounded-xl py-3 pl-10 pr-4 outline-none font-medium text-gray-900 text-sm uppercase" />
                  </div>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 rounded-xl font-bold text-sm transition-colors uppercase tracking-widest">
                    Áp dụng
                  </button>
                </div>

                {/* Tính tiền chi tiết */}
                <div className="space-y-4 text-sm font-medium text-gray-600 border-b border-gray-200 pb-6 mb-6">
                  <div className="flex justify-between">
                    <span>Tổng tiền {items.length} mặt hàng</span>
                    <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Phí vận chuyển {shippingMethod === 'express' && '(Nhanh)'}</span>
                    <span className="font-bold text-gray-900 uppercase tracking-wide">
                      {shippingFee > 0 ? formatPrice(shippingFee) : 'Miễn phí'}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-end mb-8">
                  <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Tổng cộng</span>
                  <span className="text-3xl font-bold text-blue-600 tracking-tight">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Nút Xác nhận thanh toán cuối cùng */}
              <button 
                disabled={isPlacingOrder}
                onClick={async () => {
                  const customerId = sessionStorage.getItem("customerId");
                  if (!customerId) {
                    toast.error("Vui lòng đăng nhập để đặt hàng!");
                    return;
                  }

                  if (!customerName || !customerPhone || !customerAddress) {
                    toast.error("Vui lòng điền đầy đủ thông tin giao hàng!");
                    return;
                  }

                  setIsPlacingOrder(true);
                  const toastId = toast.loading("Đang xử lý đơn hàng...");
                  try {
                    const orderDetails = items.map(item => ({
                      productId: item.productId,
                      quantity: item.quantity,
                      cost: item.price,
                      total: item.price * item.quantity
                    }));

                    const requestBody = {
                      customerId: Number(customerId),
                      method: paymentMethod,
                      totalPrice: total,
                      details: orderDetails
                    };

                    const response = await apiRequest('/api/orders', 'POST', requestBody);
                    const res = await response.json();
                    if (res.code === 200) {
                      toast.success(`Đặt hàng thành công! Phương thức: ${paymentMethod.toUpperCase()}`, { id: toastId, duration: 4000 });
                      await clearCart();
                      setShowCheckoutModal(false);
                    } else {
                      toast.error("Lỗi khi đặt hàng: " + res.message, { id: toastId });
                    }
                  } catch (error) {
                    console.error("Error placing order", error);
                    toast.error("Đã xảy ra lỗi, vui lòng thử lại sau!", { id: toastId });
                  } finally {
                    setIsPlacingOrder(false);
                  }
                }}
                className="w-full flex items-center justify-center gap-2 bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-gray-800 disabled:bg-gray-600 transition-all uppercase tracking-wide shadow-xl active:scale-95"
              >
                {isPlacingOrder ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {isPlacingOrder ? "Đang xử lý..." : "Xác nhận đặt hàng"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CSS tùy chỉnh ẩn thanh scrollbar nhưng vẫn cuộn được */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
      `}} />
    </div>
  );
};

export default Cart;
