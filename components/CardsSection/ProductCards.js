import { useRouter } from "next/router";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import LoadSpinner from "../UI/LoadSpinner";
import Card from "./Card";
import styles from "./ProductCards.module.css";

function ProductCards() {
  const currentItems = useSelector((state) => state.item.currentItems);

  let cartItems = useSelector((state) => state.cart.cartItems);
  const router = useRouter();

  let itemsInPage = [];

  const setItemsInPage = () => {
    if (router.query.page) {
      itemsInPage = currentItems.slice(
        router.query.page * 4 - 4,
        router.query.page * 4
      );
    } else {
      itemsInPage = currentItems.slice(0, 4);
    }
  };
  setItemsInPage();

  if (cartItems === null) {
    cartItems = [];
  }

  const cartIds = cartItems.map((el) => {
    return el.item.id;
  });

  if (currentItems.length === 0) {
    return (
      <Fragment>
        <LoadSpinner></LoadSpinner>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className={styles.productCardContainer}>
        {itemsInPage.map((el) => {
          let inCart = false;
          if (cartIds.includes(el.id)) {
            inCart = true;
          }

          return (
            <Card
              cardName={el.name}
              image={el.image}
              key={el.id}
              id={el.id}
              price={el.price}
              elementInCart={inCart}
            ></Card>
          );
        })}
      </div>
    </Fragment>
  );
}

export default ProductCards;
