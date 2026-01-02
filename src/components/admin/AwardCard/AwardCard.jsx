"use client";

import Image from "next/image";
import { MdOutlineDeleteForever } from "react-icons/md";
import { formatDate } from "@/lib/formatDate";
import styles from "./AwardCard.module.scss";

export default function AwardCard({ award, onDelete }) {
  return (
    <div className={styles.awardItem}>
      <div className={styles.imageWrapper}>
        <Image
          src={award.images?.thumbnail}
          alt={award.alt || "award"}
          fill
          sizes="(max-width: 744px) 100vw, 218px"
          className="object-cover"
          priority={false}
        />
      </div>

      <p className={styles.created}>Додано: {formatDate(award.createdAt)}</p>

      <button
        onClick={() => onDelete(award._id)}
        className={styles.deleteBtn}
        title="Видалити"
      >
        <MdOutlineDeleteForever />
      </button>
    </div>
  );
}
