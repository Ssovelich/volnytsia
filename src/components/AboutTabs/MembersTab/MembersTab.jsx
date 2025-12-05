"use client";

import membersData from "@/data/membersData";
import styles from "./MembersTab.module.scss";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";

const MembersTab = () => {
  const { visibleItems, loadMoreButton } = LoadMoreButton({
    data: membersData,
    mobile: 4,
    tablet: 8,
    desktop: 12,
  });
  
  return (
    <>
      <div className={styles.membersWrapper}>
       {visibleItems.map((member) => (
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

      {loadMoreButton }
    </>
  );
};

export default MembersTab;
