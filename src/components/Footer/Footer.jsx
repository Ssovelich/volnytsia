import Link from "next/link";
import styles from "./Footer.module.scss";
import socialLinks from "./socialLinks";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.decorWrap}>
          <img src="/decor.svg" alt="Decor" className={styles.decor} />
        </div>
        <h2 className={styles.title}>Ми в соціальних мережах:</h2>
        <ul className={styles.socialList}>
          {socialLinks.map((item) => (
            <li key={item.id} className={styles.socialItem}>
              <Link href={item.href} target="_blank">
                <img src={item.icon} alt={item.alt} />
              </Link>
            </li>
          ))}
        </ul>
        <p className={styles.copy}>Княжа Вольниця, 2025. Всі права захищено.</p>
      </div>
    </footer>
  );
};

export default Footer;
