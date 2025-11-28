"use client";

import membersData from "@/data/membersData";
import styles from "./MembersTab.module.scss";

const MembersTab = () => {
  return (
    <div className={styles.membersWrapper}>
      {membersData.map((member) => (
        <div key={member.id} className={styles.memberCard}>
          <img src={member.photo} alt={member.name} className={styles.photo} />
          <h3 className={styles.name}>{member.name}</h3>
          <p className={styles.role}>{member.role}</p>
        </div>
      ))}
    </div>
  );
};

export default MembersTab;
