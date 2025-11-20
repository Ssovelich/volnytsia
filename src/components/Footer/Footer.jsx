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
            <Link
              href="https://www.facebook.com/KnyazaVolnitsa/"
              target="_blank"
            >
              <img src="/facebook.svg" alt="Facebook" />
            </Link>
          </li>
          <li className={styles.socialItem}>
            <Link href="https://instagram.com" target="_blank">
              <img src="/instagram.svg" alt="Instagram" />
            </Link>
          </li>
          <li className={styles.socialItem}>
            <Link
              href="https://www.youtube.com/@%D0%9A%D0%BD%D1%8F%D0%B6%D0%B0%D0%92%D0%BE%D0%BB%D1%8C%D0%BD%D0%B8%D1%86%D1%8F%D0%9D%D0%B0%D1%80%D0%BE%D0%B4%D0%BD%D0%B8%D0%B9%D0%B0%D0%BC%D0%B0%D1%82%D0%BE%D1%80%D1%81%D1%8C%D0%BA"
              target="_blank"
            >
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
