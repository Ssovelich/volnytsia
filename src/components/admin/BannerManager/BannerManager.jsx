"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners, deleteBanner } from "@/lib/banners/bannersSlice";
import { toast } from "react-hot-toast";
import { getDisplayName } from "@/lib/formattersName";
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

  const handleDeleteConfirm = async () => {
    const bannerToDelete = banners.find((b) => b._id === deleteModal.id);
    const displayName = getDisplayName(bannerToDelete, "banner");

    try {
      setDeleteModal({ isOpen: false, id: null });
      await dispatch(deleteBanner(deleteModal.id)).unwrap();
      toast.success(`${displayName} видалено`);
    } catch (error) {
      toast.error(`Не вдалося видалити ${displayName}`);
    }
  };

  if (status === "loading" && banners.length === 0) return <PageLoader />;

  const noItems =
    (status === "succeeded" || status === "failed" || status === "idle") &&
    banners.length === 0;

  const deleteDisplayName = getDisplayName(
    banners.find((b) => b._id === deleteModal.id),
    "banner"
  );

  return (
    <div className={styles.container}>
      <AdminHeader
        title="Керування Банером"
        onAdd={() => {
          setEditData(null);
          setIsModalOpen(true);
        }}
        btnText="+ Додати слайд"
      />

      <div className={styles.managerWrapper}>
        {noItems ? (
          <AdminEmptyState
            isFailed={status === "failed"}
            onRetry={() => dispatch(fetchBanners())}
            message={
              status === "failed"
                ? "Проблема з доступом до даних."
                : "Слайдів поки немає."
            }
          />
        ) : (
          <>
            <div className={styles.bannerList}>
              {visibleItems.map((banner) => (
                <BannerCard
                  key={banner._id}
                  banner={banner}
                  onEdit={() => {
                    setEditData(banner);
                    setIsModalOpen(true);
                  }}
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
        onConfirm={handleDeleteConfirm}
        title="Видалити слайд?"
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
