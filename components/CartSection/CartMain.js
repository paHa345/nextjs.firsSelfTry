import styles from "./CartMain.module.css";

function CartMain() {
  return (
    <div className={styles.cartMainSection}>
      <div className={styles.cartMain}>
        <div className={styles.cartMainCellProducts}>Товар</div>
        <div className={styles.cartMainCellPrice}>Цена</div>
        <div className={styles.cartMainCellQuantity}>Количество</div>
        <div className={styles.cartMainCellCost}>Стоимость</div>
      </div>
    </div>
  );
}

export default CartMain;
