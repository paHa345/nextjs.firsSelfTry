import { TaskAbortError } from "@reduxjs/toolkit";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import LoadSpinner from "../UI/LoadSpinner";
import styles from "./Orders.module.css";

function Orders(props) {
  const orders = useSelector((state) => state.cart.orders);

  if (orders.status) {
    return (
      <Fragment>
        <div>
          <h1 className={styles.ordersTitle}>Мои заказы</h1>
        </div>
        <LoadSpinner></LoadSpinner>;
      </Fragment>
    );
  }

  if (orders.length === 0) {
    return <h1>Нет заказов</h1>;
  }

  const ordersContainer = orders.map((el, index) => {
    const orderDate = new Date(el.date);
    console.log(orderDate.getFullYear());

    const date = new Date(
      orderDate.getFullYear(),
      orderDate.getMonth(),
      orderDate.getDate(),
      orderDate.getHours(),
      orderDate.getMinutes(),
      orderDate.getSeconds()
    );

    const formatter = new Intl.DateTimeFormat("ru", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    console.log(formatter.format(date));

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
          <p>{formatter.format(date)}</p>
        </div>
        <div className={styles.orderTotalCost}>
          <p>Цена заказа</p>
          <p>{el.totalCost}</p>
        </div>
      </div>
    );
  });

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.ordersSection}>
          <div>
            <h1 className={styles.ordersTitle}>Мои заказы</h1>
          </div>
          {ordersContainer}
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

export default Orders;
