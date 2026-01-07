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
  centered = false,
  multiple = false,
}) {
  const handleFileChange = (e) => {
    if (disabled) return;
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (multiple) {
      onChange(files);
    } else {
      onChange(files[0]);
    }
  };

  return (
    <div className={`${styles.inputGroup} ${centered ? styles.centered : ""}`}>
      {label && (
        <label className={styles.label}>
          {label}
          {required}
        </label>
      )}
      <div className={styles.uploadContainer}>
        <label
          className={`${styles.customUploadBtn} ${
            disabled ? styles.disabled : ""
          }`}
        >
          <MdCloudUpload />
          <span>{multiple ? "Обрати файли" : "Обрати файл"}</span>
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            required={required}
            disabled={disabled}
            multiple={multiple}
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
