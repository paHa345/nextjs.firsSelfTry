import { TaskAbortError } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import LoadSpinner from "../UI/LoadSpinner";
import styles from "./Orders.module.css";

function Orders(props) {
  const orders = useSelector((state) => state.cart.orders);
  console.log(orders);

  if (orders.status) {
    return <LoadSpinner></LoadSpinner>;
  }

  if (orders.length === 0) {
    return <h1>Нет заказов</h1>;
  }

  const ordersContainer = orders.map((el, index) => {
    return (
      <div key={index} className={styles.orderContainer}>
        {el.items.map((item, index) => {
          return (
            <div key={index} className={styles.orderElement}>
              <p className={styles.orderElementName}>{item.item.name}</p>
              <p className={styles.orderElementAmount}>X {item.quantity}</p>
            </div>
          );
        })}
        <div className={styles.orderDate}>
          <p>Дата заказа</p>
          <p>2022.10.12</p>
        </div>
        <div className={styles.orderTotalCost}>
          <p>Цена заказа</p>
          <p>{el.totalCost}</p>
        </div>
      </div>
    );
  });

  return ordersContainer;

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

export default Orders;
