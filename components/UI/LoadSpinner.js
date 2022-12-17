import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styles from "./LoadSpinner.module.css";

function LoadSpinner(props) {
  return (
    <div className={styles.center}>
      <FontAwesomeIcon icon={faSpinner} size="10x" spin />
      <h1>Загрузка</h1>
    </div>
  );
}

export default LoadSpinner;
