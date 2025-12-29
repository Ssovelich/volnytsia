"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAwards, deleteAward } from "@/lib/awards/awardsSlice";
import Image from "next/image";
import PageLoader from "@/components/PageLoader/PageLoader";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import { MdOutlineDeleteForever } from "react-icons/md";
import styles from "./AwardsManager.module.scss";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { formatDate } from "@/lib/formatDate";

export default function AwardsManager() {
  const dispatch = useDispatch();
  const { items: awards, status } = useSelector((state) => state.awards);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAwards());
    }
  }, [status, dispatch]);

  const { visibleItems, loadMoreButton } = LoadMoreButton({
    data: awards,
    mobile: 4,
    tablet: 8,
    desktop: 20,
  });

  const openDeleteModal = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, id: null });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.id) {
      dispatch(deleteAward(deleteModal.id));
    }
  };

  if (status === "loading" && awards.length === 0) return <PageLoader />;

  const noItems =
    (status === "succeeded" || status === "failed" || status === "idle") &&
    awards.length === 0;

  if (noItems) {
    return (
      <div className={styles.emptyWrapper}>
        <p className={styles.emptyText}>
          {status === "failed"
            ? "На жаль, виникла проблема з доступом до даних."
            : "Відзнак поки що немає. Ви можете додати першу!"}
        </p>
        {status === "failed" && (
          <button
            onClick={() => dispatch(fetchAwards())}
            className={styles.retryBtn}
          >
            Спробувати знову
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={styles.managerWrapper}>
      <div className={styles.awardsList}>
        {visibleItems.map((award) => (
          <div key={award._id} className={styles.awardItem}>
            <div className={styles.imageWrapper}>
              <Image
                src={award.images?.thumbnail}
                alt={award.alt || "award"}
                fill
                sizes="(max-width: 744px) 100vw, 218px"
                className="object-cover"
                priority={false}
              />
            </div>

            <p className={styles.created}>
              Додано: {formatDate(award.createdAt)}
            </p>

            <button
              onClick={() => openDeleteModal(award._id)}
              className={styles.deleteBtn}
              title="Видалити"
            >
              <MdOutlineDeleteForever />
            </button>
          </div>
        ))}
      </div>

      <div>{loadMoreButton}</div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Видалити відзнаку?"
        message="Ви впевнені, що хочете видалити цю нагороду?"
      />
    </div>
  );
}
