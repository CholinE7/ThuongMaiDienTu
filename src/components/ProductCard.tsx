import Image from 'next/image';
import Link from 'next/link';
<<<<<<< HEAD
import { Product } from '@/types';
=======
import { Product } from '@/types'; // Import kiểu dữ liệu
>>>>>>> NamThinh

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
<<<<<<< HEAD
  // Hàm format tiền tệ (thêm 'đ' ở cuối giống MWC)
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  return (
    <div className="group flex flex-col h-full cursor-pointer">
      {/* Khối hình ảnh */}
      <Link href={`/product/${product.id}`} className="block relative aspect-square w-full bg-gray-100 overflow-hidden mb-4">
=======
  // Hàm format tiền tệ
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      <Link href={`/product/${product.id}`} className="block relative h-64 w-full bg-gray-100 overflow-hidden">
>>>>>>> NamThinh
        <Image
          src={product.image}
          alt={product.name}
          fill
<<<<<<< HEAD
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition duration-500"
        />
      </Link>
      
      {/* Khối thông tin (Canh giữa) */}
      <div className="flex flex-col items-center flex-grow px-2">
        {/* Tên sản phẩm - Cắt ngắn 1 dòng có dấu ... */}
        <Link href={`/product/${product.id}`} className="w-full text-center">
          <h3 className="text-sm text-gray-700 mb-1 truncate group-hover:text-blue-600 transition">
=======
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition duration-500"
        />
        {/* Badge Category */}
        <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
          {product.category}
        </span>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-blue-600 transition">
>>>>>>> NamThinh
            {product.name}
          </h3>
        </Link>
        
<<<<<<< HEAD
        {/* Giá tiền - In đậm */}
        <span className="text-base font-bold text-black mb-3">
          {formatPrice(product.price)}
        </span>
        
        {/* Các chấm màu sắc */}
        {/* {product.colors && product.colors.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-auto pb-2">
            {product.colors.map((color, index) => (
              <div 
                key={index}
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )} */}
=======
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <span className="text-lg font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
          {/* <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-gray-200">
            Mua ngay
          </button> */}
        </div>
>>>>>>> NamThinh
      </div>
    </div>
  );
}