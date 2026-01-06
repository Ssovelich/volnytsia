"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeaders,
  addLeader,
  updateLeader,
  deleteLeader,
} from "@/lib/leaders/leadersSlice";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { toast } from "react-hot-toast";
import PageLoader from "@/components/PageLoader/PageLoader";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import LeaderCard from "../LeaderCard/LeaderCard";
import LeaderModal from "../LeaderModal/LeaderModal";
import AdminHeader from "../AdminHeader/AdminHeader";
import styles from "./LeadersManager.module.scss";
import { getDisplayName } from "@/lib/formattersName";
import AdminEmptyState from "../AdminEmptyState/AdminEmptyState";

export default function LeadersManager() {
  const dispatch = useDispatch();
  const { items: leaders, status } = useSelector((state) => state.leaders);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLeaders());
    }
  }, [status, dispatch]);

  const { visibleItems, loadMoreButton } = LoadMoreButton({
    data: leaders,
    mobile: 4,
    tablet: 8,
    desktop: 12,
  });

  const handleOpenCreate = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (leader) => {
    setEditData(leader);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    const displayName = getDisplayName(formData, "leader");

    try {
      if (editData) {
        await dispatch(updateLeader({ id: editData._id, formData })).unwrap();
        toast.success(`${displayName} оновлено!`);
      } else {
        await dispatch(addLeader(formData)).unwrap();
        toast.success(`${displayName} додано!`);
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error(`Помилка збереження ${displayName}`);
    }
  };

  const handleDeleteConfirm = async () => {
    const itemToDelete = leaders.find((l) => l._id === deleteModal.id);
    const displayName = getDisplayName(itemToDelete, "leader");

    try {
      setDeleteModal({ isOpen: false, id: null });
      await dispatch(deleteLeader(deleteModal.id)).unwrap();
      toast.success(`${displayName} видалено`);
    } catch (error) {
      toast.error(`Не вдалося видалити ${displayName}`);
    }
  };

  if (status === "loading" && leaders.length === 0) return <PageLoader />;

  const noItems =
    (status === "succeeded" || status === "failed" || status === "idle") &&
    leaders.length === 0;

  const deleteDisplayName = getDisplayName(
    leaders.find((l) => l._id === deleteModal.id),
    "leader"
  );

  return (
    <div className={styles.container}>
      <AdminHeader
        title="Керівники колективу"
        onAdd={handleOpenCreate}
        btnText="+ Додати керівника"
      />

      <div>
        {noItems ? (
          <AdminEmptyState
            isFailed={status === "failed"}
            onRetry={() => dispatch(fetchLeaders())}
            message={
              status === "failed"
                ? "На жаль, виникла проблема з доступом до даних."
                : "Керівників поки що немає. Ви можете додати першого!"
            }
          />
        ) : (
          <>
            <div className={styles.grid}>
              {visibleItems.map((leader) => (
                <LeaderCard
                  key={leader._id}
                  leader={leader}
                  onEdit={() => handleOpenEdit(leader)}
                  onDelete={() =>
                    setDeleteModal({ isOpen: true, id: leader._id })
                  }
                />
              ))}
            </div>
            <div>{loadMoreButton}</div>
          </>
        )}
      </div>

      <LeaderModal
        key={editData ? editData._id : "new-leader"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editData={editData}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDeleteConfirm}
        title="Видалити керівника?"
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
