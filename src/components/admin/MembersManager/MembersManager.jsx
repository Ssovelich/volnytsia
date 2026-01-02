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
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import MemberCard from "../MemberCard/MemberCard";
import MemberModal from "../MemberModal/MemberModal";
import AdminHeader from "../AdminHeader/AdminHeader";
import styles from "./MembersManager.module.scss";
import AdminEmptyState from "../AdminEmptyState/AdminEmptyState";

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

  const { visibleItems, loadMoreButton } = LoadMoreButton({
    data: members,
    mobile: 4,
    tablet: 8,
    desktop: 12,
  });

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

  const noItems =
    (status === "succeeded" || status === "failed" || status === "idle") &&
    members.length === 0;

  return (
    <div className={styles.container}>
      <AdminHeader
        title="Учасники колективу"
        onAdd={handleOpenCreate}
        btnText="+ Додати учасника"
      />

      <div>
        {noItems ? (
          <AdminEmptyState
            isFailed={status === "failed"}
            onRetry={() => dispatch(fetchMembers())}
            message={
              status === "failed"
                ? "На жаль, виникла проблема з доступом до даних."
                : "Учасників поки що немає. Ви можете додати першого!"
            }
          />
        ) : (
          <>
            <div className={styles.grid}>
              {visibleItems.map((member) => (
                <MemberCard
                  key={member._id}
                  member={member}
                  onEdit={() => handleOpenEdit(member)}
                  onDelete={() =>
                    setDeleteModal({ isOpen: true, id: member._id })
                  }
                />
              ))}
            </div>
            <div className={styles.loadMoreContainer}>{loadMoreButton}</div>
          </>
        )}
      </div>

      <MemberModal
        key={editData ? editData._id : "new-member"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editData={editData}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={async () => {
          await dispatch(deleteMember(deleteModal.id));
          setDeleteModal({ isOpen: false, id: null });
        }}
        title="Видалити учасника?"
        message="Ця дія видалить усі дані про учасника безповоротно."
      />
    </div>
  );
}
