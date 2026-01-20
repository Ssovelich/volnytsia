"use client";

import { useState, useEffect } from "react";
import styles from "./CookieBanner.module.scss";

const CookieBanner = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");

    if (!consent) {
      const renderTimer = setTimeout(() => {
        setShouldRender(true);
        requestAnimationFrame(() => {
          setIsOpening(true);
        });
      }, 1500);

      return () => clearTimeout(renderTimer);
    }
  }, []);

  const handleAccept = () => {
    setIsClosing(true);
    setIsOpening(false);

    setTimeout(() => {
      localStorage.setItem("cookie-consent", "true");
      setShouldRender(false);
    }, 500);
  };

  if (!shouldRender) return null;

  return (
    <>
      <div
        className={`${styles.backdrop} ${
          isClosing ? styles.backdropHidden : ""
        }`}
      />

      <div
        className={`
        ${styles.banner} 
        ${isOpening ? styles.slideUp : ""} 
        ${isClosing ? styles.slideDown : ""}
      `}
      >
        <div className={styles.container}>
          <p className={styles.text}>
            Ми використовуємо файли cookie та сторонні сервіси (YouTube), щоб ви
            могли зручно переглядати наші виступи. Залишаючись на сайті, ви
            погоджуєтеся з цим.
          </p>
          <button className={styles.button} onClick={handleAccept}>
            Зрозуміло
          </button>
        </div>
      </div>
    </>
  );
};

export default CookieBanner;
