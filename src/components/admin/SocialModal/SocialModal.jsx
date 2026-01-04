"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSocial, updateSocial } from "@/lib/socials/socialsSlice";
import styles from "./SocialModal.module.scss";
import AdminModalActions from "../AdminModalActions/AdminModalActions";

const ICON_OPTIONS = [
  { label: "Facebook", value: "/facebook.svg" },
  { label: "YouTube", value: "/youtube.svg" },
  { label: "Instagram", value: "/instagram.svg" },
  { label: "TikTok", value: "/tiktok.svg" },
];

const initialForm = {
  href: "",
  alt: "Facebook",
  icon: "/facebook.svg",
  order: 0,
};

export default function SocialModal({ isOpen, onClose, editData }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(
    editData ? { ...editData } : initialForm
  );

  if (!isOpen) return null;

  const handleIconChange = (e) => {
    const selectedIconValue = e.target.value;
    const selectedOption = ICON_OPTIONS.find(
      (opt) => opt.value === selectedIconValue
    );

    setFormData({
      ...formData,
      icon: selectedIconValue,
      alt: selectedOption ? selectedOption.label : formData.alt,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData._id) {
        await dispatch(updateSocial(formData)).unwrap();
      } else {
        await dispatch(addSocial(formData)).unwrap();
      }
      onClose();
    } catch (error) {
      console.error("Помилка при збереженні:", error);
      alert("Не вдалося зберегти зміни");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{editData ? "Редагувати посилання" : "Додати соцмережу"}</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Виберіть мережу (іконка)</label>
            <select
              value={formData.icon}
              onChange={handleIconChange}
              disabled={loading}
            >
              {ICON_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label>Назва (Alt текст)</label>
            <input
              type="text"
              value={formData.alt}
              onChange={(e) =>
                setFormData({ ...formData, alt: e.target.value })
              }
              placeholder="Наприклад: Facebook"
              required
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label>Посилання (URL)</label>
            <input
              type="url"
              value={formData.href}
              onChange={(e) =>
                setFormData({ ...formData, href: e.target.value })
              }
              placeholder="https://facebook.com/..."
              required
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label>Порядок (order)</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: Number(e.target.value) })
              }
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
