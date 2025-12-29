"use client";

import { useEffect, useState, useCallback } from "react";
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

  const DEFAULT_AWARD_IMG = "/default-award.png";

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAwards());
    }
  }, [status, dispatch]);

  const openModal = (item) => {
    setModalImg(item);
    setIsImageLoading(true);
  };

  const closeModal = () => setModalImg(null);

  const handleImageError = useCallback((e) => {
    if (e.target.src !== window.location.origin + DEFAULT_AWARD_IMG) {
      e.target.src = DEFAULT_AWARD_IMG;
    }
  }, []);

  const { visibleItems, loadMoreButton } = LoadMoreButton({
    data: awards,
    mobile: 4,
    tablet: 8,
    desktop: 20,
  });

  if (status === "loading" && awards.length === 0) {
    return <PageLoader />;
  }

  const isActuallyEmpty = status === "succeeded" && awards.length === 0;

  if (status === "failed" && awards.length === 0) {
    return (
      <main>
        <SectionWrapper title={"Наші нагороди та відзнаки"}>
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>
              На жаль, виникла проблема з доступом до даних.
            </p>
            <button
              className={styles.retryBtn}
              onClick={() => dispatch(fetchAwards())}
            >
              Спробувати знову
            </button>
          </div>
        </SectionWrapper>
      </main>
    );
  }

  return (
    <main>
      <SectionWrapper title={"Наші нагороди та відзнаки"}>
        <p className={styles.description}>{awardsText}</p>

        {isActuallyEmpty ? (
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
                  src={item.images?.thumbnail || DEFAULT_AWARD_IMG}
                  alt={item.alt || "Нагорода"}
                  width={200}
                  height={301}
                  onClick={() => openModal(item)}
                  className={styles.modalImage}
                  onError={handleImageError}
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
              src={modalImg.images?.full || DEFAULT_AWARD_IMG}
              alt={modalImg.alt || "Нагорода"}
              width={900}
              height={1200}
              onLoadingComplete={() => setIsImageLoading(false)}
              className={styles.modalImage}
              onError={(e) => {
                handleImageError(e);
                setIsImageLoading(false);
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
