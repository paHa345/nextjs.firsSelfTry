import styles from "./Order.module.css";

function Order(props) {
  const orderDate = new Date(props.order.date);

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

  return (
    <div key={props.order._id} className={styles.orderContainer}>
      {props.order.items.map((item, index) => {
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
        <p>{props.order.totalCost}</p>
      </div>
    </div>
  );
}

export default Order;
