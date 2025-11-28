"use client";

import { useState, useEffect } from "react";
import styles from "./AboutTabs.module.scss";
import LeadersTab from "./LeadersTab/LeadersTab";
import MembersTab from "./MembersTab/MembersTab";

const AboutTabs = () => {
  const [tab, setTab] = useState("leaders");
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1440);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tabBtn} ${tab === "leaders" ? styles.active : ""}`}
          onClick={() => setTab("leaders")}
        >
          Керівники
        </button>
        <button
          className={`${styles.tabBtn} ${tab === "members" ? styles.active : ""}`}
          onClick={() => setTab("members")}
        >
          Учасники
        </button>
      </div>

      <div className={styles.wrapper}>
        {/* Leaders Tab */}
        {tab === "leaders" && <LeadersTab isMobile={isMobile} />}

        {/* Members Tab */}
        {tab === "members" && <MembersTab />}
      </div>
    </>
  );
};

export default AboutTabs;
