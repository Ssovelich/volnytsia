"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./LeaderCard.module.scss";
import AdminCardActions from "../AdminCardActions/AdminCardActions";

export default function LeaderCard({ leader, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  
  const fullName = `${leader.surname || ""} ${leader.name || ""} ${leader.middle_name || ""}`.trim();
  const imageSrc = leader.image || "/default-avatar.png";

  return (
    <div className={styles.leaderWrapper}>
      <div className={styles.mainContent}>
        <div className={styles.leaderCard}>
          <div className={styles.imgWrapper}>
            <Image
              src={imageSrc}
              alt={fullName}
              fill
              sizes="250px"
              className={styles.photo}
              onError={(e) => { e.target.src = "/default-avatar.png"; }}
            />
            {leader.order > 0 && (
              <div className={styles.orderBadge}>№{leader.order}</div>
            )}
          </div>

          <div className={styles.info}>
            <h3 className={styles.name}>{leader.surname} {leader.name}</h3>
            <h3 className={styles.name}>{leader.middle_name}</h3>
            <p className={styles.role}>{leader.role || "Керівник колективу"}</p>
          </div>
        </div>

        <div className={styles.description}>
          <div
            className={`${styles.achievements} ${!expanded ? styles.clamp4 : ""}`}
            dangerouslySetInnerHTML={{ __html: leader.description }}
          />

          {expanded && leader.source && (
            <p className={styles.source}>Джерело: {leader.source}</p>
          )}

          <button 
            className={styles.toggleBtn} 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>... менше <span className={styles.arrow}><Image src="/up.svg" alt="Up" width={16} height={16} /></span></>
            ) : (
              <>... більше <span className={styles.arrow}><Image src="/down.svg" alt="Down" width={16} height={16} /></span></>
            )}
          </button>
        </div>
      </div>

      <div className={styles.adminActions}>
        <AdminCardActions
          onEdit={() => onEdit(leader)}
          onDelete={() => onDelete(leader._id)}
        />
      </div>
    </div>
  );
}