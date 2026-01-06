"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAwards, deleteAward } from "@/lib/awards/awardsSlice";
import { toast } from "react-hot-toast";
import PageLoader from "@/components/PageLoader/PageLoader";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import styles from "./AwardsManager.module.scss";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import AddAwardModal from "../AddAwardModal/AddAwardModal";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminEmptyState from "../AdminEmptyState/AdminEmptyState";
import AwardCard from "../AwardCard/AwardCard";
import { getDisplayName } from "@/lib/formattersName";

export default function AwardsManager() {
  const dispatch = useDispatch();
  const { items: awards, status } = useSelector((state) => state.awards);

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleConfirmDelete = async () => {
    if (!deleteModal.id) return;

    const awardToDelete = awards.find((a) => a._id === deleteModal.id);
    const displayName = getDisplayName(awardToDelete, "award");

    try {
      setDeleteModal({ isOpen: false, id: null });
      await dispatch(deleteAward(deleteModal.id)).unwrap();
      toast.success(`${displayName} видалено`);
    } catch (error) {
      toast.error(`Не вдалося видалити ${displayName}`);
    }
  };

  if (status === "loading" && awards.length === 0) return <PageLoader />;

  const noItems =
    (status === "succeeded" || status === "failed" || status === "idle") &&
    awards.length === 0;

  const deleteDisplayName = getDisplayName(
    awards.find((a) => a._id === deleteModal.id),
    "award"
  );

  return (
    <div className={styles.container}>
      <AdminHeader
        title="Відзнаки"
        onAdd={() => setIsModalOpen(true)}
        btnText="+ Додати відзнаку"
      />

      <div className={styles.managerWrapper}>
        {noItems ? (
          <AdminEmptyState
            isFailed={status === "failed"}
            onRetry={() => dispatch(fetchAwards())}
            message={
              status === "failed"
                ? "На жаль, виникла проблема з доступом до даних."
                : "Відзнак поки що немає. Ви можете додати першу!"
            }
          />
        ) : (
          <>
            <div className={styles.grid}>
              {visibleItems.map((award) => (
                <AwardCard
                  key={award._id}
                  award={award}
                  onDelete={(id) => setDeleteModal({ isOpen: true, id })}
                />
              ))}
            </div>

            <div className={styles.loadMoreContainer}>{loadMoreButton}</div>
          </>
        )}
      </div>

      <AddAwardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleConfirmDelete}
        title="Видалити відзнаку?"
        message={
          <>
            Ви впевнені, що хочете видалити <strong>{deleteDisplayName}</strong>
            ?
          </>
        }
      />
    </div>
  );
}
