import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appStateActions } from "../../store/appStateSlice";
import Card from "../CardsSection/Card";
import LoadSpinner from "../UI/LoadSpinner";
import styles from "./ProductCards.module.css";

function FavouritesProductCards() {
  const dispatch = useDispatch();
  const favouriteItems = useSelector((state) => state.item.favouriteItems);
  const loadFavouritesStatus = useSelector(
    (state) => state.appState.loadFavouriteItems
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
  console.log(favouriteItems);

  return (
    <Fragment>
      {loadFavouritesStatus && (
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
            .map((el) => {
              let inCart = false;
              if (cartIds.includes(el.id)) {
                inCart = true;
              }
              console.log(el);

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
      )}
    </Fragment>
  );
}

export default FavouritesProductCards;
