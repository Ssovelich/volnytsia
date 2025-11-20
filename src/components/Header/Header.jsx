"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuRef = useRef(null);

  const navItems = [
    { href: "/", label: "Головна" },
    { href: "/about", label: "Про нас" },
    { href: "/awards", label: "Відзнаки" },
    { href: "/gallery", label: "Галерея" },
    { href: "/backstage", label: "За лаштунками" },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header className={styles.header}>
      <Link className={styles.logoWrap} href="/">
        <img src="/logo.svg" alt="Logo" className={styles.logo} />
      </Link>

      <nav>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={pathname === item.href ? styles.activeLink : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {!isOpen && (
        <button
          className={styles.menuButton}
          onClick={() => setIsOpen(true)}
        >
          Меню
        </button>
      )}

      {isOpen && (
        <div ref={menuRef} className={styles.mobileMenu}>
          <button
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          <ul className={styles.mobileMenuList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={pathname === item.href ? styles.activeLink : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
