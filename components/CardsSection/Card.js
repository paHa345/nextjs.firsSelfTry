import { Fragment, useState } from "react";
import styles from "./Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { appStateActions } from "../../store/appStateSlice";
import { itemsActions } from "../../store/itemSlice";
import { cartActions } from "../../store/cartSlice";
import Link from "next/link";
import Image from "next/image";

function Card(props) {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const itemState = useSelector((state) => state.item);

  const changeQuantityHandler = (e) => {
    setQuantity(e.target.value);
  };

  const addToCartHandler = (e) => {
    e.preventDefault();

    const item = itemState.productsByType.find((el) => el.id === props.id);
    dispatch(
      cartActions.addItemToCart({ item: item, quantity: Number(quantity) })
    );
    setQuantity(1);
    dispatch(cartActions.setCartItemsAmount(localStorage.getItem("cartItems")));
  };

  return (
    <Fragment>
      <div className={styles.productCard}>
        <div className={styles.productCardRaiting}>
          <FontAwesomeIcon icon={faStar} size="2x" spin />

          <div className={styles.productCardRaitingValue}>
            <p>5</p>
          </div>
        </div>
        <Link href={`/products/${props.id}`}>
          <Image
            src={props.cardImage}
            className={styles.productCardImg}
            alt={props.cardName}
            width={200}
            height={200}
          />
        </Link>

        <div className={styles.productCardTextSection}>
          <Link className={styles.cardLink} href={`/products/${props.id}`}>
            {props.cardName}
          </Link>

          <div className={styles.inputContainer}>
            <b>Количество</b>
            <br />
            <input
              type="text"
              size="2"
              // placeholder="1"
              value={quantity}
              onChange={changeQuantityHandler}
            ></input>
          </div>
          <p className={styles.price}>
            {props.price} <span>Р</span>
          </p>
        </div>

        <div className={styles.productCardButton}>
          <Link href="/" onClick={addToCartHandler}>
            В корзину
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
export default Card;
