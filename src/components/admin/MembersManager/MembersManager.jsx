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

  const formatName = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleOpenCreate = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member) => {
    setEditData(member);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    const name = formatName(formData.get("name"));
    const surname = formatName(formData.get("surname"));
    const displayName = name || surname ? `${name} ${surname}`.trim() : "учасника";

    const toastId = toast.loading(
      editData ? `Оновлення даних ${displayName}...` : `Додавання ${displayName}...`
    );

    try {
      if (editData) {
        await dispatch(updateMember({ id: editData._id, formData })).unwrap();
        toast.success(`Дані ${displayName} оновлено!`, { id: toastId });
      } else {
        await dispatch(addMember(formData)).unwrap();
        toast.success(`${displayName} успішно додано!`, { id: toastId });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error(`Не вдалося зберегти дані ${displayName}`, { id: toastId });
    }
  };

  const handleDeleteConfirm = async () => {
    const memberToDelete = members.find((m) => m._id === deleteModal.id);
    const displayName = memberToDelete
      ? `${formatName(memberToDelete.name)} ${formatName(memberToDelete.surname)}`
      : "учасника";

    const toastId = toast.loading(`Видалення ${displayName}...`);

    try {
      await dispatch(deleteMember(deleteModal.id)).unwrap();
      toast.success(`Запис про ${displayName} видалено`, { id: toastId });
      setDeleteModal({ isOpen: false, id: null });
    } catch (error) {
      toast.error(`Не вдалося видалити ${displayName}`, { id: toastId });
    }
  };

  if (status === "loading" && members.length === 0) return <PageLoader />;

  const noItems =
    (status === "succeeded" || status === "failed" || status === "idle") &&
    members.length === 0;


  const memberToDelete = members.find((m) => m._id === deleteModal.id);
  const deleteDisplayName = memberToDelete
    ? `${formatName(memberToDelete.name)} ${formatName(memberToDelete.surname)}`
    : "цього учасника";

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
            <div>{loadMoreButton}</div>
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
        onConfirm={handleDeleteConfirm}
        title="Видалити учасника?"
        message={
          <>
            Ви впевнені, що хочете видалити <strong>{deleteDisplayName}</strong>?
          </>
        }
      />
    </div>
  );
}