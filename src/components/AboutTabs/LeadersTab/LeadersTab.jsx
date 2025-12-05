"use client";

import styles from "./LeadersTab.module.scss";
import leadersData from "@/data/leadersData";
import LeaderCard from "./LeaderCard";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";

const LeadersTab = ({ isMobile }) => {
  const { visibleItems, loadMoreButton } = LoadMoreButton({
    data: leadersData,
    mobile: 4,
    tablet: 4,
    desktop: 4,
  });

  return (
    <>
      <div className={styles.leaders}>
        {visibleItems.map((leader) => (
          <LeaderCard key={leader.id} leader={leader} isMobile={isMobile} />
        ))}
      </div>

      {loadMoreButton}
    </>
  );
};

export default LeadersTab;
