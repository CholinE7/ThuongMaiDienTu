export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  imageUrl?: string;
  category: any;
  description: string;
  colors?: string[]; // THÊM DÒNG NÀY ĐỂ LƯU MÃ MÀU (Hex code)
  sizes?: number[];
}