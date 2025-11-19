import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.decorWrap}>
          <img src="/decor.svg" alt="Decor" className={styles.decor} />
        </div>
        <h2 className={styles.title}>Ми в соціальних мережах:</h2>
        <ul className={styles.socialList}>
          <li className={styles.socialItem}>
            <Link href="https://facebook.com" target="_blank">
              <img src="/facebook.svg" alt="Facebook" />
            </Link>
          </li>
          <li className={styles.socialItem}>
            <Link href="https://instagram.com" target="_blank">
              <img src="/instagram.svg" alt="Instagram" />
            </Link>
          </li>
          <li className={styles.socialItem}>
            <Link href="https://youtube.com" target="_blank">
              <img src="/youtube.svg" alt="YouTube" />
            </Link>
          </li>
        </ul>
        <p className={styles.copy}>Княжа Вольниця, 2025. Всі права захищено.</p>
      </div>
    </footer>
  );
};

export default Footer;
