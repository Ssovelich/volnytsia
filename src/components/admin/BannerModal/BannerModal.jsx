"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBanner, updateBanner } from "@/lib/banners/bannersSlice";
import { toast } from "react-hot-toast";
import { getDisplayName, formatName } from "@/lib/formattersName";
import styles from "./BannerModal.module.scss";
import AdminModalActions from "../AdminModalActions/AdminModalActions";
import AdminModalHeader from "../AdminModalHeader/AdminModalHeader";
import AdminFileInput from "../AdminAddFileInput/AdminAddFileInput";

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

    if (!editData && !file) {
      toast.error("Будь ласка, оберіть зображення для банера!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("order", order);
    if (file) formData.append("image", file);

    const displayName = getDisplayName(editData, "banner");
    const formattedName = formatName(displayName);

    try {
      if (editData) {
        await dispatch(updateBanner({ id: editData._id, formData })).unwrap();
        toast.success(`${formattedName} оновлено!`);
      } else {
        await dispatch(addBanner(formData)).unwrap();
        toast.success(`${formattedName} додано!`);
      }
      onClose();
    } catch (err) {
      toast.error(`Помилка збереження: ${displayName}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <AdminModalHeader
          title={editData ? "Редагувати слайд" : "Додати новий слайд"}
          onClose={onClose}
        />

        <form onSubmit={handleSubmit} className={styles.form}>
          <AdminFileInput
            label="Зображення (1390x480 рекомендується)"
            onChange={setFile}
            fileName={file?.name}
            disabled={loading}
          />

          <div className={styles.inputGroup}>
            <label className={styles.label}>Порядок сортування</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className={styles.textInput}
              disabled={loading}
            />
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
