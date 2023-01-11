import { unstable_getServerSession } from "next-auth";
import { Fragment, useEffect, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { useDispatch, useSelector } from "react-redux";
import FavouritesProductsSection from "../components/FavouritesSection/FavouritesProductsSection";
import { cartActions } from "../store/cartSlice";
import { useSession } from "next-auth/react";
import OrdersSection from "../components/My/OrdersSection";
import LoadSpinner from "../components/UI/LoadSpinner";

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
    async function fetchOrders() {
      dispatch(cartActions.setOrders({ status: "Загрузка" }));
      // alert("Загрузка");
      const req = await fetch(`/api/orders/${session.user.email}`);
      const res = await req.json();
      return res;
    }
    fetchOrders().then((data) => {
      dispatch(cartActions.setOrders(data.result));
    });
  }, [session.user.email, dispatch]);

  // if (!session) {
  //   return <LoadSpinner></LoadSpinner>;
  // }

  //   useEffect(() => {
  //     dispatch(appStateActions.setLoadFavouriteItemsStatus(false));
  //     if (session) {
  //       getFavourites(session.user.email)
  //         .then((data) => {
  //           dispatch(itemsActions.setFavouriteIDs(data));
  //           dispatch(itemsActions.setFavouriteItems(data));
  //         })
  //         .catch((error) => console.log(error.message));
  //     }
  //     dispatch(appStateActions.setLoadFavouriteItemsStatus(true));
  //   }, [dispatch, session]);

  return (
    <Fragment>
      <OrdersSection></OrdersSection>
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
