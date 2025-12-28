"use client";

import { usePathname } from "next/navigation";
import AdminNotFound from "@/components/NotFound/AdminNotFound";
import MainNotFound from "@/components/NotFound/MainNotFound";

export default function NotFound() {
  const pathname = usePathname();

  // Перевірка: чи шлях починається з /admin
  const isAdminPath = pathname?.startsWith("/admin");

  return isAdminPath ? <AdminNotFound /> : <MainNotFound />;
}