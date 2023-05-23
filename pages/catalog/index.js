import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { appStateActions } from "../../store/appStateSlice";
import { itemsActions } from "../../store/itemSlice";
import { useEffect } from "react";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import ProductsSection from "../../components/CardsSection/ProductsSection";
import LoadSpinner from "../../components/UI/LoadSpinner";

function Catalog(props) {
  const dispatch = useDispatch();

  const router = useRouter();
  const { data: session, status } = useSession();

  // const type = JSON.parse(props.items)[0].ruType;

  useEffect(() => {
    const storage = localStorage.getItem("cartItems");
    dispatch(cartActions.setCartFromLocalStorage(storage));
    dispatch(cartActions.setCartItemsAmount(localStorage.getItem("cartItems")));
    dispatch(appStateActions.setCurrentType("Все продукты"));
    dispatch(itemsActions.setCurrentTypeItems(JSON.parse(props.items)));
    if (router.query.sortBy) {
      dispatch(itemsActions.sortCurrentItems(router.query.sortBy));
    }
  });
  if (!props.items) {
    return (
      <Fragment>
        <LoadSpinner></LoadSpinner>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <ProductsSection></ProductsSection>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  let client;
  let db;
  try {
    client = await MongoClient.connect(
      `mongodb://${process.env.mongodb_username}:${process.env.mongodb_password}@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/${process.env.mongodb_database}?replicaSet=rs0`
    );
    db = client.db();
  } catch (error) {
    result.status(500).json({
      message: "Не удалось подключиться к базе данных",
    });
    return;
  }

  const result = await db.collection("sportNutritionItems").find().toArray();

  client.close();

  return {
    props: {
      items: JSON.stringify(result),
    },
    revalidate: 300,
  };
}

export default Catalog;
