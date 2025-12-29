"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMembers,
  addMember,
  updateMember,
  deleteMember,
} from "@/lib/members/membersSlice";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import PageLoader from "@/components/PageLoader/PageLoader";
import styles from "./MembersManager.module.scss";
import MemberCard from "../MemberCard/MemberCard";
import MemberModal from "../MemberModal/MemberModal";

export default function MembersManager() {
  const dispatch = useDispatch();
  const { items: members, status } = useSelector((state) => state.members);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMembers());
    }
  }, [status, dispatch]);

  const handleOpenCreate = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member) => {
    setEditData(member);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    if (editData) {
      await dispatch(updateMember({ id: editData._id, formData }));
    } else {
      await dispatch(addMember(formData));
    }
    setIsModalOpen(false);
  };

  if (status === "loading" && members.length === 0) return <PageLoader />;

  const noItems = (status === "succeeded" || status === "failed" || status === "idle") && members.length === 0;

  if (noItems) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Учасники колективу</h1>
          <button onClick={handleOpenCreate} className={styles.addBtn}>
            + Додати учасника
          </button>
        </header>
        <div className={styles.emptyWrapper}>
          <p className={styles.emptyText}>
            {status === "failed" 
              ? `На жаль, виникла проблема з доступом до даних.` 
              : "Учасників поки що немає. Ви можете додати першого!"}
          </p>
          {status === "failed" && (
            <button onClick={() => dispatch(fetchMembers())} className={styles.retryBtn}>
              Спробувати знову
            </button>
          )}
        </div>
        
        <MemberModal
          key="new-empty"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          editData={null}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Учасники колективу</h1>
        <button onClick={handleOpenCreate} className={styles.addBtn}>
          + Додати учасника
        </button>
      </header>

      <div className={styles.membersGrid}>
        {members.map((member) => (
          <MemberCard
            key={member._id}
            member={member}
            onEdit={() => handleOpenEdit(member)}
            onDelete={() => setDeleteModal({ isOpen: true, id: member._id })}
          />
        ))}
      </div>

      <MemberModal
        key={editData ? editData._id : "new"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editData={editData}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={() => dispatch(deleteMember(deleteModal.id))}
        title="Видалити учасника?"
        message="Ця дія видалить усі дані про учасника безповоротно."
      />
    </div>
  );
}