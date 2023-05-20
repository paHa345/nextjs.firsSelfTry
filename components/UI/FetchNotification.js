import { useSelector } from "react-redux";
import styles from "./FetchNotification.module.css";

function FetchNotification(props) {
  const status = useSelector((state) => state.appState.fetchDataNotification);

  const getStyle = () => {
    if (status === "inAction") {
      return styles.notificationinAction;
    }

    if (status === "Error") {
      return styles.notificationError;
    }
    if (status === "Success") {
      return styles.notificationSuccess;
    }
  };

  return (
    <div className={getStyle()}>
      <h1 className={styles.text}>{props.text}</h1>
    </div>
  );
}

export default FetchNotification;
