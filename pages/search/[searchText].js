// import { MongoClient } from "mongodb";

import { useSession } from "next-auth/react";
import Error from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchProductsSection from "../../components/SearchSection/SearchProductsSection";
import { getFavourites } from "../../components/UI/fetchHelper";
import { cartActions } from "../../store/cartSlice";
import { itemsActions } from "../../store/itemSlice";

function Search(props) {
  //   console.log(JSON.parse(props.items));
  const [searchItems, setsearchItems] = useState();
  console.log(props.search);
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const storage = localStorage.getItem("cartItems");
    dispatch(cartActions.setCartFromLocalStorage(storage));
    dispatch(cartActions.setCartItemsAmount(localStorage.getItem("cartItems")));
    if (router.query.sortBy) {
      dispatch(itemsActions.sortCurrentItems(router.query.sortBy));
    }
  }, [dispatch, router.query.sortBy]);

  useEffect(() => {
    if (session) {
      getFavourites(session.user.email)
        .then((data) => {
          dispatch(itemsActions.setFavouriteIDs(data));
          dispatch(itemsActions.setFavouriteItems(data));
        })
        .catch((error) => console.log(error.message));
    }
  }, [dispatch, session]);

  useEffect(() => {
    const getSearchItems = async (e) => {
      const req = await fetch(`/api/search/${props.search}`);
      const res = await req.json();

      if (!req.ok) {
        throw new Error(res.message);
      }
      setsearchItems(res.searchItems);
      return res;
    };
    getSearchItems()
      .then((data) => {
        dispatch(itemsActions.setCurrentSearchItems(data.searchItems));
        console.log(data);
      })
      .catch((error) => console.log(error.props));
  }, [props.search, dispatch]);

  return <SearchProductsSection items={searchItems}></SearchProductsSection>;
}

export default Search;

export async function getServerSideProps(context) {
  //   console.log(context.params);

  //   let client;
  //   let db;
  //   try {
  //     client = await MongoClient.connect(
  //       "mongodb://uerqlzlole9xj0pi0wbk:TfXXkUycEhfDe2lkcePT@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bnjpnqkq0agsple?replicaSet=rs0"
  //     );
  //     db = client.db();
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Не удалось подключиться к базе данных",
  //     });
  //     return;
  //   }

  //   const result = await db
  //     .collection("sportNutritionItems")
  //     .find({ name: context.params.searchText })
  //     .toArray();
  //   console.log(result);

  //   client.close();

  //   return { props: { items: JSON.stringify(result) } };
  return { props: { search: context.params.searchText } };
}
