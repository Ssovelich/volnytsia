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
  const getItemsPerLoad = () => {
    if (typeof window === "undefined") return mobile;

    const width = window.innerWidth;
    if (width >= 1440) return desktop;
    if (width >= 744) return tablet;
    return mobile;
  };

  const [itemsPerLoad, setItemsPerLoad] = useState(() => getItemsPerLoad());
  const [visibleCount, setVisibleCount] = useState(() => getItemsPerLoad());

  useEffect(() => {
    const handleResize = () => {
      const count = getItemsPerLoad();
      setItemsPerLoad(count);
      setVisibleCount(count);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + itemsPerLoad);
  };

  const isAllShown = visibleCount >= data.length;

  return {
    visibleItems: data.slice(0, visibleCount),
    loadMoreButton: !isAllShown ? (
      <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
        {children || "Завантажити більше"}
        <IoIosArrowDown size={18} />
      </button>
    ) : null,
  };
};

export default LoadMoreButton;
