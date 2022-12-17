import Link from "next/link";
import styles from "./ButtonTakeOrder.module.css";

function ButtonTakeOrder() {
  return (
    <div className={styles.cartOrderButton}>
      <Link href="/">Оформить заказ</Link>
    </div>
  );
}

export default ButtonTakeOrder;
