"use client";

import { MdCloudUpload } from "react-icons/md";
import styles from "./AdminAddFileInput.module.scss";

export default function AdminFileInput({
  label,
  onChange,
  fileName,
  required = false,
  accept = "image/*",
  disabled = false,
}) {
  return (
    <div className={styles.inputGroup}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && "*"}
        </label>
      )}
      <div className={styles.uploadContainer}>
        <label
          className={`${styles.customUploadBtn} ${
            disabled ? styles.disabled : ""
          }`}
        >
          <MdCloudUpload />
          <span>Обрати файл</span>
          <input
            type="file"
            accept={accept}
            onChange={(e) => onChange(e.target.files[0])}
            required={required}
            disabled={disabled}
            hidden
          />
        </label>
        <span className={styles.fileName}>
          {fileName ? fileName : "Файл не вибрано"}
        </span>
      </div>
    </div>
  );
}
