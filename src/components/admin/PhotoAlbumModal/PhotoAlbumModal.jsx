"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addAlbum, updateAlbum } from "@/lib/galleryPhoto/galleryPhotoSlice";
import { toast } from "react-hot-toast";
import { getDisplayName, formatName } from "@/lib/formattersName";
import AdminModalActions from "../AdminModalActions/AdminModalActions";
import AdminModalHeader from "../AdminModalHeader/AdminModalHeader";
import styles from "./PhotoAlbumModal.module.scss";
import AdminFileInput from "../AdminAddFileInput/AdminAddFileInput";

export default function PhotoAlbumModal({ isOpen, onClose, editData = null }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(0);
  const [cover, setCover] = useState(null);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    if (editData) {
      setTitle(editData.title || "");
      setOrder(editData.order || 0);
      setCover(null);
    } else {
      setTitle("");
      setOrder(0);
      setCover(null);
      setImages(null);
    }
    setTimeout(() => firstInputRef.current?.focus(), 100);
  }, [isOpen, editData]);

  if (!isOpen) return null;

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Введіть назву альбому!");
      return;
    }

    if (!editData) {
      if (!cover) {
        toast.error("Будь ласка, оберіть обкладинку альбому!");
        return;
      }
      if (!images || images.length === 0) {
        toast.error("Додайте хоча б одне фото до альбому!");
        return;
      }
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("order", Number(order));

    if (cover) {
      formData.append("cover", cover);
    }

    if (!editData && images) {
      Array.from(images).forEach((file) => {
        formData.append("images", file);
      });
    }

    const currentAlbumData = { title };
    const displayName = getDisplayName(currentAlbumData, "album");
    const formattedName = formatName(displayName);

    try {
      if (editData) {
        await dispatch(
          updateAlbum({ id: editData._id, formData })
        ).unwrap();
        toast.success(`Альбом ${formattedName} оновлено!`);
      } else {
        await dispatch(addAlbum(formData)).unwrap();
        toast.success(`Альбом ${formattedName} створено!`);
      }
      
      onClose();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(`Помилка: ${error.message || "не вдалося зберегти"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <AdminModalHeader
          title={editData ? "Редагувати альбом" : "Створити фотоальбом"}
          onClose={onClose}
        />

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Назва альбому</label>
              <input
                ref={firstInputRef}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.textInput}
                placeholder="Наприклад: Виступ у Києві 2024"
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

            <AdminFileInput
              label={editData ? "Змінити обкладинку (необов'язково)" : "Обкладинка альбому"}
              onChange={(file) => setCover(file)}
              fileName={cover?.name}
              disabled={loading}
            />

            {!editData && (
              <AdminFileInput
                label="Фотографії альбому"
                onChange={(files) => setImages(files)}
                fileName={
                  images ? `Вибрано ${images.length} фото` : "Файли не вибрано"
                }
                disabled={loading}
                multiple={true}
              />
            )}
          </div>

          <AdminModalActions
            onClose={onClose}
            loading={loading}
            submitText={editData ? "Оновити" : "Завантажити альбом"}
          />
        </form>
      </div>
    </div>
  );
}