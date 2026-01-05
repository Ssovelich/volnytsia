"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./LeaderCard.module.scss";

const LeaderCard = ({ leader, isMobile }) => {
  const [expanded, setExpanded] = useState(false);
  const isClamped = isMobile && !expanded;
  const fullName = `${leader.surname || ""} ${leader.name || ""} ${
    leader.middle_name || ""
  }`.trim();
  const imageSrc = leader.image || "/default-avatar.png";

  return (
    <div className={styles.leaderWrapper}>
      <div className={styles.leaderCard}>
        <div className={styles.imgWrapper}>
          <Image
            src={imageSrc}
            alt={fullName}
            fill
            className={styles.photo}
            sizes="(max-width: 768px) 250px, 300px"
          />
        </div>
        <h3 className={styles.name}>{fullName}</h3>
        <p className={styles.role}>{leader.role || "Керівник"}</p>
      </div>

     <div className={styles.description}>
        <div
          className={`${styles.achievements} ${isClamped ? styles.clamp4 : ""}`}
          dangerouslySetInnerHTML={{ __html: leader.description || leader.achievements }}
        />

        {!isClamped && leader.source && (
          <p className={styles.source}>Джерело: {leader.source}</p>
        )}

        {isMobile && (
          <button className={styles.toggleBtn} onClick={() => setExpanded(!expanded)}>
            {expanded ? (
              <>менше <span className={styles.arrow}><img src="/up.svg" alt="Up" /></span></>
            ) : (
              <>більше <span className={styles.arrow}><img src="/down.svg" alt="Down" /></span></>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default LeaderCard;
