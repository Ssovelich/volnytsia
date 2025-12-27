"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./LoginPage.module.scss";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (password === correctPassword) {
      Cookies.set("admin_token", "logged_in_secret", { expires: 7 });
      router.push("/admin/awards");
    } else {
      alert("Помилка доступу");
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleLogin} className={styles.formCard}>
        <h2 className={styles.title}>Вхід в Адмін-панель</h2>
        
        <div className={styles.inputWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
            placeholder="Введіть пароль"
            required
          />
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setShowPassword(!showPassword)}
            tabIndex="-1" // Щоб не фокусуватися кнопкою при натисканні Tab
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Увійти
        </button>
      </form>
    </div>
  );
}