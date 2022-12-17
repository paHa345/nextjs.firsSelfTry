import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import styles from "./NutrientsPrice.module.css";

function NutrientsPrice(props) {
  const [itemQuantity, serItemQuantity] = useState(1);
  const dispatch = useDispatch();
  const item = useSelector((state) => state.item.item);
  const addToCartHandler = (e) => {
    e.preventDefault();

    dispatch(
      cartActions.addItemToCart({
        item: props.currentItem,
        quantity: itemQuantity,
      })
    );
    dispatch(cartActions.setCartItemsAmount(localStorage.getItem("cartItems")));
  };

  return (
    <div className={styles.itemInfoElement}>
      <div className={styles.itemInfoDescription}>
        <div className={styles.itemDescriptionImages}>
          <Image
            src={props.currentItem.image}
            alt={props.currentItem.image}
            height={500}
            width={200}
            // layout="fill"
            // objectFit="contain"
          />
        </div>
        <div className={styles.itemDescriptionComponents}>
          <p className={styles.itemDescriptionHead}>Состав:</p>

          <div className={styles.componentsTable}>
            <dl className={styles.componentsTableElement}>
              <dt className={styles.componentsTableNutrient}>Белки</dt>
              <dd className={styles.componentsTableNutrientValue}>
                <span>{props.currentItem.nutrients.protein}</span> гр
              </dd>
            </dl>
            <dl className={styles.componentsTableElement}>
              <dt className={styles.componentsTableNutrient}>Жиры</dt>
              <dd className={styles.componentsTableNutrientValue}>
                <span>{props.currentItem.nutrients.fat}</span> гр
              </dd>
            </dl>
            <dl className={styles.componentsTableElement}>
              <dt className={styles.componentsTableNutrient}>Углеводы</dt>
              <dd className={styles.componentsTableNutrientValue}>
                <span>{props.currentItem.nutrients.carbohydrates}</span> гр
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className={styles.itemInfoPrice}>
        <p>
          Цена{" "}
          <span className={styles.itemInfoPriceValue}>
            {" "}
            {props.currentItem.price}{" "}
          </span>
          Р
        </p>
        <div className={styles.productCardButton}>
          <Link href="/" onClick={addToCartHandler}>
            В корзину
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NutrientsPrice;
