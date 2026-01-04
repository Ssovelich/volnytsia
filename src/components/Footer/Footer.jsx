"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCopyright } from "@/lib/copyright/copyrightSlice";
import { fetchSocials } from "@/lib/socials/socialsSlice";
import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = () => {
  const dispatch = useDispatch();
  const { data: copyright } = useSelector((state) => state.copyright);
  const { items: socials } = useSelector((state) => state.socials);

  useEffect(() => {
    dispatch(fetchCopyright("footer_copy"));
    dispatch(fetchSocials());
  }, [dispatch]);

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.decorWrap}>
          <img src="/decor.svg" alt="Decor" className={styles.decor} />
        </div>
        <h2 className={styles.title}>Ми в соціальних мережах:</h2>
        <ul className={styles.socialList}>
          {socials.map((item) => (
            <li key={item._id} className={styles.socialItem}>
              <Link href={item.href} target="_blank">
                <img src={item.icon} alt={item.alt} />
              </Link>
            </li>
          ))}
        </ul>
        <p className={styles.copy}>
          {copyright?.value || "Княжа Вольниця, 2026. Всі права захищено."}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
