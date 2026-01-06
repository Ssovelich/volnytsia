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
import { toast } from "react-hot-toast";
import PageLoader from "@/components/PageLoader/PageLoader";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import MemberCard from "../MemberCard/MemberCard";
import MemberModal from "../MemberModal/MemberModal";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminEmptyState from "../AdminEmptyState/AdminEmptyState";
import { getDisplayName } from "@/lib/formattersName";
import styles from "./MembersManager.module.scss";

export default function MembersManager() {
  const dispatch = useDispatch();
  const { items: members, status } = useSelector((state) => state.members);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  useEffect(() => {
    if (status === "idle") dispatch(fetchMembers());
  }, [status, dispatch]);

  const { visibleItems, loadMoreButton } = LoadMoreButton({
    data: members,
    mobile: 4,
    tablet: 8,
    desktop: 12,
  });

  const handleSave = async (formData) => {
    const displayName = getDisplayName(formData, "member");

    try {
      if (editData) {
        await dispatch(updateMember({ id: editData._id, formData })).unwrap();
        toast.success(`${displayName} оновлено!`);
      } else {
        await dispatch(addMember(formData)).unwrap();
        toast.success(`${displayName} додано!`);
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error(`Помилка збереження ${displayName}`);
    }
  };

  const handleDeleteConfirm = async () => {
    const itemToDelete = members.find((m) => m._id === deleteModal.id);
    const displayName = getDisplayName(itemToDelete, "member");

    try {
      setDeleteModal({ isOpen: false, id: null });
      await dispatch(deleteMember(deleteModal.id)).unwrap();
      toast.success(`${displayName} видалено`);
    } catch (error) {
      toast.error(`Не вдалося видалити ${displayName}`);
    }
  };

  if (status === "loading" && members.length === 0) return <PageLoader />;

  const deleteDisplayName = getDisplayName(
    members.find((m) => m._id === deleteModal.id),
    "member"
  );

  return (
    <div className={styles.container}>
      <AdminHeader
        title="Учасники колективу"
        onAdd={() => {
          setEditData(null);
          setIsModalOpen(true);
        }}
        btnText="+ Додати учасника"
      />

      {status !== "loading" && members.length === 0 ? (
        <AdminEmptyState
          isFailed={status === "failed"}
          onRetry={() => dispatch(fetchMembers())}
          message={
            status === "failed"
              ? "Проблема з доступом до даних."
              : "Учасників поки немає."
          }
        />
      ) : (
        <>
          <div className={styles.grid}>
            {visibleItems.map((member) => (
              <MemberCard
                key={member._id}
                member={member}
                onEdit={() => {
                  setEditData(member);
                  setIsModalOpen(true);
                }}
                onDelete={() =>
                  setDeleteModal({ isOpen: true, id: member._id })
                }
              />
            ))}
          </div>
          {loadMoreButton}
        </>
      )}

      <MemberModal
        key={editData?._id || "new"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editData={editData}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDeleteConfirm}
        title="Видалити учасника?"
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
