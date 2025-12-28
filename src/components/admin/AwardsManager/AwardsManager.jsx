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

export default function AwardsManager() {
  const dispatch = useDispatch();
  const { items: awards, status } = useSelector((state) => state.awards);
  const [deleteModal, setDeleteModal] = useState({ 
    isOpen: false, 
    id: null 
  });

  useEffect(() => {
    dispatch(fetchAwards());
  }, [dispatch]);

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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  if (status === "loading" && awards.length === 0) return <PageLoader />;

  if (status === "idle" || (status === "succeeded" && awards.length === 0)) {
    return (
      <div className={styles.emptyWrapper}>
        <p className={styles.emptyText}>
          Відзнак поки що немає. Ви можете додати першу!
        </p>
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

      <div className={styles.paginationWrapper}>{loadMoreButton}</div>

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