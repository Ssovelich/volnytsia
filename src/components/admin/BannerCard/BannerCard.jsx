"use client";

import Image from "next/image";
import { MdOutlineDeleteForever, MdEdit } from "react-icons/md";
import styles from "./BannerCard.module.scss";

export default function BannerCard({ banner, onEdit, onDelete }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={banner.image}
          alt="Banner slide"
          fill
          sizes="(max-width: 1000px) 100vw, 1000px"
          className="object-cover"
        />
        {banner.order > 0 && (
          <div className={styles.orderBadge}> №{banner.order}</div>
        )}
      </div>

      <div className={styles.actions}>
        <button onClick={onEdit} className={styles.editBtn}>
          <MdEdit /> Редагувати
        </button>
        <button
          onClick={() => onDelete(banner._id)}
          className={styles.deleteBtn}
        >
          <MdOutlineDeleteForever /> Видалити
        </button>
      </div>
    </div>
  );
}
