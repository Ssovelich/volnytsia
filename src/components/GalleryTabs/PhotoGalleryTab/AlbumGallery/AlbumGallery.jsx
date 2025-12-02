"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./AlbumGallery.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const AlbumGallery = ({ album, onBack, nextAlbum }) => {
  const [modalImg, setModalImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const openModal = (img, index) => {
    setModalImg(img);
    setCurrentIndex(index);
  };

  const closeModal = () => setModalImg(null);

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % album.images.length;
    setCurrentIndex(nextIndex);
    setModalImg(album.images[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex =
      (currentIndex - 1 + album.images.length) % album.images.length;
    setCurrentIndex(prevIndex);
    setModalImg(album.images[prevIndex]);
  };

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
    <div className={styles.albumGallery}>
      <div className={styles.navPanel}>
        <h2 className={styles.albumTitleMob}>{album.title}</h2>
        <div className={styles.navWrapper}>
          <button className={styles.backButton} onClick={onBack}>
            &lt; До альбомів
          </button>

          <h2 className={styles.albumTitle}>{album.title}</h2>

          <button className={styles.nextButton} onClick={nextAlbum}>
            Наступний альбом &gt;
          </button>
        </div>
      </div>

      <div className={styles.gallery}>
        {album.images.map((item, index) => (
          <div
            key={item.id}
            className={styles.imageCard}
            onClick={() => openModal(item, index)}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={250}
              height={188}
              className={styles.image}
            />
          </div>
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
    </div>
  );
};

export default AlbumGallery;
