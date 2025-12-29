"use client";

import { useState } from "react";
import VideoManager from "@/components/admin/VideoManager/VideoManager";
import VideoModal from "@/components/admin/VideoModal/VideoModal";
import styles from "./VideosPage.module.scss";

export default function VideosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Відеогалерея</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.addButton}
        >
          + Додати відео
        </button>
      </header>

      <VideoManager />

      <VideoModal
        key={isModalOpen ? "modal-open" : "modal-closed"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}