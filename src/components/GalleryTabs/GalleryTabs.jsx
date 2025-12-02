"use client";

import { useState } from "react";
import PhotoGalleryTab from "@/components/GalleryTabs/PhotoGalleryTab/PhotoGalleryTab";
import styles from "./GalleryTabs.module.scss";

const GalleryTabs = () => {
  const [tab, setTab] = useState("photos");

  return (
    <>
      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tabBtn} ${
            tab === "photos" ? styles.active : ""
          }`}
          onClick={() => setTab("photos")}
        >
          Фото
        </button>
        <button
          className={`${styles.tabBtn} ${
            tab === "videos" ? styles.active : ""
          }`}
          onClick={() => setTab("videos")}
        >
          Відео
        </button>
      </div>

      <div className={styles.wrapper}>
        {/* Photos Tab */}
        {tab === "photos" && (
          <>
            <PhotoGalleryTab />
          </>
        )}

        {/* Videos Tab */}
        {tab === "videos" && (
          <div className={styles.tabContent}>Відео контент</div>
        )}
      </div>
    </>
  );
};

export default GalleryTabs;
