import { entriesIn } from "lodash";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import LoadSpinner from "../UI/LoadSpinner";
import Order from "./Order";
import styles from "./Orders.module.css";

function Orders(props) {
  const orders = useSelector((state) => state.cart.orders);

  if (orders.status) {
    return (
      <Fragment>
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
      {/* {ordersContainer} */}
      {orders.map((el, index) => {
        return <Order order={el} key={el._id}></Order>;
      })}
    </Fragment>
  );
}

export default Orders;
