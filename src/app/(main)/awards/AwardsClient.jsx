"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAwards } from "@/lib/awards/awardsSlice";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper";
import { awardsText } from "@/data/awardsData";
import Image from "next/image";
import styles from "./awardsPage.module.scss";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import PageLoader from "@/components/PageLoader/PageLoader";

export default function AwardsClient() {
  const dispatch = useDispatch();
  const { items: awards, status } = useSelector((state) => state.awards);
  const [modalImg, setModalImg] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchAwards());
  }, [dispatch]);

  const openModal = (item) => {
    setModalImg(item);
    setIsImageLoading(true);
  };
  const closeModal = () => setModalImg(null);

  const { visibleItems, loadMoreButton } = LoadMoreButton({
    data: awards,
    mobile: 4,
    tablet: 8,
    desktop: 20,
  });

  if (status === "loading" && awards.length === 0) {
    return <PageLoader />;
  }

  const isEmpty = status === "succeeded" && awards.length === 0;

  return (
    <main>
      <SectionWrapper title={"Наші нагороди та відзнаки"}>
        <p className={styles.description}>{awardsText}</p>

        {isEmpty ? (
          <div className={styles.emptyState}>
            <p>
              На даний момент розділ оновлюється. Незабаром тут з’являться наші
              нові досягнення!
            </p>
          </div>
        ) : (
          <>
            <div className={styles.awardsList}>
              {visibleItems.map((item) => (
                <Image
                  key={item._id}
                  src={item.images?.thumbnail}
                  alt={item.alt || "Нагорода"}
                  width={200}
                  height={301}
                  onClick={() => openModal(item)}
                  className={styles.modalImage}
                />
              ))}
            </div>
            {loadMoreButton}
          </>
        )}
      </SectionWrapper>

      {modalImg && (
        <div className={styles.backdrop} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              ✕
            </button>

            {isImageLoading && <PageLoader />}

            <Image
              src={modalImg.images?.full}
              alt={modalImg.alt || "Нагорода"}
              width={900}
              height={1200}
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </main>
  );
}
