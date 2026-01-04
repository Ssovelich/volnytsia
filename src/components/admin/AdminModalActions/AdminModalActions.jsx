"use client";

import styles from "./AdminModalActions.module.scss";

export default function AdminModalActions({
  onClose,
  loading,
  submitText = "Зберегти",
  cancelText = "Скасувати",
  type = "submit",
}) {
  return (
    <div className={styles.actions}>
      <button
        type="button"
        onClick={onClose}
        className={styles.cancelBtn}
        disabled={loading}
      >
        {cancelText}
      </button>
      <button type={type} className={styles.submitBtn} disabled={loading}>
        {loading ? "Збереження..." : submitText}
      </button>
    </div>
  );
}
