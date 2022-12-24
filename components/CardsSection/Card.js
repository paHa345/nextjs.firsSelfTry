import { Fragment, useEffect, useState } from "react";
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
  const [inCart, setInCart] = useState(props.elementInCart);

  useEffect(() => {
    console.log(`incart: ${inCart}`);
  }, [inCart]);

  const dispatch = useDispatch();

  const itemState = useSelector((state) => state.item);

  const changeQuantityHandler = (e) => {
    setQuantity(e.target.value);
  };

  const addToCartHandler = async (e) => {
    e.preventDefault();
    async function fetchItem() {
      const req = await fetch(`/api/item/${props.id}`);
      const res = await req.json();
      if (!req.ok) {
        throw new Error(res.message);
      }
      return res;
    }

    const fetchedItem = await fetchItem().catch((error) => alert(error));
    if (!fetchedItem) {
      return;
    }

    dispatch(
      cartActions.addItemToCart({
        item: fetchedItem.item,
        quantity: Number(quantity),
      })
    );
    setInCart(true);
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
            priority={true}
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

        {!inCart && (
          <div className={styles.productCardButton}>
            <Link href="/" onClick={addToCartHandler}>
              В корзину
            </Link>
          </div>
        )}
        {inCart && (
          <div className={styles.productCardButton}>
            <Link href="/" onClick={addToCartHandler}>
              В корзинe
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
}
export default Card;
