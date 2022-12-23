import styles from "./CartElement.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import Image from "next/image";
import Link from "next/link";

function CartElement(props) {
  const dispatch = useDispatch();

  const removeItemHandler = (e) => {
    e.preventDefault();

    dispatch(cartActions.removeItemFronCart(e.currentTarget.dataset.id));
    dispatch(cartActions.setCartItemsAmount(localStorage.getItem("cartItems")));
  };

  return (
    <div className={styles.cartElementSection}>
      <div className={styles.cartElement}>
        <div className={styles.cartElementCellProducts}>
          <Image
            src={props.image}
            alt="productsImage"
            width={200}
            height={200}
          />
          <div>
            <Link className={styles.cartElementDescription} href="/">
              {props.name}
            </Link>
            <div className={styles.xMark}>
              <Link href="/" data-id={props.id} onClick={removeItemHandler}>
                <FontAwesomeIcon icon={faXmarkCircle} size="1x" />
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.cartElementCellPrice}>{props.price}</div>
        <div className={styles.cartElementCellQuantity}>{props.quantity}</div>
        <div className={styles.cartElementCellCost}>
          {+props.price * props.quantity}
        </div>
      </div>
    </div>
  );
}

export default CartElement;
