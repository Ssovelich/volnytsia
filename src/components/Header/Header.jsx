"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Головна" },
    { href: "/about", label: "Про нас" },
    { href: "/awards", label: "Відзнаки" },
    { href: "/gallery", label: "Галерея" },
    { href: "/backstage", label: "За лаштунками" },
  ];

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClick);
    else document.removeEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

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
                className={
                  pathname === item.href ? styles.activeLink : undefined
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button className={styles.menuButton} onClick={() => setIsOpen(true)}>
        Меню
      </button>

      <div
        className={`${styles.backdrop} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(false)}
      />

      <div
        ref={menuRef}
        className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}
      >
        <ul className={styles.mobileMenuList}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={
                  pathname === item.href ? styles.activeLink : undefined
                }
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
