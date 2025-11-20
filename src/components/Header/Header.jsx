"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Головна" },
    { href: "/about", label: "Про нас" },
    { href: "/awards", label: "Відзнаки" },
    { href: "/gallery", label: "Галерея" },
    { href: "/backstage", label: "За лаштунками" },
  ];

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

      {!isOpen && (
        <button className={styles.menuButton} onClick={() => setIsOpen(true)}>
          Меню
        </button>
      )}

      {isOpen && (
        <div className={styles.mobileMenu}>
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
      )}
    </header>
  );
};

export default Header;
