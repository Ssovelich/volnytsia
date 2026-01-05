"use client";

import Image from "next/image";
import styles from "./MemberCard.module.scss";
import AdminCardActions from "../AdminCardActions/AdminCardActions";

export default function MemberCard({ member, onEdit, onDelete }) {
  const fullName = `${member.surname || ""} ${member.name || ""}`.trim();
  const imageSrc = member.image || "/default-avatar.png";

  return (
    <div className={styles.memberCard}>
      <div className={styles.imgWrapper}>
        <Image
          src={imageSrc}
          alt={fullName || "Учасник хору"}
          fill
          sizes="(max-width: 768px) 100vw, 240px"
          className="object-cover"
          onError={(e) => {
            e.target.src = "/default-avatar.png";
          }}
        />

        {member.order > 0 && (
          <div className={styles.orderBadge}>№{member.order}</div>
        )}
      </div>

      <div className={styles.info}>
        <h3>
          {member.surname} {member.name}
        </h3>
        <p>{member.role || "Учасник колективу"}</p>
      </div>

      <div className={styles.adminActions}>
        <AdminCardActions
          onEdit={() => onEdit(member)}
          onDelete={() => onDelete(member._id)}
        />
      </div>
    </div>
  );
}
