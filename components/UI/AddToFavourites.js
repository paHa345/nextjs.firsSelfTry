import styles from "./AddToFavourites.module.css";

function AddToFavourites(props) {
  return (
    <div className={styles.notification}>
      <h1>Элемент добавлен в избранное</h1>
    </div>
  );
}

export default AddToFavourites;
