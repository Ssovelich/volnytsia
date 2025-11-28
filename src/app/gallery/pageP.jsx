"use client";

import { useState } from "react";
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import { galleryData } from "../../data/galleryData";
import styles from "./galleryPage.module.scss";

const GalleryPage = () => {
  const { topParagraph, bottomParagraph, galleryImages } = galleryData;

  const [modalImg, setModalImg] = useState(null);

  const openModal = (img) => setModalImg(img);
  const closeModal = () => setModalImg(null);

  return (
    <main>
      <SectionWrapper title="Наші миті і подорожі">
        <p className={styles.topParagraph}>{topParagraph}</p>

        <div className={styles.galleryList}>
          {galleryImages.map((item) => (
            <Image
              key={item.id}
              src={item.src}
              alt={item.alt}
              width={250}
              height={250}
              className={styles.galleryImage}
              onClick={() => openModal(item)}
            />
          ))}
        </div>

        <p className={styles.bottomParagraph}>{bottomParagraph}</p>

        {modalImg && (
          <div className={styles.backdrop} onClick={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeButton} onClick={closeModal}>
                ✕
              </button>
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
      </SectionWrapper>
    </main>
  );
};

export default GalleryPage;
