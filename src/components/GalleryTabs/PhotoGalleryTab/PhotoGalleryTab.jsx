"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { fetchAlbums } from "@/lib/galleryPhoto/galleryPhotoSlice";
import styles from "./PhotoGalleryTab.module.scss";
import AlbumGallery from "./AlbumGallery/AlbumGallery";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import PageLoader from "@/components/PageLoader/PageLoader";

const PhotoGalleryTab = () => {
  const dispatch = useDispatch();
  const { items: albums, status } = useSelector((state) => state.galleryPhotos);
  const [openedAlbumIndex, setOpenedAlbumIndex] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAlbums());
    }
  }, [status, dispatch]);

  const { visibleItems, loadMoreButton } = LoadMoreButton({
    data: albums,
    mobile: 4,
    tablet: 8,
    desktop: 12,
  });

  const currentAlbum = openedAlbumIndex !== null ? albums[openedAlbumIndex] : null;

  const nextAlbum = () => {
    setOpenedAlbumIndex((prevIndex) => (prevIndex + 1) % albums.length);
  };

  if (status === "loading" && albums.length === 0) return <PageLoader />;

  if (status === "failed") {
    return (
      <div className={styles.errorContainer}>
        <p>Не вдалося завантажити альбоми.</p>
        <button onClick={() => dispatch(fetchAlbums())}>Спробувати знову</button>
      </div>
    );
  }

  return (
    <>
      <p className={styles.text}>
        Ласкаво просимо переглянути альбоми, зібрані за багато співочих років:
      </p>

      {openedAlbumIndex === null && (
        <>
          <div className={styles.albumList}>
            {visibleItems.map((album, index) => (
              <div
                key={album._id}
                className={styles.albumCard}
                onClick={() => setOpenedAlbumIndex(index)}
              >
                <Image
                  src={album.cover?.url || "/default-album.png"}
                  alt={album.title}
                  width={250}
                  height={188}
                  className={styles.albumImage}
                />
                <h3>{album.title}</h3>
              </div>
            ))}
          </div>
          {loadMoreButton}
        </>
      )}

      {openedAlbumIndex !== null && currentAlbum && (
        <AlbumGallery
          album={currentAlbum}
          onBack={() => setOpenedAlbumIndex(null)}
          nextAlbum={nextAlbum}
        />
      )}
    </>
  );
};

export default PhotoGalleryTab;