import styles from "./ButtonTakeOrder.module.css";

function ButtonTakeOrder() {
  return (
    <div className={styles.cartOrderButton}>
      <a href="/">Оформить заказ</a>
    </div>
  );
}

export default ButtonTakeOrder;
