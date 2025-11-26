"use client";

import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import { awardsText, awardsImages } from "./awardsData";
import Image from "next/image";
import styles from "./awardsPage.module.scss";
import { useState } from "react";

const Awards = () => {
  const [modalImg, setModalImg] = useState(null);

  const openModal = (img) => setModalImg(img);
  const closeModal = () => setModalImg(null);

  return (
    <SectionWrapper title={"Наші нагороди та відзнаки"}>
      <p className={styles.description}>{awardsText}</p>
      <div className={styles.awardsList}>
        {awardsImages.map((item) => (
          <Image
            key={item.id}
            src={item.src}
            alt={item.alt}
            width={200}
            height={301}
            onClick={() => openModal(item)}
            className={styles.modalImage}
          />
        ))}
      </div>

      {modalImg && (
        <div className={styles.backdrop} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              ✕
            </button>

            <Image
              src={modalImg.full}
              alt={modalImg.alt}
              width={900}
              height={1200}
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </SectionWrapper>
  );
};

export default Awards;
