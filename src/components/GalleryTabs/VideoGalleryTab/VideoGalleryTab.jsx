"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./VideoGalleryTab.module.scss";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import { galleryVideoData } from "@/data/galleryVideoData";

const VideoGalleryTab = () => {
  const [openedVideo, setOpenedVideo] = useState(null);
  const { videos } = galleryVideoData;

  const { visibleItems, loadMoreButton } = LoadMoreButton({
    data: videos,
    mobile: 4,
    tablet: 4,
    desktop: 4,
  });

  const getYoutubeId = (url) => {
    try {
      const u = new URL(url);
      if (u.hostname === "youtu.be") return u.pathname.substring(1);
      return u.searchParams.get("v");
    } catch {
      return null;
    }
  };

  return (
    <>
      <ul className={styles.list}>
        {visibleItems.map((video) => {
          const youtubeId = getYoutubeId(video.url);
          const preview =
            youtubeId &&
            `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

          return (
            <li
              key={video.id}
              className={styles.item}
              onClick={() => setOpenedVideo(youtubeId)}
            >
              <FaRegCirclePlay className={styles.playIcon} />

              {preview && (
                <Image
                  src={preview}
                  alt={video.title}
                  fill
                  className={styles.previewImage}
                  sizes="(max-width: 744px) 311px, (max-width: 1440px) 533px, 533px"
                />
              )}
            </li>
          );
        })}
      </ul>

      {loadMoreButton}

      {openedVideo && (
        <div
          className={styles.modalOverlay}
          onClick={() => setOpenedVideo(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <IoClose
              className={styles.closeBtn}
              onClick={() => setOpenedVideo(null)}
            />

            <iframe
              src={`https://www.youtube.com/embed/${openedVideo}?autoplay=1`}
              allow="autoplay"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoGalleryTab;
