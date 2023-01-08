import { Fragment, useEffect, useState } from "react";
import styles from "./Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faCircleCheck,
} from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { itemsActions } from "../../store/itemSlice";
import { cartActions } from "../../store/cartSlice";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { addToFavourites } from "../UI/fetchHelper";
import AddToFavourites from "../UI/AddToFavourites";

function FavouritesCard(props) {
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(props.elementInCart);
  const [image, setImage] = useState("/img/products/defaultImage.jpg");
  const [alt, setAlt] = useState("name");
  useEffect(() => {
    if (props.cardImage) {
      setImage(props.cardImage);
    }
  }, [props.cardImage]);

  useEffect(() => {
    if (props.cardName) {
      setAlt(props.cardName);
    }
  }, [props.cardName]);

  const dispatch = useDispatch();

  const favouritesIDs = useSelector((state) => state.item.favouriteItemsIDs);
  const favouriteItems = useSelector((state) => state.item.favouriteItems);
  const { data: session, status } = useSession();

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

  const addToFavouritesHandler = (e) => {
    e.preventDefault();
    console.log("Add to favourites");
  };

  const removeFromFavouritesHandler = async (e) => {
    e.preventDefault();

    if (!session) {
      alert("Зарегистрируйтесь чтобы добавить товар в избранное");
      return;
    }

    await addToFavourites(
      session.user.email,
      props.id,
      favouritesIDs,
      "remove"
    );

    const arr = [...favouriteItems];

    arr.splice(
      arr
        .map((el) => {
          return el.id;
        })
        .indexOf(props.id),
      1
    );

    dispatch(itemsActions.setFavouriteIDs(arr));

    dispatch(itemsActions.setFavouriteItems(arr));
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
            src={image}
            className={styles.productCardImg}
            alt={alt}
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
      </div>
    </Fragment>
  );
}
export default FavouritesCard;
