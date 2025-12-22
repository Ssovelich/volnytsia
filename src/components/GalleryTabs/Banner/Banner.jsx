"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { galleryData } from "@/data/galleryData";
import styles from "./Banner.module.scss";

const Banner = () => {
  const [index, setIndex] = useState(0);
  const images = galleryData.bannerImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.bannerWrapper}>
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`${styles.imageContainer} ${
            i === index ? styles.active : styles.inactive
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            className={styles.bannerImage}
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  );
};

export default Banner;
