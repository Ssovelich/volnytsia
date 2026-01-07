"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums, deleteAlbum } from "@/lib/galleryPhoto/galleryPhotoSlice";
import { toast } from "react-hot-toast";
import { getDisplayName } from "@/lib/formattersName";
import PageLoader from "@/components/PageLoader/PageLoader";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminEmptyState from "../AdminEmptyState/AdminEmptyState";
import PhotoAlbumCard from "../PhotoAlbumCard/PhotoAlbumCard";
import PhotoAlbumModal from "../PhotoAlbumModal/PhotoAlbumModal";
import styles from "./GalleryPhotosManager.module.scss";

export default function GalleryPhotosManager() {
  const dispatch = useDispatch();
  const { items: albums, status } = useSelector((state) => state.galleryPhotos);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAlbums());
    }
  }, [status, dispatch]);

  const { visibleItems, loadMoreButton } = LoadMoreButton({
    data: albums,
    mobile: 4,
    tablet: 6,
    desktop: 8,
  });

  const handleOpenCreate = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (album) => {
    setEditData(album);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  const handleDeleteConfirm = async () => {
    const albumToDelete = albums.find((a) => a._id === deleteModal.id);
    const displayName = getDisplayName(albumToDelete, "album");

    try {
      setDeleteModal({ isOpen: false, id: null });
      await dispatch(deleteAlbum(deleteModal.id)).unwrap();
      toast.success(`Альбом "${displayName}" видалено`);
    } catch (error) {
      toast.error(`Не вдалося видалити альбом`);
    }
  };

  if (status === "loading" && albums.length === 0) return <PageLoader />;

  const noItems =
    (status === "succeeded" || status === "failed" || status === "idle") &&
    albums.length === 0;

  const deleteDisplayName = getDisplayName(
    albums.find((a) => a._id === deleteModal.id),
    "album"
  );

  return (
    <div className={styles.container}>
      <AdminHeader
        title="Фотогалерея"
        onAdd={handleOpenCreate}
        btnText="+ Додати альбом"
      />

      <div>
        {noItems ? (
          <AdminEmptyState
            isFailed={status === "failed"}
            onRetry={() => dispatch(fetchAlbums())}
            message={
              status === "failed"
                ? "На жаль, виникла проблема з доступом до даних."
                : "Альбомів поки немає. Ви можете додати перший!"
            }
          />
        ) : (
          <>
            <div className={styles.grid}>
              {visibleItems.map((album) => (
                <PhotoAlbumCard
                  key={album._id}
                  album={album}
                  onEdit={handleOpenEdit}
                  onDelete={() =>
                    setDeleteModal({ isOpen: true, id: album._id })
                  }
                />
              ))}
            </div>
            <div>{loadMoreButton}</div>
          </>
        )}
      </div>

      <PhotoAlbumModal
        key={editData ? editData._id : "new-album"}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editData={editData}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDeleteConfirm}
        title="Видалити фотоальбом?"
        message={
          <>
            Ви впевнені, що хочете видалити альбом <strong>{deleteDisplayName}</strong>{" "}
            з усіма фото?
          </>
        }
      />
    </div>
  );
}
