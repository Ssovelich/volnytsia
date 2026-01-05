"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCopyright,
  updateCopyright,
} from "@/lib/copyright/copyrightSlice";
import { fetchSocials, deleteSocial } from "@/lib/socials/socialsSlice";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminCardActions from "../AdminCardActions/AdminCardActions";
import SocialModal from "../SocialModal/SocialModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import PageLoader from "@/components/PageLoader/PageLoader";
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

  const handleSaveCopyright = () => {
    dispatch(updateCopyright({ key: "footer_copy", value: copyText }));
    alert("Копірайт оновлено!");
  };

  if (copyStatus === "loading" || socialsStatus === "loading")
    return <PageLoader />;

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
            placeholder="Напр.: Княжа Вольниця, 2026. Всі права захищено."
          />
          <button onClick={handleSaveCopyright} className={styles.saveBtn}>
            Зберегти
          </button>
        </div>
      </section>

      <SocialModal
        key={editData?._id || "new-social"}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        editData={editData}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={async () => {
          await dispatch(deleteSocial(deleteModal.id));
          setDeleteModal({ isOpen: false, id: null });
        }}
        title="Видалити посилання?"
      />
    </div>
  );
}
