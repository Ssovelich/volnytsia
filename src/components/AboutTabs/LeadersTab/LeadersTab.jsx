"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaders } from "@/lib/leaders/leadersSlice";
import styles from "./LeadersTab.module.scss";
import LeaderCard from "./LeaderCard";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import PageLoader from "@/components/PageLoader/PageLoader";

const LeadersTab = ({ isMobile }) => {
  const dispatch = useDispatch();

  const { items: leaders, status, error } = useSelector((state) => state.leaders);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLeaders());
    }
  }, [status, dispatch]);

  const { visibleItems, loadMoreButton } = LoadMoreButton({
    data: leaders,
    mobile: 4,
    tablet: 4,
    desktop: 4,
  });

  if (status === "loading" && leaders.length === 0) {
    return <PageLoader />;
  }

  if (status === "failed" && leaders.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>
          На жаль, виникла проблема з доступом до даних: {error}
        </p>
        <button 
          className={styles.retryBtn} 
          onClick={() => dispatch(fetchLeaders())}
        >
          Спробувати знову
        </button>
      </div>
    );
  }

  const isEmpty = status === "succeeded" && leaders.length === 0;

  return (
    <>
      {isEmpty ? (
        <div className={styles.emptyState}>
          <p>
            На даний момент ми оновлюємо список наших керівників. 
            Незабаром тут з’являться всі керівники «Княжої Вольниці»!
          </p>
        </div>
      ) : (
        <>
          <div className={styles.leaders}>
            {visibleItems.map((leader) => (
              <LeaderCard
                key={leader._id || leader.id}
                leader={leader}
                isMobile={isMobile}
              />
            ))}
          </div>
          {leaders.length > visibleItems.length && loadMoreButton}
        </>
      )}
    </>
  );
};

export default LeadersTab;