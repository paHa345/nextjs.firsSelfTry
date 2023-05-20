import { Fragment } from "react";
import { useSelector } from "react-redux";
import LoadSpinner from "../UI/LoadSpinner";
import Order from "./Order";
import styles from "./Orders.module.css";

function Orders() {
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
