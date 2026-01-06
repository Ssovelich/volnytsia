"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAwards } from "@/lib/awards/awardsSlice";
import { toast } from "react-hot-toast";
import styles from "./AddAwardModal.module.scss";
import AdminModalActions from "../AdminModalActions/AdminModalActions";
import AdminModalHeader from "../AdminModalHeader/AdminModalHeader";
import AdminFileInput from "../AdminAddFileInput/AdminAddFileInput";
import { getDisplayName } from "@/lib/formattersName";

export default function AddAwardModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [fullImage, setFullImage] = useState(null);
  const [thumbImage, setThumbImage] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!fullImage)
      return toast.error("Будь ласка, виберіть основне зображення");

    setLoading(true);
    const formData = new FormData();
    formData.append("image", fullImage);

    if (thumbImage) {
      formData.append("thumbnail", thumbImage);
    }

    const displayName = getDisplayName(null, "award");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/awards`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success(`${displayName} успішно додано!`);
        dispatch(fetchAwards());
        setFullImage(null);
        setThumbImage(null);
        onClose();
      } else {
        throw new Error("Failed to upload");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(`Помилка при додаванні ${displayName}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <AdminModalHeader title={"Додати нагороду"} onClose={onClose} />

        <form onSubmit={handleUpload} className={styles.form}>
          <AdminFileInput
            label="Основне зображення"
            required
            onChange={setFullImage}
            fileName={fullImage?.name}
            disabled={loading}
          />

          <AdminFileInput
            label="Мініатюра (необов’язково)"
            onChange={setThumbImage}
            fileName={thumbImage?.name}
            disabled={loading}
          />

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
