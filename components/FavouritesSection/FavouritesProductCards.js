import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadSpinner from "../UI/LoadSpinner";
import FavouritesCard from "./FavouritesCard";
import styles from "./ProductCards.module.css";

function FavouritesProductCards() {
  const [favourites, setFavourites] = useState([]);
  const favouriteItems = useSelector((state) => state.item.favouriteItems);
  console.log(favouriteItems);

  const favouriteItemsIDs = useSelector(
    (state) => state.item.favouriteItemsIDs
  );
  console.log(favouriteItemsIDs);

  let cartItems = useSelector((state) => state.cart.cartItems);
  const router = useRouter();

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

  if (favouriteItems.length === 0) {
    return (
      <Fragment>
        <LoadSpinner></LoadSpinner>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className={styles.productCardContainer}>
        {favouriteItems.map((el, index) => {
          let inCart = false;
          if (cartIds.includes(el.id)) {
            inCart = true;
          }

          const fav = favouriteItemsIDs.includes(el.id);
          console.log(fav);

          return (
            <FavouritesCard
              cardName={el.name}
              cardImage={el.image}
              key={el.id}
              id={el.id}
              price={el.price}
              elementInCart={inCart}
              elementInFavourites={fav}
            ></FavouritesCard>
          );
        })}
      </div>
    </Fragment>
  );
}

export default FavouritesProductCards;
