"use client";

import { Filter } from 'lucide-react';

interface FilterSidebarProps {
  brands: any[];
  selectedBrand: string;
  setSelectedBrand: (val: string) => void;
  minPrice: string;
  setMinPrice: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;
  selectedColor: string;
  setSelectedColor: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
}

const COLORS = [
  { name: "Đen", value: "Đen" },
  { name: "Trắng", value: "Trắng" },
  { name: "Đỏ", value: "Đỏ" },
  { name: "Xanh", value: "Xanh" },
  { name: "Xám", value: "Xám" },
  { name: "Vàng", value: "Vàng" },
];

export default function FilterSidebar({
  brands,
  selectedBrand,
  setSelectedBrand,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedColor,
  setSelectedColor,
  onSubmit,
  onClear,
}: FilterSidebarProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <Filter size={20} className="text-blue-600" />
        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">Bộ Lọc Của Bạn</h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Lọc theo Thương hiệu */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Thương hiệu</label>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="">Tất cả thương hiệu</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
        </div>

        {/* Lọc theo Màu sắc */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Màu sắc</label>
          <div className="grid grid-cols-2 gap-2">
            {COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setSelectedColor(selectedColor === color.value ? "" : color.value)}
                className={`py-2 px-3 text-xs rounded-lg border transition-all ${
                  selectedColor === color.value
                    ? "bg-blue-600 text-white border-blue-600 font-bold"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300"
                }`}
              >
                {color.name}
              </button>
            ))}
          </div>
        </div>

        {/* Lọc theo Khoảng giá */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Khoảng giá (VNĐ)</label>

          <div className="mb-6 px-1">
            {/* Range Slider Container */}
            <div className="relative h-2 w-full bg-gray-200 rounded-full mt-2 mb-6">
              {/* Active Track */}
              <div
                className="absolute h-2 bg-blue-600 rounded-full"
                style={{
                  left: `${((Number(minPrice || 0)) / 10000000) * 100}%`,
                  right: `${100 - ((Number(maxPrice || 10000000)) / 10000000) * 100}%`
                }}
              ></div>

              {/* Min Input */}
              <input
                type="range"
                min="0"
                max="10000000"
                step="50000"
                value={minPrice || 0}
                onChange={(e) => {
                  const value = Math.min(Number(e.target.value), Number(maxPrice || 10000000));
                  setMinPrice(value.toString());
                }}
                className="absolute w-full -top-1 h-4 appearance-none bg-transparent pointer-events-none custom-range"
                style={{ zIndex: 3 }}
              />

              {/* Max Input */}
              <input
                type="range"
                min="0"
                max="10000000"
                step="50000"
                value={maxPrice || 10000000}
                onChange={(e) => {
                  const value = Math.max(Number(e.target.value), Number(minPrice || 0));
                  setMaxPrice(value.toString());
                }}
                className="absolute w-full -top-1 h-4 appearance-none bg-transparent pointer-events-none custom-range"
                style={{ zIndex: 4 }}
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">Từ</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 pl-8 pr-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-sm font-medium"
                />
              </div>
              <span className="text-gray-400 font-bold">-</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">Đến</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 pl-10 pr-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-sm font-medium"
                />
              </div>
            </div>

            <style dangerouslySetInnerHTML={{
              __html: `
              .custom-range::-webkit-slider-thumb {
                pointer-events: auto;
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: white;
                border: 3px solid #2563eb;
                cursor: pointer;
                box-shadow: 0 2px 6px rgba(0,0,0,0.2);
              }
              .custom-range::-moz-range-thumb {
                pointer-events: auto;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: white;
                border: 3px solid #2563eb;
                cursor: pointer;
                box-shadow: 0 2px 6px rgba(0,0,0,0.2);
              }
            `}} />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
        >
          Áp dụng lọc
        </button>
        <button
          type="button"
          onClick={onClear}
          className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors mt-2"
        >
          Xóa lọc
        </button>
      </form>
    </div>
  );
}
