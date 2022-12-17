import { Fragment, useEffect } from "react";
import Modal from "../UI/Modal";
import ButtonTakeOrder from "./ButtonTakeOrder";
import CartElement from "./CartElement";
import CartMain from "./CartMain";
import styles from "./CartSection.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";

function BascetSection(props) {
  const cart = useSelector((state) => state.cart.cartItems);
  let storage = null;

  if (typeof window !== "undefined") {
    storage = localStorage.getItem("cartItems");
  }

  let cartElements;
  let totalAmount;

  cartElements = cart.map((el, index) => {
    return (
      <CartElement
        id={el.item.id}
        image={el.item.image}
        name={el.item.name}
        price={el.item.price}
        quantity={el.quantity}
        key={index}
      ></CartElement>
    );
  });

  if (storage !== null) {
    totalAmount = cart.reduce((acc, current) => {
      return acc + current.item.price * current.quantity;
    }, 0);
  } else {
    totalAmount = 0;
  }

  return (
    <Fragment>
      <section className={styles.bestProducts}>
        <div className={styles.container}>
          <div className={styles.cardSection}>
            <div className={styles.cartHaedSection}>
              <h2 className={styles.cartMainText}>Корзина</h2>
            </div>

            <div className={styles.cartContainer}>
              <CartMain></CartMain>

              {storage && cartElements}
            </div>
            <div className={styles.cartTotalAmount}>
              <div>Сумма товаров</div>
              <div>
                {`${totalAmount} `}
                <span>Р</span>
              </div>
            </div>
            <ButtonTakeOrder></ButtonTakeOrder>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
export default BascetSection;
