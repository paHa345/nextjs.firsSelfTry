import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../CardsSection/Card";
import AddToFavourites from "../UI/AddToFavourites";
import LoadSpinner from "../UI/LoadSpinner";
import SearchCard from "./SearchCard";
import styles from "./SearchProductCards.module.css";

function SearchProductCards(props) {
  const [favourites, setFavourites] = useState([]);
  const currentItems = useSelector((state) => state.item.currentItems);
  const favouriteItemsIDs = useSelector(
    (state) => state.item.favouriteItemsIDs
  );
  let cartItems = useSelector((state) => state.cart.cartItems);
  const router = useRouter();
  const showAddToFavNotification = useSelector(
    (state) => state.appState.addToFavouriteNotification
  );
  const currentSearchItems = useSelector(
    (state) => state.item.currentSearchItems
  );
  const sort = useSelector((state) => state.item.sortBy);

  if (currentSearchItems.length === 0) {
    return (
      <Fragment>
        <LoadSpinner></LoadSpinner>
      </Fragment>
    );
  }

  if (currentSearchItems.status) {
    return (
      <Fragment>
        <h1 className={styles.bestProductH2}>Ничего не найдено</h1>
      </Fragment>
    );
  }

  let itemsInPage = [];

  const setItemsInPage = () => {
    if (router.query.page) {
      itemsInPage = currentSearchItems.slice(
        router.query.page * 4 - 4,
        router.query.page * 4
      );
    } else {
      itemsInPage = currentSearchItems.slice(0, 4);
    }
  };
  setItemsInPage();

  if (cartItems === null) {
    cartItems = [];
  }

  const cartIds = cartItems.map((el) => {
    return el.item.id;
  });

  // if (props.items.length === 0) {
  //   return (
  //     <Fragment>
  //       <LoadSpinner></LoadSpinner>
  //     </Fragment>
  //   );
  // }

  return (
    <Fragment>
      <div className={styles.productCardContainer}>
        {itemsInPage.map((el, index) => {
          let inCart = false;
          if (cartIds.includes(el.id)) {
            inCart = true;
          }

          const fav = favouriteItemsIDs.includes(el.id);

          return (
            <Card
              cardName={el.name}
              cardImage={el.image}
              key={el.id}
              id={el.id}
              price={el.price}
              elementInCart={inCart}
              // elementInFavourites={fav}
            ></Card>
          );
        })}

        {/* <div className={styles.notificationContainer}>
          {showAddToFavNotification && <AddToFavourites></AddToFavourites>}
        </div> */}
      </div>
    </Fragment>
  );
}

export default SearchProductCards;
