"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import StoreProvider from "@/app/(main)/StoreProvider";
import { HiMenuAlt2, HiX } from "react-icons/hi"; 
import { HiOutlineTrophy, HiOutlinePhoto, HiOutlineVideoCamera } from "react-icons/hi2";
import { PiSignOut } from "react-icons/pi";
import "@/styles/globals.scss";
import styles from "./AdminLayout.module.scss";

export default function AdminLayout({ children }) {
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
    { name: "Галерея", href: "/admin/gallery", icon: <HiOutlinePhoto /> },
    { name: "Відео", href: "/admin/videos", icon: <HiOutlineVideoCamera /> },
  ];

  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <html lang="uk">
        <body className="admin-body">
          <StoreProvider>
            <main>{children}</main>
          </StoreProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="uk">
      <body className="admin-body">
        <StoreProvider>
          <div className={styles.wrapper}>
            <button
              className={styles.mobileToggle}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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
              className={`${styles.sidebar} ${
                isSidebarOpen ? styles.open : ""
              }`}
            >
              <div className={styles.logoWrapper}>
                <img src="/logo.svg" alt="Logo" className={styles.logoimg} />
                <h2 className={styles.logoText}>Адмін панель</h2>
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
      </body>
    </html>
  );
}
