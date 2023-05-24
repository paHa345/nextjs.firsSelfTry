import { useRouter } from "next/router";
import Item from "../../components/ItemSection/ProductSection";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { MongoClient } from "mongodb";

import LoadSpinner from "../../components/UI/LoadSpinner";
import { itemsActions } from "../../store/itemSlice";

function Product(props) {
  // const router = useRouter();
  const [item, setItem] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const storage = localStorage.getItem("cartItems");
    dispatch(cartActions.setCartFromLocalStorage(storage));
    dispatch(cartActions.setCartItemsAmount(localStorage.getItem("cartItems")));

    setItem(props.item);
    if (props.item) {
      dispatch(itemsActions.setCurrentItem(JSON.parse(props.item)));
    }
  }, [props.item, dispatch]);

  if (props.item === undefined) {
    return (
      <Fragment>
        <LoadSpinner></LoadSpinner>
      </Fragment>
    );
  }

  return <Item item={item}></Item>;
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { productId: "p1" } },
      { params: { productId: "p2" } },
      { params: { productId: "p3" } },
    ],
    fallback: true,
  };
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
    res.status(500).json({
      message: "Не удалось подключиться к базе данных",
    });
    return;
  }

  const result = await db
    .collection("sportNutritionItems")
    .findOne({ id: context.params.productId });
  console.log(result);

  client.close();

  return {
    props: { item: JSON.stringify(result) },
    revalidate: 300,
  };
}

export default Product;
