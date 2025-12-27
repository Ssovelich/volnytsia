"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAwards, deleteAward } from "@/lib/awards/awardsSlice";
import Image from "next/image";
import PageLoader from "@/components/PageLoader/PageLoader";
import { MdOutlineDeleteForever } from "react-icons/md";
import styles from "./AwardsManager.module.scss";

export default function AwardsManager() {
  const dispatch = useDispatch();
  const { items: awards, status } = useSelector((state) => state.awards);

  useEffect(() => {
    dispatch(fetchAwards());
  }, [dispatch]);

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
    <div className={styles.awardsList}>
      {awards.map((award) => (
        <div key={award._id} className={styles.awardItem}>
          <div className={styles.imageWrapper}>
            <Image
              src={award.images?.thumbnail}
              alt={award.alt || "award"}
              fill
              sizes="200px"
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
  );
}