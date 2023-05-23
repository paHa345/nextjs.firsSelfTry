import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadSpinner from "../UI/LoadSpinner";
import Card from "./Card";
import styles from "./ProductCards.module.css";
import { useEffect } from "react";
import { itemsActions } from "../../store/itemSlice";
import Link from "next/link";

function ProductCards() {
  const dispatch = useDispatch();
  const currentItems = useSelector((state) => state.item.currentItems);
  const currentType = useSelector((state) => state.appState.currentType);

  const [currentFilteredProductType, setCurrentFilteredProductType] =
    useState("all");

  const productTypes = [
    { name: "Все продукты", dataName: "all" },
    { name: "Протеин", dataName: "protein" },
    { name: "Креатин", dataName: "creatine" },
    { name: "Жиросжигающие добавки", dataName: "lipo" },
  ];

  let cartItems = useSelector((state) => state.cart.cartItems);
  const router = useRouter();

  const filterButtons = productTypes.map((el) => {
    console.log(currentType);

    const active = el.name === currentType ? `${styles.active}` : "";
    if (el.dataName === "all") {
      return (
        <Link
          key={el.dataName}
          data-name={el.name}
          className={`${styles.sortButton} ${active}`}
          href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/catalog`}
        >
          {el.name}
        </Link>
      );
    }

    return (
      <Link
        key={el.dataName}
        data-name={el.dataName}
        className={`${styles.sortButton} ${active}`}
        href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/catalog/${el.dataName}`}
      >
        {el.name}
      </Link>
    );
  });

  let itemsInPage = [];

  const filteredItems = currentItems.filter((el) => {
    if (currentFilteredProductType === "all") {
      return el.type;
    } else {
      return el.type === currentFilteredProductType;
    }
  });

  useEffect(() => {
    dispatch(itemsActions.setFilteredItems(filteredItems));
  }, [currentFilteredProductType]);

  console.log(filteredItems);

  const setItemsInPage = () => {
    if (router.query.page) {
      itemsInPage = filteredItems.slice(
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

  console.log(router.route);
  const productContainerStyle =
    router.route !== "/"
      ? `${styles.productCardContainer}`
      : `${styles.productCardContainerMain}`;

  return (
    <Fragment>
      <div className={productContainerStyle}>
        {router.route !== "/" && (
          <div className={styles.filterContainer}>{filterButtons}</div>
        )}

        <div className={styles.cardsContainer}>
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
      </div>
    </Fragment>
  );
}

export default ProductCards;
