import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddToFavourites from "../UI/AddToFavourites";
import LoadSpinner from "../UI/LoadSpinner";
import Card from "./Card";
import styles from "./ProductCards.module.css";

function ProductCards() {
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

  // useEffect(() => {
  //   const fetchFavourites = async () => {
  //     const req = await fetch("/api/users/paHa345");
  //     const res = await req.json();
  //     console.log(res);
  //     setFavourites(res.favouritesItems);
  //   };

  //   fetchFavourites();
  // }, []);

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
        {currentItems.map((el, index) => {
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

export default ProductCards;
