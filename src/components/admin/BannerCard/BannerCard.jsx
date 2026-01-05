"use client";

import Image from "next/image";
import styles from "./BannerCard.module.scss";
import { formatDate } from "@/lib/formatDate";
import AdminCardActions from "../AdminCardActions/AdminCardActions";

export default function BannerCard({ banner, onEdit, onDelete }) {
  const imageSrc = banner.image || "/default-banner.png";

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt="Banner slide"
          fill
          sizes="(max-width: 1000px) 100vw, 1000px"
          className="object-cover"
        />

        {banner.order > 0 && (
          <div className={styles.orderBadge}>№{banner.order}</div>
        )}
      </div>

      <div className={styles.info}>
        <p className={styles.created}>Додано: {formatDate(banner.createdAt)}</p>
      </div>
      <div className={styles.adminActions}>
        <AdminCardActions
          onEdit={onEdit}
          onDelete={() => onDelete(banner._id)}
        />
      </div>
    </div>
  );
}
