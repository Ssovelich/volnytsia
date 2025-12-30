"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos, deleteVideo } from "@/lib/videoGallery/videoGallerySlice";
import VideoCard from "../VideoCard/VideoCard";
import PageLoader from "@/components/PageLoader/PageLoader";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import styles from "./VideoManager.module.scss";

export default function VideoManager({ onEditVideo }) {
  const dispatch = useDispatch();
  const { items: videos, status } = useSelector((state) => state.galleryVideos);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
  });

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

  const openDeleteModal = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, id: null });
  };

  const handleConfirmDelete = async () => {
    if (deleteModal.id) {
      await dispatch(deleteVideo(deleteModal.id));
      closeDeleteModal();
    }
  };

  if (status === "loading" && videos.length === 0) return <PageLoader />;

  const noItems =
    (status === "succeeded" || status === "failed" || status === "idle") &&
    videos.length === 0;

  return (
    <div className={styles.managerWrapper}>
      {noItems ? (
        <div className={styles.emptyWrapper}>
          <p className={styles.emptyText}>
            {status === "failed"
              ? "На жаль, виникла проблема з доступом до даних."
              : "Відео поки що немає. Ви можете додати перше!"}
          </p>
          {status === "failed" && (
            <button
              onClick={() => dispatch(fetchVideos())}
              className={styles.retryBtn}
            >
              Спробувати знову
            </button>
          )}
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {visibleItems.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
                onEdit={onEditVideo}
                onDelete={() => openDeleteModal(video._id)}
              />
            ))}
          </div>
          <div>{loadMoreButton}</div>
        </>
      )}

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Видалити відео?"
        message="Це відео буде видалено з галереї назавжди."
      />
    </div>
  );
}
