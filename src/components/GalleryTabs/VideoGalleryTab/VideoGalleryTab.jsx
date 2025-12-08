import styles from "./VideoGalleryTab.module.scss";
import { FaRegCirclePlay } from "react-icons/fa6";

const VideoGalleryTab = () => {
  return (
    <div>
      <ul className={styles.list}>
        <li className={styles.item}>
          <FaRegCirclePlay size={38} />
        </li>
        <li className={styles.item}>
          <FaRegCirclePlay size={38} />
        </li>
        <li className={styles.item}>
          <FaRegCirclePlay size={38} />
        </li>
        <li className={styles.item}>
          <FaRegCirclePlay size={38} />
        </li>
      </ul>
    </div>
  );
};

export default VideoGalleryTab;
