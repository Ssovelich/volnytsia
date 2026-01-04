"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAwards } from "@/lib/awards/awardsSlice";
import { HiX } from "react-icons/hi";
import { MdCloudUpload } from "react-icons/md";
import styles from "./AddAwardModal.module.scss";
import AdminModalActions from "../AdminModalActions/AdminModalActions";

export default function AddAwardModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [fullImage, setFullImage] = useState(null);
  const [thumbImage, setThumbImage] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!fullImage) return alert("Будь ласка, виберіть основне зображення");

    setLoading(true);
    const formData = new FormData();
    formData.append("image", fullImage);

    if (thumbImage) {
      formData.append("thumbnail", thumbImage);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/awards`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        dispatch(fetchAwards());
        setFullImage(null);
        setThumbImage(null);
        onClose();
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>Додати нагороду</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Закрити"
          >
            <HiX />
          </button>
        </div>

        <form onSubmit={handleUpload} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Основне зображення*</label>
            <div className={styles.uploadContainer}>
              <label className={styles.customUploadBtn}>
                <MdCloudUpload />
                <span>Обрати файл</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFullImage(e.target.files[0])}
                  required
                  hidden
                />
              </label>
              <span className={styles.fileName}>
                {fullImage ? fullImage.name : "Файл не вибрано"}
              </span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Мініатюра (необов’язково)</label>
            <div className={styles.uploadContainer}>
              <label className={styles.customUploadBtn}>
                <MdCloudUpload />
                <span>Обрати файл</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbImage(e.target.files[0])}
                  hidden
                />
              </label>
              <span className={styles.fileName}>
                {thumbImage ? thumbImage.name : "Файл не вибрано"}
              </span>
            </div>
          </div>

          <AdminModalActions
                      onClose={onClose}
                      loading={loading}
                      submitText={"Зберегти"}
                    />
        </form>
      </div>
    </div>
  );
}
