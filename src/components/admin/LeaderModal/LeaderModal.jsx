"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./LeaderModal.module.scss";
import AdminModalActions from "../AdminModalActions/AdminModalActions";
import AdminModalHeader from "../AdminModalHeader/AdminModalHeader";
import AdminFileInput from "../AdminAddFileInput/AdminAddFileInput";
import TiptapEditor from "../TiptapEditor/TiptapEditor";

export default function LeaderModal({ isOpen, onClose, onSave, editData }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    middle_name: "",
    role: "",
    description: "",
    source: "",
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
        middle_name: editData.middle_name || "",
        role: editData.role || "",
        description: editData.description || "",
        source: editData.source || "",
        order: editData.order || 0,
      });
      setPreview(editData.image || DEFAULT_IMG);
    } else {
      setFormData({
        name: "",
        surname: "",
        middle_name: "",
        role: "",
        description: "",
        source: "",
        order: 0,
      });
      setPreview(DEFAULT_IMG);
    }
    setFile(null);
  }, [editData, isOpen]);

  const handleFileChange = (selectedFile) => {
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
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (file) data.append("image", file);

    try {
      await onSave(data);
    } catch (error) {
      alert("Помилка при збереженні.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <AdminModalHeader
          title={editData ? "Редагувати керівника" : "Додати керівника"}
          onClose={onClose}
        />

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.content}>
            <div className={styles.photoSection}>
              <div className={styles.previewBox}>
                <Image
                  src={preview || DEFAULT_IMG}
                  alt="Прев'ю фото керівника"
                  fill
                  className="object-cover"
                  unoptimized={preview?.startsWith("blob:")}
                />
              </div>

              <AdminFileInput
                onChange={handleFileChange}
                fileName={file?.name}
                label="Фото керівника"
                centered={true}
              />
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
                <label className={styles.label}>По батькові</label>
                <input
                  type="text"
                  value={formData.middle_name}
                  onChange={(e) =>
                    setFormData({ ...formData, middle_name: e.target.value })
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
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  required
                  className={styles.textInput}
                  placeholder="напр. Концертмейстр"
                />
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Опис (Біографія)</label>
                <TiptapEditor
                  value={formData.description}
                  onChange={(content) =>
                    setFormData({ ...formData, description: content })
                  }
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Джерело</label>
                <input
                  type="text"
                  value={formData.source}
                  onChange={(e) =>
                    setFormData({ ...formData, source: e.target.value })
                  }
                  className={styles.textInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Порядок сортування</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({ ...formData, order: Number(e.target.value) })
                  }
                  className={styles.textInput}
                />
              </div>
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
