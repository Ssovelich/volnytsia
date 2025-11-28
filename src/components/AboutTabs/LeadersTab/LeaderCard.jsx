"use client";

import { useState } from "react";
import styles from "./LeaderCard.module.scss";

const LeaderCard = ({ leader, isMobile }) => {
  const [expanded, setExpanded] = useState(false);
  const isClamped = isMobile && !expanded;

  return (
    <div className={styles.leaderWrapper}>
      <div className={styles.leaderCard}>
        <img src={leader.photo} alt={leader.name} className={styles.photo} />
        <h3 className={styles.name}>{leader.name}</h3>
        <p className={styles.role}>{leader.role}</p>
      </div>

      <div className={styles.description}>
        <p
          className={`${styles.achievements} ${isMobile && !expanded ? styles.clamp4 : ""}`}
          dangerouslySetInnerHTML={{ __html: leader.achievements }}
        />

        {!isClamped && <p className={styles.source}>{leader.source}</p>}

        {isMobile && (
          <button className={styles.toggleBtn} onClick={() => setExpanded(!expanded)}>
            {expanded ? (
              <>
                ... менше <span className={styles.arrow}><img src="/up.svg" alt="Up" /></span>
              </>
            ) : (
              <>
                ... більше <span className={styles.arrow}><img src="/down.svg" alt="Down" /></span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default LeaderCard;
