"use client";

import { MdOutlineDeleteForever, MdEdit } from "react-icons/md";
import styles from "./AdminCardActions.module.scss";

export default function AdminCardActions({ onEdit, onDelete }) {
  return (
    <div className={styles.actions}>
      <button
        onClick={onEdit}
        className={styles.editBtn}
        type="button"
        title="Редагувати"
      >
        <MdEdit />
      </button>
      <button
        onClick={onDelete}
        className={styles.deleteBtn}
        type="button"
        title="Видалити"
      >
        <MdOutlineDeleteForever />
      </button>
    </div>
  );
}
