"use client";

import { HiX } from "react-icons/hi";
import styles from "./AdminModalHeader.module.scss";

export default function AdminModalHeader({ title, onClose }) {
  return (
    <div className={styles.modalHeader}>
      <h2 className={styles.title}>{title}</h2>
      <button
        className={styles.closeBtn}
        onClick={onClose}
        type="button"
        aria-label="Закрити"
      >
        <HiX />
      </button>
    </div>
  );
}
