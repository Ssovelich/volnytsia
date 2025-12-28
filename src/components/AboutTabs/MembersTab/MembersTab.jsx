"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "@/lib/members/membersSlice";
import styles from "./MembersTab.module.scss";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import PageLoader from "@/components/PageLoader/PageLoader";
import Image from "next/image";

const MembersTab = () => {
  const dispatch = useDispatch();
  const { items: members, status } = useSelector((state) => state.members);

  useEffect(() => {
    // Завантажуємо актуальних учасників з бази
    dispatch(fetchMembers());
  }, [dispatch]);

  const { visibleItems, loadMoreButton } = LoadMoreButton({
    data: members,
    mobile: 4,
    tablet: 8,
    desktop: 12,
  });

  // Стан завантаження
  if (status === "loading" && members.length === 0) {
    return <PageLoader />;
  }

  // Перевірка на порожній список
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
                    // Використовуємо фото з бази або дефолтне
                    src={member.image || "/default-avatar.png"}
                    alt={`${member.surname} ${member.name}`}
                    fill
                    className={styles.photo}
                    sizes="(max-width: 768px) 100vw, 250px"
                    // Якщо посилання біте — підставляємо дефолт
                    onError={(e) => { e.target.src = "/default-avatar.png" }}
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