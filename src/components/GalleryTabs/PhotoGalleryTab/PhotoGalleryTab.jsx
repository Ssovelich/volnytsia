"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryPhotoData } from "@/data/galleryPhotoData";
import styles from "./PhotoGalleryTab.module.scss";
import AlbumGallery from "./AlbumGallery/AlbumGallery";

const PhotoGalleryTab = () => {
  const [openedAlbumIndex, setOpenedAlbumIndex] = useState(null);

  const { albums } = galleryPhotoData;

  const currentAlbum =
    openedAlbumIndex !== null ? albums[openedAlbumIndex] : null;

  const nextAlbum = () => {
    setOpenedAlbumIndex((prevIndex) => (prevIndex + 1) % albums.length);
  };

  return (
    <>
      {openedAlbumIndex === null && (
        <div className={styles.albumList}>
          {albums.map((album, index) => (
            <div
              key={album.id}
              className={styles.albumCard}
              onClick={() => setOpenedAlbumIndex(index)}
            >
              <Image
                src={album.coverImage}
                alt={album.title}
                width={250}
                height={188}
                className={styles.albumImage}
              />
              <h3>{album.title}</h3>
            </div>
          ))}
        </div>
      )}

      {openedAlbumIndex !== null && (
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
