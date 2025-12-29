"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import styles from "./VideoGalleryTab.module.scss";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import PageLoader from "@/components/PageLoader/PageLoader";
import { fetchVideos } from "@/lib/videoGallery/videoGallerySlice";

const VideoGalleryTab = () => {
  const dispatch = useDispatch();
  const { items: videos, status } = useSelector((state) => state.galleryVideos);
  const [openedVideo, setOpenedVideo] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVideos());
    }
  }, [status, dispatch]);

  const { visibleItems, loadMoreButton } = LoadMoreButton({
    data: videos,
    mobile: 4,
    tablet: 4,
    desktop: 4,
  });

  const getYoutubeId = (url) => {
    try {
      if (!url) return null;
      const u = new URL(url);
      if (u.hostname === "youtu.be") return u.pathname.substring(1);
      if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
      return null;
    } catch {
      return null;
    }
  };

  if (status === "loading" && videos.length === 0) return <PageLoader />;

  if (status === "failed" && videos.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>
          На жаль, виникла проблема з доступом до даних.
        </p>
        <button
          className={styles.retryBtn}
          onClick={() => dispatch(fetchVideos())}
        >
          Спробувати знову
        </button>
      </div>
    );
  }

  const isEmpty = status === "succeeded" && videos.length === 0;

  return (
    <>
      {isEmpty ? (
        <div className={styles.emptyState}>
          <p>Відео поки що немає. Ми скоро додамо записи наших виступів!</p>
        </div>
      ) : (
        <>
          <ul className={styles.list}>
            {visibleItems.map((video) => {
              const youtubeId = getYoutubeId(video.url);
              const preview = youtubeId
                ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
                : null;

              return (
                <li
                  key={video._id}
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
                      sizes="(max-width: 744px) 311px, 533px"
                    />
                  )}
                  <div className={styles.videoTitleOverlay}>{video.title}</div>
                </li>
              );
            })}
          </ul>
          {loadMoreButton}
        </>
      )}

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
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoGalleryTab;
