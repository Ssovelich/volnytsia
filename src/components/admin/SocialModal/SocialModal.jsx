"use client";

import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addSocial, updateSocial } from "@/lib/socials/socialsSlice";
import styles from "./SocialModal.module.scss";
import AdminModalActions from "../AdminModalActions/AdminModalActions";
import AdminModalHeader from "../AdminModalHeader/AdminModalHeader";
import { HiChevronDown } from "react-icons/hi";

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
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleClose = () => {
    setFormData(initialForm);
    setIsSelectOpen(false);
    onClose();
  };

  const handleSelectOption = (opt) => {
    setFormData({ ...formData, icon: opt.value, alt: opt.label });
    setIsSelectOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData._id) await dispatch(updateSocial(formData)).unwrap();
      else await dispatch(addSocial(formData)).unwrap();
      handleClose();
    } catch (error) {
      alert("Помилка при збереженні");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <AdminModalHeader
          title={editData ? "Редагувати посилання" : "Додати соцмережу"}
          onClose={handleClose}
        />

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Виберіть мережу (іконка)</label>
            <div className={styles.customSelect} ref={selectRef}>
              <div
                className={`${styles.selectTrigger} ${
                  isSelectOpen ? styles.active : ""
                }`}
                onClick={() => !loading && setIsSelectOpen(!isSelectOpen)}
              >
                <span>
                  {
                    ICON_OPTIONS.find((opt) => opt.value === formData.icon)
                      ?.label
                  }
                </span>
                <HiChevronDown
                  className={`${styles.arrow} ${
                    isSelectOpen ? styles.rotate : ""
                  }`}
                />
              </div>

              {isSelectOpen && (
                <div className={styles.selectOptions}>
                  {ICON_OPTIONS.map((opt) => (
                    <div
                      key={opt.value}
                      className={`${styles.option} ${
                        formData.icon === opt.value ? styles.selected : ""
                      }`}
                      onClick={() => handleSelectOption(opt)}
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label>Назва (Alt текст)</label>
            <input
              type="text"
              value={formData.alt}
              onChange={(e) =>
                setFormData({ ...formData, alt: e.target.value })
              }
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
              required
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label>Порядок сортування</label>
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
            onClose={handleClose}
            loading={loading}
            submitText={editData ? "Оновити" : "Зберегти"}
          />
        </form>
      </div>
    </div>
  );
}
