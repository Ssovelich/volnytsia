"use client";

import Image from "next/image";
import styles from "./LeaderCard.module.scss";
import AdminCardActions from "../AdminCardActions/AdminCardActions";

export default function LeaderCard({ leader, onEdit, onDelete }) {
  const fullName = `${leader.surname || ""} ${leader.name || ""}`.trim();
  const imageSrc = leader.image || "/default-avatar.png";

  return (
    <div className={styles.leaderWrapper}>
      <div className={styles.leaderCard}>
        <div className={styles.imgWrapper}>
          <Image
            src={imageSrc}
            alt={fullName || "Керівник хору"}
            fill
            sizes="(max-width: 768px) 100vw, 240px"
            className="object-cover"
            onError={(e) => {
              e.target.src = "/default-avatar.png";
            }}
          />

          {leader.order > 0 && (
            <div className={styles.orderBadge}>№{leader.order}</div>
          )}
        </div>

        <div className={styles.info}>
          <h3>
            {leader.surname} {leader.name}
          </h3>
          <h3>{leader.middle_name}</h3>
          <p>{leader.role || "Керівник колективу"}</p>
        </div>
      </div>

      <div className={styles.descriptionWrapper}>
        <p className={styles.description}>{leader.description}</p>
        <p className={styles.source}>{leader.source}</p>
      </div>

      <AdminCardActions
        onEdit={() => onEdit(leader)}
        onDelete={() => onDelete(leader._id)}
      />
    </div>
  );
}
