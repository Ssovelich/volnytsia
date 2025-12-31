import styles from "./AdminHeader.module.scss";

export default function AdminHeader({ title, onAdd, btnText = "+ Додати" }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {onAdd && (
        <button onClick={onAdd} className={styles.addButton}>
          {btnText}
        </button>
      )}
    </header>
  );
}