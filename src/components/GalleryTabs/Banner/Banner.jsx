"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { fetchBanners } from "@/lib/banners/bannersSlice";
import styles from "./Banner.module.scss";

const Banner = () => {
  const dispatch = useDispatch();
  const { items: images, status } = useSelector((state) => state.banners);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBanners());
    }
  }, [status, dispatch]);

  const displayImages =
    images.length > 0
      ? images
      : [{ _id: "default", image: "/default-banner.png" }];

  useEffect(() => {
    if (displayImages.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % displayImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [displayImages.length]);

  return (
    <div className={styles.bannerWrapper}>
      {displayImages.map((img, i) => (
        <div
          key={img._id}
          className={`${styles.imageContainer} ${
            i === index ? styles.active : styles.inactive
          }`}
        >
          <Image
            src={img.image}
            alt="Вольниця банер"
            fill
            priority={i === 0}
            className={styles.bannerImage}
            sizes="100vw"
            quality={90}
          />
        </div>
      ))}
    </div>
  );
};

export default Banner;
