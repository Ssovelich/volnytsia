"use client";

import styles from "./AdminEmptyState.module.scss";

export default function AdminEmptyState({ 
  message, 
  onRetry, 
  isFailed = false 
}) {
  return (
    <div className={styles.emptyWrapper}>
      <p className={styles.emptyText}>
        {isFailed
          ? message || "На жаль, виникла проблема з доступом до даних."
          : message || "Тут поки що порожньо. Ви можете додати перший елемент!"}
      </p>
      
      {isFailed && onRetry && (
        <button onClick={onRetry} className={styles.retryBtn}>
          Спробувати знову
        </button>
      )}
    </div>
  );
}