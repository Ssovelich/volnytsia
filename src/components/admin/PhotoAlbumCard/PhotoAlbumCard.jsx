"use client";

import Image from "next/image";
import { FiCamera } from "react-icons/fi";
import styles from "./PhotoAlbumCard.module.scss";
import AdminCardActions from "../AdminCardActions/AdminCardActions";

export default function PhotoAlbumCard({ album, onEdit, onDelete }) {
  const coverSrc = album.cover?.url || "/default-album.png";
  const photoCount = album.photos?.length || 0;

  return (
    <div className={styles.albumCard}>
      <div className={styles.imgWrapper}>
        <Image
          src={coverSrc}
          alt={album.title || "Фотоальбом"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          onError={(e) => {
            e.target.src = "/default-album.png";
          }}
        />

        <div className={styles.photoBadge}>
          <FiCamera size={14} />
          <span>{photoCount}</span>
        </div>

        {album.order > 0 && (
          <div className={styles.orderBadge}>№{album.order}</div>
        )}
      </div>

      <div className={styles.info}>
        <h3>{album.title}</h3>
     
      </div>

      <div className={styles.adminActions}>
        <AdminCardActions
          onEdit={() => onEdit(album)}
          onDelete={() => onDelete(album._id)}
        />
      </div>
    </div>
  );
}