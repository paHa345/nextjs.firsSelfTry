import styles from "./AddToFavouritesError.module.css";

function AddToFavouritesError(props) {
  console.log(props.notification);

  return (
    <div className={styles.notification}>
      <h1>Зарегистрируйтесь чтобы удалить товар из избранного</h1>
    </div>
  );
}

export default AddToFavouritesError;
