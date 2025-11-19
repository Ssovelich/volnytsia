import styles from "./HomeContent.module.scss";
import { homeContent } from "@/data/homeContent";

const HomeContent = () => {
  return (
    <div className={styles.wrapper}>
      {homeContent.map((item, index) => (
        <div
          key={index}
          className={`${styles.block} ${item.title ? styles.hasTitle : ""}`}
        >
          {item.title && <h2 className={styles.title}>{item.title}</h2>}

          {item.textParts ? (
            <p className={styles.text}>
              {item.textParts.map((part, i) =>
                typeof part === "string" ? (
                  part
                ) : part.bold ? (
                  <strong key={i}>{part.text}</strong>
                ) : (
                  part.text
                )
              )}
            </p>
          ) : (
            <p className={styles.text}>{item.text}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomeContent;
