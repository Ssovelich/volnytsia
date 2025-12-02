"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { galleryData } from "@/data/galleryData";
import styles from "./Banner.module.scss";

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % galleryData.bannerImages.length
        );
        setIsTransitioning(false);
      }, 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.bannerWrapper}>
      <div
        className={`${styles.imageContainer} ${
          isTransitioning ? styles.fadeOut : styles.fadeIn
        }`}
      >
        <Image
          src={galleryData.bannerImages[currentImageIndex].src}
          alt={galleryData.bannerImages[currentImageIndex].alt}
          width={1200}
          height={400}
          className={styles.bannerImage}
          layout="responsive"
        />
      </div>
    </div>
  );
};

export default Banner;
