"use client";

import styles from "./AlbumNavigation.module.scss";

const AlbumNavigation = ({ prevAlbum, nextAlbum, title }) => {
  return (
    <div className={styles.navContainer}>
      <button onClick={prevAlbum} className={styles.navButton}>
        {"< До альбомів"}
      </button>
      <h2 className={styles.albumTitle}>{title}</h2>
      <button onClick={nextAlbum} className={styles.navButton}>
        {"Наступний альбом >"}
      </button>
    </div>
  );
};

export default AlbumNavigation;
