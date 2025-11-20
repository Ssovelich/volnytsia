"use client";

import { useState } from "react";
import styles from "./AboutTabs.module.scss";
import leadersData from "./leadersData";
import membersData from "./membersData";

const AboutTabs = () => {
  const [tab, setTab] = useState("leaders");

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
      {tab === "leaders" && (
        <div className={styles.leaders}>
          {leadersData.map((leader) => (
            <div className={styles.leaderWrapper} key={leader.id}>
              <div className={styles.leaderCard}>
                <img
                  src={leader.photo}
                  alt={leader.name}
                  className={styles.photo}
                />

                <h3 className={styles.name}>{leader.name}</h3>
                <p className={styles.role}>{leader.role}</p>
              </div>
              <p className={styles.achievements}>{leader.achievements}</p>
            </div>
          ))}
        </div>
      )}

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

export default AboutTabs;
