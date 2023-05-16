import { TaskAbortError } from "@reduxjs/toolkit";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import LoadSpinner from "../UI/LoadSpinner";
import Orders from "./Orders";
import styles from "./OrdersSection.module.css";

function OrdersSection(props) {
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

  // <div className={styles.orderContainer}>
  //   <div className={styles.orderElements}>
  //     <div className={styles.orderElement}>
  //       <p className={styles.orderElementName}>Протеин</p>
  //       <p className={styles.orderElementAmount}>X 2</p>
  //     </div>
  //     <div className={styles.orderElement}>
  //       <p className={styles.orderElementName}>Протеин</p>
  //       <p className={styles.orderElementAmount}>X 2</p>
  //     </div>
  //   </div>
  //   <div className={styles.orderDate}>
  //     <p>Дата заказа</p>
  //     <p>2022.10.12</p>
  //   </div>
  //   <div className={styles.orderTotalCost}>
  //     <p>Цена заказа</p>
  //     <p>15200</p>
  //   </div>
  // </div>
}

export default OrdersSection;
