"use client";

import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./LoadMoreButton.module.scss";

const LoadMoreButton = ({
  data,
  mobile = 4,
  tablet = 8,
  desktop = 12,
  children,
}) => {
  const [itemsPerLoad, setItemsPerLoad] = useState(mobile);
  const [visibleCount, setVisibleCount] = useState(mobile);
  const [isClient, setIsClient] = useState(false);

  const getItemsPerLoadByWindow = () => {
    const width = window.innerWidth;
    if (width >= 1440) return desktop;
    if (width >= 744) return tablet;
    return mobile;
  };

  useEffect(() => {
    const initialCount = getItemsPerLoadByWindow();

    setItemsPerLoad(initialCount);
    setVisibleCount(initialCount);
    setIsClient(true);

    const handleResize = () => {
      const count = getItemsPerLoadByWindow();
      setItemsPerLoad(count);
      setVisibleCount(count);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + itemsPerLoad);
  };

  const finalVisibleCount = isClient ? visibleCount : mobile;

  const isAllShown = finalVisibleCount >= data.length;

  return {
    visibleItems: data.slice(0, finalVisibleCount),
    loadMoreButton: !isAllShown ? (
      <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
        {children || "Завантажити більше"}
        <IoIosArrowDown size={18} />
      </button>
    ) : null,
  };
};

export default LoadMoreButton;
