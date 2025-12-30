"use client";

import { useState } from "react";
import VideoManager from "@/components/admin/VideoManager/VideoManager";
import VideoModal from "@/components/admin/VideoModal/VideoModal";
import styles from "./VideosPage.module.scss";

export default function VideosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Відеогалерея</h1>
        <button onClick={handleOpenCreate} className={styles.addButton}>
          + Додати відео
        </button>
      </header>

      <VideoManager onEditVideo={handleOpenEdit} />

      <VideoModal
        key={editData ? editData._id : "new-video"}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editData={editData}
      />
    </div>
  );
}
