"use client";

import { useState, useEffect } from "react";
import styles from "./AboutTabs.module.scss";
import leadersData from "./leadersData";
import membersData from "./membersData";

const AboutTabs = () => {
  const [tab, setTab] = useState("leaders");
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1440);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tabBtn} ${
            tab === "leaders" ? styles.active : ""
          }`}
          onClick={() => setTab("leaders")}
        >
          Керівники
        </button>
        <button
          className={`${styles.tabBtn} ${
            tab === "members" ? styles.active : ""
          }`}
          onClick={() => setTab("members")}
        >
          Учасники
        </button>
      </div>

      <div className={styles.wrapper}>
        {/* Leaders */}
        {tab === "leaders" &&
          leadersData.map((leader) => (
            <LeaderCard key={leader.id} leader={leader} isMobile={isMobile} />
          ))}

        {/* Members */}
        {tab === "members" && (
          <div className={styles.membersWrapper}>
            {membersData.map((member) => (
              <div key={member.id} className={styles.memberCard}>
                <img
                  src={member.photo}
                  alt={member.name}
                  className={styles.photo}
                />
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

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
          className={`${styles.achievements} ${
            isMobile && !expanded ? styles.clamp4 : ""
          }`}
          dangerouslySetInnerHTML={{ __html: leader.achievements }}
        />

        {!isClamped && <p className={styles.source}>{leader.source}</p>}

        {isMobile && (
          <button
            className={styles.toggleBtn}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                ... менше{" "}
                <span className={styles.arrow}>
                  <img src="/up.svg" alt="Up" />
                </span>
              </>
            ) : (
              <>
                ... більше{" "}
                <span className={styles.arrow}>
                  <img src="/down.svg" alt="Down" />
                </span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default AboutTabs;
