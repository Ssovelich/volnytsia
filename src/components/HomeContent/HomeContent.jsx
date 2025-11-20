"use client";

import { useEffect, useState } from "react";
import styles from "./HomeContent.module.scss";
import { homeContent } from "@/data/homeContent";

const HomeContent = () => {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(null); // важливо

  // Визначаємо isMobile тільки на клієнті
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 744);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const firstItem = homeContent[0];

  const cutIndex = firstItem.textParts.findIndex(
    (p) =>
      typeof p !== "string" &&
      p.text.includes("ІІ-го і ІІІ-го Всеукраїнського фестивалю-")
  );

  const shortParts = firstItem.textParts.slice(0, cutIndex + 1);
  const fullParts = firstItem.textParts;

  const renderParts = (parts) =>
    parts.map((part, i) =>
      typeof part === "string" ? (
        <span key={i}>{part}</span>
      ) : part.bold ? (
        <strong key={i}>{part.text}</strong>
      ) : (
        part.text
      )
    );

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <p className={styles.text}>
          {/* Поки не знаємо ширину — рендеримо повний текст (стає безпечним для SSR) */}
          {isMobile === null
            ? renderParts(fullParts)
            : isMobile && !expanded
            ? renderParts(shortParts)
            : renderParts(fullParts)}
        </p>

        {isMobile && (
          <button
            className={styles.toggleBtn}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                ... менше{" "}
                <span className={styles.arrow}>
                  <img src="/up.svg" alt="Up" />
                </span>
              </>
            ) : (
              <>
                ... більше{" "}
                <span className={styles.arrow}>
                  <img src="/down.svg" alt="Down" />
                </span>
              </>
            )}
          </button>
        )}
      </div>

      {homeContent.slice(1).map((item, index) => (
        <div
          key={index}
          className={`${styles.block} ${item.title ? styles.hasTitle : ""}`}
        >
          {item.title && <h2 className={styles.title}>{item.title}</h2>}
          {item.text && <p className={styles.text}>{item.text}</p>}
        </div>
      ))}
    </div>
  );
};

export default HomeContent;
