"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import { MdCloudUpload } from "react-icons/md";
import styles from "./MemberModal.module.scss";

export default function MemberModal({ isOpen, onClose, onSave, editData }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    role: "",
    order: 0,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const DEFAULT_IMG = "/default-avatar.png";

  useEffect(() => {
    if (!isOpen) return;

    if (editData) {
      setFormData({
        name: editData.name || "",
        surname: editData.surname || "",
        role: editData.role || "",
        order: editData.order || 0,
      });
      setPreview(editData.image || DEFAULT_IMG);
    } else {
      setFormData({ name: "", surname: "", role: "", order: 0 });
      setPreview(DEFAULT_IMG);
    }
    setFile(null);
  }, [editData, isOpen]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("surname", formData.surname);
    data.append("role", formData.role);
    data.append("order", formData.order);
    if (file) data.append("image", file);

    try {
      await onSave(data);
      onClose();
    } catch (error) {
      console.error("Save error:", error);
      alert("Помилка при збереженні.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>
            {editData ? "Редагувати учасника" : "Додати учасника"}
          </h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Закрити"
          >
            <HiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.content}>
            <div className={styles.photoSection}>
              <div className={styles.previewBox}>
                {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                    priority
                    unoptimized={preview.startsWith("blob:")}
                  />
                ) : (
                  <div className={styles.placeholder}>Немає фото</div>
                )}
              </div>

              <div className={styles.uploadContainer}>
                <label className={styles.customUploadBtn}>
                  <MdCloudUpload />
                  <span>Обрати фото</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    hidden
                  />
                </label>
                <span className={styles.fileName}>
                  {file ? file.name : "Файл не вибрано"}
                </span>
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Прізвище</label>
                <input
                  type="text"
                  value={formData.surname}
                  onChange={(e) =>
                    setFormData({ ...formData, surname: e.target.value })
                  }
                  required
                  className={styles.textInput}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>{"Ім'я"}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className={styles.textInput}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Роль</label>
                <input
                  type="text"
                  value={formData.role}
                  placeholder="напр. Сопрано"
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  required
                  className={styles.textInput}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Порядок сортування</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData({
                      ...formData,
                      order: val === "" ? "" : Number(val),
                    });
                  }}
                  className={styles.textInput}
                />
              </div>
            </div>
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
