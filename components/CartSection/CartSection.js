import { Fragment, useEffect, useState } from "react";
import Modal from "../UI/Modal";
import ButtonTakeOrder from "./ButtonTakeOrder";
import CartElement from "./CartElement";
import CartMain from "./CartMain";
import styles from "./CartSection.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import FetchNotification from "../UI/FetchNotification";

function BascetSection(props) {
  const [cart, setCart] = useState([]);
  const currentCart = useSelector((state) => state.cart.cartItems);

  const fetchStatus = useSelector(
    (state) => state.appState.fetchDataNotification
  );
  const fetchStatusText = useSelector((state) => state.appState.fetchText);

  useEffect(() => {
    if (currentCart) {
      setCart(currentCart);
    }
  }, [currentCart]);

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
            <div className={styles.nameContainer}>
              <div className={styles.backgroundNameContainer}>
                <div className={styles.backgroundName}>Корзина</div>
              </div>
              <h2 className={styles.bestProductH2}>Корзина</h2>
            </div>

            <div className={styles.notificationContainer}>
              {fetchStatus && (
                <FetchNotification
                  status={fetchStatus}
                  text={fetchStatusText}
                ></FetchNotification>
              )}
            </div>

            <div className={styles.cartMainContainer}>
              <div className={styles.cartContainer}>
                <CartMain></CartMain>

                {storage && cartElements}
              </div>
              <div className={styles.cartTotalAmount}>
                <div>
                  <div className={styles.totalText}>Сумма товаров</div>
                  <div className={styles.totalAmount}>
                    {`${totalAmount} `}
                    <span>₽</span>
                  </div>
                </div>
                <ButtonTakeOrder></ButtonTakeOrder>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
export default BascetSection;
