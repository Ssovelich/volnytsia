"use client";

import styles from "./LeadersTab.module.scss";
import leadersData from "@/data/leadersData";
import LeaderCard from "./LeaderCard";

const LeadersTab = ({ isMobile }) => {
  return (
    <div className={styles.leaders}>
      {leadersData.map((leader) => (
        <LeaderCard key={leader.id} leader={leader} isMobile={isMobile} />
      ))}
    </div>
  );
};

export default LeadersTab;
