import { Fragment, useEffect, useState } from "react";
import styles from "./SearchCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faCircleCheck,
} from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { appStateActions } from "../../store/appStateSlice";
import { itemsActions } from "../../store/itemSlice";
import { cartActions } from "../../store/cartSlice";
import Link from "next/link";
import Image from "next/image";
import { addToFavourites } from "../UI/fetchHelper";
import { useSession } from "next-auth/react";
import AddToFavourites from "../UI/AddToFavourites";

function SearchCard(props) {
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(props.elementInCart);
  const [notificationText, setNotificationText] = useState("");
  const dispatch = useDispatch();
  const favouritesIDs = useSelector((state) => state.item.favouriteItemsIDs);
  const favouriteItems = useSelector((state) => state.item.favouriteItems);
  const showAddToFavNotification = useSelector(
    (state) => state.appState.addToFavouriteNotification
  );

  const notificationId = useSelector(
    (state) => state.appState.itemNotification
  );

  const { data: session, status } = useSession();

  const changeQuantityHandler = (e) => {
    setQuantity(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(appStateActions.setAddToFavouriteNotification(false));
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [showAddToFavNotification, dispatch]);

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

  const addToFavouritesHandler = async (e) => {
    e.preventDefault();
    if (!session) {
      dispatch(
        appStateActions.setFetchNotificationStatus({
          status: "Error",
          text: `Зарегистрируйтесь чтобы добавить товар в избранное`,
        })
      );
      return;
    }

    try {
      await addToFavourites(session.user.email, props.id, favouritesIDs, "add");
      setNotificationText("Товар добавлен в избранное");
      dispatch(
        appStateActions.setAddToFavouriteNotification({
          notification: true,
          id: props.id,
        })
      );
    } catch (error) {}

    const arr = [...favouriteItems];
    arr.push(props);
    dispatch(itemsActions.setFavouriteItems(arr));
    dispatch(itemsActions.setFavouriteIDs(arr));
  };

  const removeFromFavouritesHandler = async (e) => {
    e.preventDefault();

    if (!session) {
      dispatch(
        appStateActions.setFetchNotificationStatus({
          status: "Error",
          text: `Зарегистрируйтесь чтобы удалить товар из избранного`,
        })
      );
      return;
    }

    try {
      await addToFavourites(
        session.user.email,
        props.id,
        favouritesIDs,
        "remove"
      );
      setNotificationText("Товар удалён из избранного");
      dispatch(
        appStateActions.setAddToFavouriteNotification({
          notification: true,
          id: props.id,
        })
      );
    } catch (error) {}

    const arr = [...favouriteItems];

    arr.splice(
      arr
        .map((el) => {
          return el.id;
        })
        .indexOf(props.id),
      1
    );

    dispatch(itemsActions.setFavouriteItems(arr));
    dispatch(itemsActions.setFavouriteIDs(arr));
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
              value={quantity}
              onChange={changeQuantityHandler}
            ></input>
          </div>
          <p className={styles.price}>
            {props.price} <span>Р</span>
          </p>
        </div>
        <div className={styles.footerCardSection}>
          {favouritesIDs.includes(props.id) && (
            <Link href="/" onClick={removeFromFavouritesHandler}>
              <FontAwesomeIcon icon={faCircleCheck} size="4x" />
            </Link>
          )}
          {!favouritesIDs.includes(props.id) && (
            <Link href="/" onClick={addToFavouritesHandler}>
              <FontAwesomeIcon icon={faHeart} size="4x" />
            </Link>
          )}

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

        <div className={styles.notification}>
          <div className={styles.notificationContainer}>
            {showAddToFavNotification && notificationId === props.id && (
              <AddToFavourites text={notificationText}></AddToFavourites>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default SearchCard;
