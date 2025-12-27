"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAwards, deleteAward } from "@/lib/awards/awardsSlice";
import Image from "next/image";
import PageLoader from "@/components/PageLoader/PageLoader";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import { MdOutlineDeleteForever } from "react-icons/md";
import styles from "./AwardsManager.module.scss";

export default function AwardsManager() {
  const dispatch = useDispatch();
  const { items: awards, status } = useSelector((state) => state.awards);

  useEffect(() => {
    dispatch(fetchAwards());
  }, [dispatch]);

  const { visibleItems, loadMoreButton } = LoadMoreButton({
    data: awards,
    mobile: 4,
    tablet: 8,
    desktop: 20,
  });

  const handleDelete = (id) => {
    if (confirm("Видалити цю нагороду?")) {
      dispatch(deleteAward(id));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  if (status === "loading" && awards.length === 0) return <PageLoader />;

  return (
    <div className={styles.managerWrapper}>
      <div className={styles.awardsList}>
        {visibleItems.map((award) => (
          <div key={award._id} className={styles.awardItem}>
            <div className={styles.imageWrapper}>
              <Image
                src={award.images?.thumbnail}
                alt={award.alt || "award"}
                fill
                sizes="(max-width: 744px) 100vw, 218px"
                className="object-cover"
                priority={false}
              />
            </div>

            <p className={styles.created}>
              Додано: {formatDate(award.createdAt)}
            </p>

            <button
              onClick={() => handleDelete(award._id)}
              className={styles.deleteBtn}
              title="Видалити"
            >
              <MdOutlineDeleteForever />
            </button>
          </div>
        ))}
      </div>

      <div className={styles.paginationWrapper}>
        {loadMoreButton}
      </div>
    </div>
  );
}