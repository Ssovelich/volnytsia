"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addVideo, updateVideo } from "@/lib/videoGallery/videoGallerySlice";
import { HiX } from "react-icons/hi";
import styles from "./VideoModal.module.scss";

export default function VideoModal({ isOpen, onClose, editData = null }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(false);

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    if (editData) {
      setTitle(editData.title || "");
      setUrl(editData.url || "");
      setOrder(editData.order || 0);
    } else {
      setTitle("");
      setUrl("");
      setOrder(0);
    }

    const timer = setTimeout(() => firstInputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, [isOpen, editData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const videoData = {
      title,
      url,
      order: Number(order),
    };

    try {
      if (editData) {
        await dispatch(
          updateVideo({ id: editData._id, formData: videoData })
        ).unwrap();
      } else {
        await dispatch(addVideo(videoData)).unwrap();
      }
      onClose();
    } catch (error) {
      console.error("Operation error:", error);
      alert("Помилка при збереженні відео");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>
            {editData ? "Редагувати відео" : "Додати відео YouTube"}
          </h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            type="button"
            aria-label="Закрити"
          >
            <HiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Назва відео</label>
              <input
                ref={firstInputRef}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className={styles.textInput}
                placeholder="Введіть назву..."
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Посилання YouTube</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className={styles.textInput}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Порядок сортування</label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className={styles.textInput}
                min="0"
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
              disabled={loading}
            >
              Скасувати
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Збереження..." : "Зберегти"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
