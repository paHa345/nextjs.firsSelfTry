import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductsSection from "../../components/CardsSection/ProductsSection";
import LoadSpinner from "../../components/UI/LoadSpinner";
import { appStateActions } from "../../store/appStateSlice";
import { cartActions } from "../../store/cartSlice";
import { itemsActions } from "../../store/itemSlice";

function ProductType(props) {
  const dispatch = useDispatch();

  const type = JSON.parse(props.items)[0].ruType;

  useEffect(() => {
    const storage = localStorage.getItem("cartItems");
    dispatch(cartActions.setCartFromLocalStorage(storage));
    dispatch(cartActions.setCartItemsAmount(localStorage.getItem("cartItems")));
    dispatch(appStateActions.setCurrentType(type));
    dispatch(itemsActions.setCurrentTypeItems(JSON.parse(props.items)));
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

export async function getStaticPaths() {
  return {
    paths: [
      { params: { productType: "protein" } },
      { params: { productType: "creatine" } },
      { params: { productType: "lipo" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  let client;
  let db;
  try {
    client = await MongoClient.connect(
      "mongodb://uerqlzlole9xj0pi0wbk:TfXXkUycEhfDe2lkcePT@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bnjpnqkq0agsple?replicaSet=rs0"
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
    .find({ type: context.params.productType })
    .toArray();

  client.close();

  return {
    props: {
      name: context.params.productType,
      items: JSON.stringify(result),
    },
    revalidate: 300,
  };
}

export default ProductType;
