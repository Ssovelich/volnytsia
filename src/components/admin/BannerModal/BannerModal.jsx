"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBanner, updateBanner } from "@/lib/banners/bannersSlice";
import { HiX } from "react-icons/hi";
import styles from "./BannerModal.module.scss";

export default function BannerModal({ isOpen, onClose, editData }) {
  const dispatch = useDispatch();
  const [order, setOrder] = useState(0);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setOrder(editData.order);
    } else {
      setOrder(0);
    }
    setFile(null);
  }, [editData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("order", order);
    if (file) formData.append("image", file);

    try {
      if (editData) {
        await dispatch(updateBanner({ id: editData._id, formData })).unwrap();
      } else {
        await dispatch(addBanner(formData)).unwrap();
      }
      onClose();
    } catch (err) {
      alert("Помилка збереження");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>
            {editData ? "Редагувати слайд" : "Додати новий слайд"}
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
          <div className={styles.inputGroup}>
            <label>Зображення (1390x480 рекомендується)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              required={!editData}
              className={styles.textInput}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Порядок сортування</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className={styles.textInput}
            />
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitBtn}
            >
              {loading ? "Збереження..." : "Зберегти"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
