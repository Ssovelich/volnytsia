"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners, deleteBanner } from "@/lib/banners/bannersSlice";
import BannerCard from "../BannerCard/BannerCard";
import BannerModal from "../BannerModal/BannerModal";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminEmptyState from "../AdminEmptyState/AdminEmptyState";
import PageLoader from "@/components/PageLoader/PageLoader";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import styles from "./BannerManager.module.scss";

export default function BannerManager() {
  const dispatch = useDispatch();
  const { items: banners, status } = useSelector((state) => state.banners);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBanners());
    }
  }, [status, dispatch]);

  const { visibleItems, loadMoreButton } = LoadMoreButton({
    data: banners,
    mobile: 3,
    tablet: 4,
    desktop: 5,
  });

  const handleOpenCreate = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (banner) => {
    setEditData(banner);
    setIsModalOpen(true);
  };

  if (status === "loading" && banners.length === 0) return <PageLoader />;

  const noItems =
    (status === "succeeded" || status === "failed" || status === "idle") &&
    banners.length === 0;

  return (
    <div className={styles.container}>
      <AdminHeader
        title="Керування Банером"
        onAdd={handleOpenCreate}
        btnText="+ Додати слайд"
      />

      <div className={styles.managerWrapper}>
        {noItems ? (
          <AdminEmptyState
            isFailed={status === "failed"}
            onRetry={() => dispatch(fetchBanners())}
            message={
              status === "failed"
                ? "На жаль, виникла проблема з доступом до даних."
                : "Слайдів поки що немає. Ви можете додати перший!"
            }
          />
        ) : (
          <>
            <div className={styles.bannerList}>
              {visibleItems.map((banner) => (
                <BannerCard
                  key={banner._id}
                  banner={banner}
                  onEdit={() => handleOpenEdit(banner)}
                  onDelete={() =>
                    setDeleteModal({ isOpen: true, id: banner._id })
                  }
                />
              ))}
            </div>

            <div>{loadMoreButton}</div>
          </>
        )}
      </div>

      <BannerModal
        key={editData ? editData._id : "new-banner"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editData={editData}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={async () => {
          await dispatch(deleteBanner(deleteModal.id));
          setDeleteModal({ isOpen: false, id: null });
        }}
        title="Видалити слайд?"
        message="Це зображення буде видалено з банеру назавжди."
      />
    </div>
  );
}
