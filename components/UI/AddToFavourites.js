import styles from "./AddToFavourites.module.css";

function AddToFavourites(props) {
  return (
    <div className={styles.notification}>
      <h1>{props.text}</h1>
    </div>
  );
}

export default AddToFavourites;
