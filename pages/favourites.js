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
import { useSession } from "next-auth/react";
import { appStateActions } from "../store/appStateSlice";

function Favourites(props) {
  const [getFavouritesItems, setGetFavouritesItems] = useState(false);
  const favourites = useSelector((state) => state.item.favouriteItems);

  const { data: session, status } = useSession();

  const dispatch = useDispatch();

  useEffect(() => {
    const storage = localStorage.getItem("cartItems");
    dispatch(cartActions.setCartFromLocalStorage(storage));
    dispatch(cartActions.setCartItemsAmount(localStorage.getItem("cartItems")));
  });

  useEffect(() => {
    dispatch(appStateActions.setLoadFavouriteItemsStatus(false));
    if (session) {
      getFavourites(session.user.email)
        .then((data) => {
          dispatch(itemsActions.setFavouriteIDs(data));
          dispatch(itemsActions.setFavouriteItems(data));
        })
        .catch((error) => console.log(error.message));
      // setGetFavouritesItems(true);
    }
    dispatch(appStateActions.setLoadFavouriteItemsStatus(true));
  }, [dispatch, session]);

  return (
    <Fragment>
      <FavouritesProductsSection></FavouritesProductsSection>

      {/* {!getFavouritesItems && <LoadSpinner></LoadSpinner>} */}
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
