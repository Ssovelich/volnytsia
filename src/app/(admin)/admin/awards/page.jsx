"use client";

import { useState } from 'react';
import AwardsManager from '@/components/admin/AwardsManager/AwardsManager';
import AddAwardModal from '@/components/admin/AddAwardModal/AddAwardModal';
import styles from "./AwardsPage.module.scss";

export default function AwardsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Відзнаки</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className={styles.addButton}
        >
          + Додати відзнаку
        </button>
      </header>

      <AwardsManager />

      <AddAwardModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}