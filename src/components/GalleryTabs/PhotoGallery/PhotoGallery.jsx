"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { galleryData } from "@/data/galleryPhotoData";
import styles from "./PhotoGallery.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const PhotoGallery = () => {
  const { galleryImages } = galleryData;

  const [modalImg, setModalImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const openModal = (img, index) => {
    setModalImg(img);
    setCurrentIndex(index);
  };

  const closeModal = () => setModalImg(null);

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(nextIndex);
    setModalImg(galleryImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentIndex(prevIndex);
    setModalImg(galleryImages[prevIndex]);
  };

  // Блокування скролу
  useEffect(() => {
    if (modalImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalImg]);

  return (
    <>
      <div className={styles.galleryList}>
        {galleryImages.map((item, index) => (
          <Image
            key={item.id}
            src={item.src}
            alt={item.alt}
            width={250}
            height={188}
            className={styles.galleryImage}
            onClick={() => openModal(item, index)}
          />
        ))}
      </div>

      {modalImg && (
        <div className={styles.backdrop} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              ✕
            </button>

            <div className={styles.navButtonContainer}>
              <button className={styles.navButton} onClick={prevImage}>
                <FaArrowLeft />
              </button>

              <button className={styles.navButton} onClick={nextImage}>
                <FaArrowRight />
              </button>
            </div>

            <Image
              src={modalImg.src}
              alt={modalImg.alt}
              width={900}
              height={900}
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;
