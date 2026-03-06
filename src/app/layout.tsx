import type { Metadata } from "next";
// 1. Import font Open Sans từ Google
import { Open_Sans } from "next/font/google"; 
import "./globals.css";

// 2. Cấu hình font
const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  // Đặt tên biến để dùng bên Tailwind
  variable: "--font-open-sans", 
  // Tùy chọn độ đậm (nếu cần cụ thể, hoặc để trống nó sẽ lấy auto)
  weight: ["300", "400", "500", "600", "700", "800"], 
});

export const metadata: Metadata = {
  title: "Shoe Store - Giày chính hãng",
  description: "Cửa hàng bán giày uy tín nhất",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      {/* 3. Thêm biến font vào body và class font-sans */}
      <body className={`${openSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}