"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./AlbumGallery.module.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const AlbumGallery = ({ album, onBack, nextAlbum }) => {
  const [modalImg, setModalImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  // Відкрити модалку — беремо ВЕЛИКІ фото
  const openModal = (index) => {
    setCurrentIndex(index);
    setModalImg(album.imagesFull[index]);
  };

  const closeModal = () => setModalImg(null);

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % album.imagesFull.length;
    setCurrentIndex(nextIndex);
    setModalImg(album.imagesFull[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex =
      (currentIndex - 1 + album.imagesFull.length) % album.imagesFull.length;
    setCurrentIndex(prevIndex);
    setModalImg(album.imagesFull[prevIndex]);
  };

  // Локер скролу
  useEffect(() => {
    document.body.style.overflow = modalImg ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
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

      {/* ГРІД — показує малi фото (images) */}
      <div className={styles.gallery}>
        {album.images.map((item, index) => (
          <div
            key={item.id}
            className={styles.imageCard}
            onClick={() => openModal(index)}
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

      {/* МОДАЛКА — показує imagesFull */}
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
              width={1100}
              height={1100}
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumGallery;
