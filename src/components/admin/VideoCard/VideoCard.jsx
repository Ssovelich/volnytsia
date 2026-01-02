"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./VideoCard.module.scss";
import { formatDate } from "@/lib/formatDate";
import AdminCardActions from "../AdminCardActions/AdminCardActions";

export default function VideoCard({ video, onEdit, onDelete }) {
  const [imgSrc, setImgSrc] = useState(null);

  const getYoutubeId = (url) => {
    try {
      const u = new URL(url);
      if (u.hostname === "youtu.be") return u.pathname.substring(1);
      return u.searchParams.get("v");
    } catch {
      return null;
    }
  };

  const youtubeId = getYoutubeId(video.url);
  const preview =
    imgSrc || `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={preview}
          alt={video.title || "Відео виступу хору"}
          fill
          sizes="(max-width: 744px) 100vw, 300px"
          className="object-cover"
          onError={() => setImgSrc("/default-video.png")}
        />

        {video.order > 0 && (
          <div className={styles.orderBadge}>№{video.order}</div>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{video.title}</h3>
        <p className={styles.created}>Додано: {formatDate(video.createdAt)}</p>
      </div>

      <AdminCardActions onEdit={() => onEdit(video)} onDelete={onDelete} />
    </div>
  );
}
