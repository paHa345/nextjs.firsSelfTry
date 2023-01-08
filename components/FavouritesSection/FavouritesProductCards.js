import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appStateActions } from "../../store/appStateSlice";
import AddToFavourites from "../UI/AddToFavourites";
import LoadSpinner from "../UI/LoadSpinner";
import RemoveFromFavourites from "../UI/RemoveFromFavourites";
import FavouritesCard from "./FavouritesCard";
import styles from "./ProductCards.module.css";

function FavouritesProductCards() {
  const dispatch = useDispatch();
  const favouriteItems = useSelector((state) => state.item.favouriteItems);
  const loadFavouritesStatus = useSelector(
    (state) => state.appState.loadFavouriteItems
  );
  const favouriteItemsIDs = useSelector(
    (state) => state.item.favouriteItemsIDs
  );

  let cartItems = useSelector((state) => state.cart.cartItems);

  if (cartItems === null) {
    cartItems = [];
  }

  const cartIds = cartItems.map((el) => {
    return el.item.id;
  });
  useEffect(() => {
    dispatch(appStateActions.setLoadFavouriteItemsStatus(true));
  }, [dispatch]);

  if (loadFavouritesStatus && favouriteItems.length === 0) {
    return <h1>Нет элементов для отображения</h1>;
  }

  if (!loadFavouritesStatus) {
    return (
      <Fragment>
        <LoadSpinner></LoadSpinner>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className={styles.productCardContainer}>
        {[...favouriteItems]
          .sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
            if (a.id > b.id) {
              return 1;
            }
          })
          .map((el, index) => {
            let inCart = false;
            if (cartIds.includes(el.id)) {
              inCart = true;
            }

            const fav = favouriteItemsIDs.includes(el.id);

            return (
              <FavouritesCard
                cardName={el.name}
                cardImage={el.image}
                key={el.id}
                id={el.id}
                price={el.price}
                elementInCart={inCart}
                // elementInFavourites={fav}
              ></FavouritesCard>
            );
          })}
      </div>
    </Fragment>
  );
}

export default FavouritesProductCards;
