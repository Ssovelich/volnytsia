"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import StoreProvider from "@/app/(main)/StoreProvider";
import { Toaster } from "react-hot-toast";
import { HiMenuAlt2, HiX } from "react-icons/hi";
import {
  HiOutlineTrophy,
  HiOutlinePhoto,
  HiOutlineVideoCamera,
} from "react-icons/hi2";
import { RiSlideshowView } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";
import { MdPeopleOutline } from "react-icons/md";
import { PiSignOut } from "react-icons/pi";
import { VscLayoutPanel } from "react-icons/vsc";
import styles from "./AdminLayout.module.scss";

export default function AdminClientLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("admin_token");
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { name: "Відзнаки", href: "/admin/awards", icon: <HiOutlineTrophy /> },
    { name: "Фото-банер", href: "/admin/banners", icon: <RiSlideshowView /> },
    { name: "Галерея", href: "/admin/gallery", icon: <HiOutlinePhoto /> },
    { name: "Відео", href: "/admin/videos", icon: <HiOutlineVideoCamera /> },
    { name: "Керівники", href: "/admin/leaders", icon: <IoPersonOutline /> },
    { name: "Учасники", href: "/admin/members", icon: <MdPeopleOutline /> },
    { name: "Футер", href: "/admin/footer", icon: <VscLayoutPanel /> },
  ];

  const isLoginPage = pathname === "/admin/login";

  const toasterConfig = (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#374151",
          color: "#fff",
          fontSize: "14px",
          borderRadius: "8px",
        },
        success: {
          iconTheme: {
            primary: "#10B981",
            secondary: "#fff",
          },
        },
      }}
    />
  );

  // Якщо сторінка логіну - не показуємо сайдбар
  if (isLoginPage) {
    return (
      <StoreProvider>
        <main className={styles.loginCenter}>{children}</main>
      </StoreProvider>
    );
  }

  return (
    <StoreProvider>
      {toasterConfig}
      <div className={styles.wrapper}>
        <button
          className={styles.mobileToggle}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle Menu"
        >
          {isSidebarOpen ? <HiX /> : <HiMenuAlt2 />}
        </button>

        {isSidebarOpen && (
          <div
            className={styles.overlay}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside
          className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}
        >
          <div className={styles.logoWrapper}>
            <img src="/logo.svg" alt="Logo" className={styles.logoimg} />
            <h2 className={styles.logoText}>Адмін-панель</h2>
          </div>

          <nav className={styles.nav}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`${styles.navLink} ${
                  pathname === item.href ? styles.active : ""
                }`}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.navName}>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className={styles.footer}>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              <span className={styles.icon}>
                <PiSignOut />
              </span>
              <span className={styles.navName}>Вийти</span>
            </button>
          </div>
        </aside>

        <main className={styles.mainContent}>{children}</main>
      </div>
    </StoreProvider>
  );
}
