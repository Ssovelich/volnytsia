"use client";

import Link from 'next/link';
import { HiArrowLeft } from "react-icons/hi";
import styles from './AdminNotFound.module.scss';

export default function AdminNotFound() {
  return (
    <div className={styles.adminContainer}>
      <div className={styles.card}>
        <span className={styles.errorCode}>404</span>
        <h2 className={styles.adminTitle}>{"Об'єкт не знайдено"}</h2>
        <p className={styles.adminText}>
          Запитаний ресурс в базі даних або сторінка керування відсутні.
        </p>
        <Link href="/admin" className={styles.backBtn}>
          <HiArrowLeft />
          <span>До панелі-адміністратора</span>
        </Link>
      </div>
    </div>
  );
}