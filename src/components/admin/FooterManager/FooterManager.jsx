"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  fetchCopyright,
  updateCopyright,
} from "@/lib/copyright/copyrightSlice";
import {
  fetchSocials,
  deleteSocial,
  addSocial,
  updateSocial,
} from "@/lib/socials/socialsSlice";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminCardActions from "../AdminCardActions/AdminCardActions";
import SocialModal from "../SocialModal/SocialModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import PageLoader from "@/components/PageLoader/PageLoader";
import { getDisplayName } from "@/lib/formattersName";
import styles from "./FooterManager.module.scss";

export default function FooterManager() {
  const dispatch = useDispatch();
  const { data: copyright, status: copyStatus } = useSelector(
    (state) => state.copyright
  );
  const { items: socials, status: socialsStatus } = useSelector(
    (state) => state.socials
  );

  const [copyText, setCopyText] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  useEffect(() => {
    dispatch(fetchCopyright("footer_copy"));
    dispatch(fetchSocials());
  }, [dispatch]);

  if (copyright?.value && !isInitialized) {
    setCopyText(copyright.value);
    setIsInitialized(true);
  }

  const handleSaveCopyright = async () => {
    if (!copyText.trim()) return toast.error("Текст порожній");
    const toastId = toast.loading("Оновлення копірайту...");
    try {
      await dispatch(
        updateCopyright({ key: "footer_copy", value: copyText })
      ).unwrap();
      toast.success("Копірайт оновлено!", { id: toastId });
    } catch (error) {
      toast.error("Помилка при збереженні", { id: toastId });
    }
  };

  const handleSaveSocial = async (data) => {
    const displayName = getDisplayName(data, "social");

    try {
      if (editData) {
        await dispatch(updateSocial({ ...data, _id: editData._id })).unwrap();
        toast.success(`${displayName} оновлено!`);
      } else {
        await dispatch(addSocial(data)).unwrap();
        toast.success(`${displayName} додано!`);
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error(`Помилка збереження ${displayName}`);
    }
  };

  const handleDeleteConfirm = async () => {
    const itemToDelete = socials.find((s) => s._id === deleteModal.id);
    const displayName = getDisplayName(itemToDelete, "social");

    try {
      setDeleteModal({ isOpen: false, id: null });
      await dispatch(deleteSocial(deleteModal.id)).unwrap();
      toast.success(`${displayName} видалено`);
    } catch (error) {
      toast.error(`Не вдалося видалити ${displayName}`);
    }
  };

  if (copyStatus === "loading" || socialsStatus === "loading")
    return <PageLoader />;

  const deleteDisplayName = getDisplayName(
    socials.find((s) => s._id === deleteModal.id),
    "social"
  );

  return (
    <div className={styles.container}>
      <AdminHeader
        title="Налаштування Футера"
        onAdd={() => {
          setEditData(null);
          setIsModalOpen(true);
        }}
        btnText="+ Додати соцмережу"
      />

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Соціальні мережі</h3>
        <div className={styles.socialGrid}>
          {socials.map((social) => (
            <div key={social._id} className={styles.socialCard}>
              <div className={styles.socialInfo}>
                <img
                  src={social.icon}
                  alt={social.alt}
                  className={styles.iconPreview}
                />
                <div>
                  <p className={styles.socialAlt}>{social.alt}</p>
                  <span className={styles.orderBadge}>
                    Порядок: {social.order}
                  </span>
                </div>
              </div>

              <div className={styles.adminActions}>
                <AdminCardActions
                  onEdit={() => {
                    setEditData(social);
                    setIsModalOpen(true);
                  }}
                  onDelete={() =>
                    setDeleteModal({ isOpen: true, id: social._id })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className={styles.divider} />

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Текст копірайту</h3>
        <div className={styles.copyForm}>
          <input
            type="text"
            value={copyText}
            onChange={(e) => setCopyText(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleSaveCopyright} className={styles.saveBtn}>
            Зберегти
          </button>
        </div>
      </section>

      <SocialModal
        key={editData?._id || "new"}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSave={handleSaveSocial}
        editData={editData}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDeleteConfirm}
        title="Видалити?"
        message={
          <>
            Ви впевнені, що хочете видалити <strong>{deleteDisplayName}</strong>
            ?
          </>
        }
      />
    </div>
  );
}
