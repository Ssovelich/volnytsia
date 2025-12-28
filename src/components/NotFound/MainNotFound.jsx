"use client";

import Link from 'next/link';
import styles from './MainNotFound.module.scss';

export default function MainNotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h2 className={styles.title}>Ой! Ця пісня ще не написана</h2>
        <p className={styles.text}>
          Сторінку, яку ви шукаєте, не знайдено. Можливо, вона переїхала або її ніколи не існувало.
        </p>
        <Link href="/" className={styles.homeBtn}>
          На головну «Княжої Вольниці»
        </Link>
      </div>
    </div>
  );
}