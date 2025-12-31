"use client";

import { useState } from 'react';
import AwardsManager from '@/components/admin/AwardsManager/AwardsManager';
import AddAwardModal from '@/components/admin/AddAwardModal/AddAwardModal';
import styles from "./AwardsPage.module.scss";
import AdminHeader from '@/components/admin/AdminHeader/AdminHeader';

export default function AwardsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <AdminHeader 
        title="Відзнаки" 
        onAdd={() => setIsModalOpen(true)} 
        btnText="+ Додати відзнаку" 
      />

      <AwardsManager />

      <AddAwardModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}