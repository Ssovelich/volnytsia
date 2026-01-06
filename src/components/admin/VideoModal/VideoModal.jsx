"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addVideo, updateVideo } from "@/lib/videoGallery/videoGallerySlice";
import { toast } from "react-hot-toast";
import { getDisplayName, formatName } from "@/lib/formattersName";
import styles from "./VideoModal.module.scss";
import AdminModalActions from "../AdminModalActions/AdminModalActions";
import AdminModalHeader from "../AdminModalHeader/AdminModalHeader";

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

    const displayName = getDisplayName(videoData, "video");
    const formattedName = formatName(displayName);

    try {
      if (editData) {
        await dispatch(
          updateVideo({ id: editData._id, formData: videoData })
        ).unwrap();
        toast.success(`${formattedName} оновлено!`);
      } else {
        await dispatch(addVideo(videoData)).unwrap();
        toast.success(`${formattedName} додано!`);
      }
      onClose();
    } catch (error) {
      console.error("Operation error:", error);
      toast.error(`Не вдалося зберегти ${displayName}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <AdminModalHeader
          title={editData ? "Редагувати відео" : "Додати відео YouTube"}
          onClose={onClose}
        />

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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>
          </div>

          <AdminModalActions
            onClose={onClose}
            loading={loading}
            submitText={editData ? "Оновити" : "Зберегти"}
          />
        </form>
      </div>
    </div>
  );
}
