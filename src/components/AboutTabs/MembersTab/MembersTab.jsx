"use client";

import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "@/lib/members/membersSlice";
import styles from "./MembersTab.module.scss";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import PageLoader from "@/components/PageLoader/PageLoader";
import Image from "next/image";

const MembersTab = () => {
  const dispatch = useDispatch();
  const { items: members, status, error } = useSelector((state) => state.members);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMembers());
    }
  }, [status, dispatch]);

  const handleImageError = useCallback((e) => {
    const DEFAULT_AVATAR = "/default-avatar.png";
    if (e.target.src !== window.location.origin + DEFAULT_AVATAR) {
      e.target.src = DEFAULT_AVATAR;
    }
  }, []);

  const { visibleItems, loadMoreButton } = LoadMoreButton({
    data: members,
    mobile: 4,
    tablet: 8,
    desktop: 12,
  });

  if (status === "loading" && members.length === 0) {
    return <PageLoader />;
  }

  if (status === "failed" && members.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>На жаль, виникла проблема з доступом до даних.</p>
        <button className={styles.retryBtn} onClick={() => dispatch(fetchMembers())}>
          Спробувати знову
        </button>
      </div>
    );
  }

  const isEmpty = status === "succeeded" && members.length === 0;

  return (
    <>
      {isEmpty ? (
        <div className={styles.emptyState}>
          <p>
            На даний момент ми оновлюємо список нашого колективу. 
            Незабаром тут з’являться всі учасники «Княжої Вольниці»!
          </p>
        </div>
      ) : (
        <>
          <div className={styles.membersWrapper}>
            {visibleItems.map((member) => (
              <div key={member._id} className={styles.memberCard}>
                <div className={styles.photoWrapper}>
                  <Image
                    src={member.image || "/default-avatar.png"}
                    alt={`${member.surname} ${member.name}`}
                    fill
                    className={styles.photo}
                    sizes="(max-width: 768px) 100vw, 250px"
                    onError={handleImageError}
                  />
                </div>
                <h3 className={styles.name}>
                  {member.surname} {member.name}
                </h3>
                <p className={styles.role}>{member.role}</p>
              </div>
            ))}
          </div>
          {loadMoreButton}
        </>
      )}
    </>
  );
};

export default MembersTab;