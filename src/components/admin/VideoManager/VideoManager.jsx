"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos, deleteVideo } from "@/lib/videoGallery/videoGallerySlice";
import VideoCard from "../VideoCard/VideoCard";
import VideoModal from "../VideoModal/VideoModal";
import PageLoader from "@/components/PageLoader/PageLoader";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import AdminHeader from "../AdminHeader/AdminHeader";
import styles from "./VideoManager.module.scss";
import AdminEmptyState from "../AdminEmptyState/AdminEmptyState";

export default function VideoManager() {
  const dispatch = useDispatch();
  const { items: videos, status } = useSelector((state) => state.galleryVideos);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVideos());
    }
  }, [status, dispatch]);

  const { visibleItems, loadMoreButton } = LoadMoreButton({
    data: videos,
    mobile: 4,
    tablet: 6,
    desktop: 8,
  });

  const handleOpenCreate = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (video) => {
    setEditData(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  if (status === "loading" && videos.length === 0) return <PageLoader />;

  const noItems =
    (status === "succeeded" || status === "failed" || status === "idle") &&
    videos.length === 0;

  return (
    <div className={styles.container}>
      <AdminHeader
        title="Відеогалерея"
        onAdd={handleOpenCreate}
        btnText="+ Додати відео"
      />

      <div className={styles.managerWrapper}>
        {noItems ? (
          <AdminEmptyState
            isFailed={status === "failed"}
            onRetry={() => dispatch(fetchMembers())}
            message={
              status === "failed"
                ? "На жаль, виникла проблема з доступом до даних."
                : "Відео поки що немає. Ви можете додати перше!"
            }
          />
        ) : (
          <>
            <div className={styles.grid}>
              {visibleItems.map((video) => (
                <VideoCard
                  key={video._id}
                  video={video}
                  onEdit={handleOpenEdit}
                  onDelete={() =>
                    setDeleteModal({ isOpen: true, id: video._id })
                  }
                />
              ))}
            </div>
            <div className={styles.loadMoreContainer}>{loadMoreButton}</div>
          </>
        )}
      </div>

      <VideoModal
        key={editData ? editData._id : "new-video"}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editData={editData}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={async () => {
          await dispatch(deleteVideo(deleteModal.id));
          setDeleteModal({ isOpen: false, id: null });
        }}
        title="Видалити відео?"
        message="Це відео буде видалено з галереї назавжди."
      />
    </div>
  );
}
