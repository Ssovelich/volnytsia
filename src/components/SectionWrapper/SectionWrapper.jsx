import styles from "./SectionWrapper.module.scss";

const SectionWrapper = ({ title, children }) => {
  return (
    <section className={styles.section}>
      <div className="container">
        <h1>{title}</h1>
        <div className={styles.decorWrap}>
          <img src="/decor.svg" alt="Decor" className={styles.decor} />
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
};

export default SectionWrapper;
