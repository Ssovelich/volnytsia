"use client";

import { useState, useEffect } from "react";
import styles from "./PageLoader.module.scss";

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default PageLoader;
