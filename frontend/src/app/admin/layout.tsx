"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { apiRequest } from "@/services/app";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip check for admin login page
    if (pathname === "/admin/login") {
      setIsLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const response = await apiRequest("/api/auth/me", "GET");
        if (response.ok) {
          const res = await response.json();
          // Backend returns role in res.result.role
          if (res.result && res.result.role === "STAFF") {
            setIsAuthorized(true);
            if (res.result.fullName) {
              sessionStorage.setItem("customerName", res.result.fullName);
            }
          } else {
            // Not a staff member, redirect to home
            router.push("/");
          }
        } else {
          // Not authenticated, redirect to admin login
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-500 font-medium">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // If on login page, just show the login form
  if (pathname === "/admin/login") {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        {children}
      </div>
    );
  }

  // If not authorized, don't show anything (router will redirect)
  if (!isAuthorized) {
    return null;
  }

  // Authorized: Show admin dashboard with sidebar
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Cột trái: Thanh Menu */}
      <AdminSidebar />
      
      {/* Cột phải: Nội dung chính */}
      <div className="flex-1 ml-64 p-8">
        {children}
      </div>
    </div>
  );
}
