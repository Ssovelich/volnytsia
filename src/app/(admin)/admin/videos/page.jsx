"use client";

import { useState } from "react";
import VideoManager from "@/components/admin/VideoManager/VideoManager";
import VideoModal from "@/components/admin/VideoModal/VideoModal";
import styles from "./VideosPage.module.scss";
import AdminHeader from "@/components/admin/AdminHeader/AdminHeader";

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
      <AdminHeader
        title="Відеогалерея"
        onAdd={handleOpenCreate}
        btnText="+ Додати відео"
      />

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
