import { Fragment } from "react";
import Orders from "./Orders";
import styles from "./OrdersSection.module.css";

function OrdersSection() {
  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.ordersSection}>
          <div className={styles.nameContainer}>
            <div className={styles.backgroundNameContainer}>
              <div className={styles.backgroundName}>Мои заказы</div>
            </div>
            <h2 className={styles.bestProductH2}>Мои заказы</h2>
          </div>
          <Orders></Orders>
        </div>
      </div>
    </Fragment>
  );
}

export default OrdersSection;
