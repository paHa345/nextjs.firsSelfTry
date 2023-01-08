import styles from "./RemoveFromFavourites.module.css";

function RemoveFromFavourites(props) {
  return (
    <div className={styles.notification}>
      <h1>Элемент удалён из списка избранных</h1>
    </div>
  );
}

export default RemoveFromFavourites;
