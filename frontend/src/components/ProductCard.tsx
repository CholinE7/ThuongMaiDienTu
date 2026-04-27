import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Hàm format tiền tệ (thêm 'đ' ở cuối giống MWC)
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  return (
    <div className="group flex flex-col h-full cursor-pointer">
      {/* Khối hình ảnh */}
      <Link href={`/product/${product.id}`} className="block relative aspect-square w-full bg-gray-100 overflow-hidden mb-4">
        <Image
          src={product.image || product.imageUrl || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition duration-500"
        />
      </Link>
      
      {/* Khối thông tin (Canh giữa) */}
      <div className="flex flex-col items-center flex-grow px-2">
        {/* Tên sản phẩm - Cắt ngắn 1 dòng có dấu ... */}
        <Link href={`/product/${product.id}`} className="w-full text-center">
          <h3 className="text-sm text-gray-700 mb-1 truncate group-hover:text-blue-600 transition">
            {product.name}
          </h3>
        </Link>
        
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
      </div>
    </div>
  );
}