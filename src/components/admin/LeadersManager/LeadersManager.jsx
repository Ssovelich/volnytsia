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
import PageLoader from "@/components/PageLoader/PageLoader";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import LeaderCard from "../LeaderCard/LeaderCard";
import LeaderModal from "../LeaderModal/LeaderModal";
import AdminHeader from "../AdminHeader/AdminHeader";
import styles from "./LeadersManager.module.scss";
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
    try {
      if (editData) {
        await dispatch(updateLeader({ id: editData._id, formData })).unwrap();
      } else {
        await dispatch(addLeader(formData)).unwrap();
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  if (status === "loading" && leaders.length === 0) return <PageLoader />;

  const noItems =
    (status === "succeeded" || status === "failed" || status === "idle") &&
    leaders.length === 0;

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
        onConfirm={async () => {
          await dispatch(deleteLeader(deleteModal.id));
          setDeleteModal({ isOpen: false, id: null });
        }}
        title="Видалити керівника?"
        message="Ця дія видалить усі дані про керівника безповоротно."
      />
    </div>
  );
}
