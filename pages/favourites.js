import { unstable_getServerSession } from "next-auth";
import { Fragment, useEffect, useState } from "react";
import LoadSpinner from "../components/UI/LoadSpinner";
import { authOptions } from "./api/auth/[...nextauth]";
import ProductsSection from "../components/CardsSection/ProductsSection";
import { useDispatch, useSelector } from "react-redux";
import { itemsActions } from "../store/itemSlice";
import FavouritesProductsSection from "../components/FavouritesSection/FavouritesProductsSection";
import { getFavourites } from "../components/UI/fetchHelper";
import { cartActions } from "../store/cartSlice";

function Favourites(props) {
  const favourites = useSelector((state) => state.item.favouriteItems);
  console.log(favourites);

  const dispatch = useDispatch();

  // const getUserFavouritesIDs = async (userName) => {
  //   const req = await fetch(`/api/users/${userName}`);
  //   const res = await req.json();
  //   console.log(res);

  //   return res.favouritesItems;
  // };

  // const getUserFavouritesItems = async (IDs) => {
  //   const req = await fetch(`/api/items/${IDs}`);
  //   const res = await req.json();
  //   console.log(res);

  //   return res;
  // };

  useEffect(() => {
    const storage = localStorage.getItem("cartItems");
    dispatch(cartActions.setCartFromLocalStorage(storage));
    dispatch(cartActions.setCartItemsAmount(localStorage.getItem("cartItems")));
  });

  useEffect(() => {
    getFavourites()
      .then((data) => {
        dispatch(itemsActions.setFavouriteIDs(data));
        dispatch(itemsActions.setFavouriteItems(data));
      })
      .catch((error) => console.log(error.message));
  }, [dispatch]);

  return (
    <Fragment>
      {!favourites && <LoadSpinner></LoadSpinner>}
      {favourites && <FavouritesProductsSection></FavouritesProductsSection>}
    </Fragment>
  );
}

export default Favourites;

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session !== null) {
    session.user.image = "image";
  }

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session: session } };
}
