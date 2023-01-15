import { MongoClient } from "mongodb";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductsSection from "../components/CardsSection/ProductsSection";
import HeaderSection from "../components/HeaderComponents/HeaderComponent";
import SliderContainer from "../components/Slider/SliderContainer";
import { appStateActions } from "../store/appStateSlice";
import { cartActions } from "../store/cartSlice";
import { itemsActions } from "../store/itemSlice";

function HomePage(props) {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.appState.currentType);
  // console.log(process.env.SECRET);

  useEffect(() => {
    const storage = localStorage.getItem("cartItems");
    dispatch(cartActions.setCartFromLocalStorage(storage));
    dispatch(appStateActions.setCurrentType("Особое предложение"));
    dispatch(cartActions.setCartItemsAmount(localStorage.getItem("cartItems")));

    dispatch(itemsActions.setCurrentTypeItems(JSON.parse(props.items)));
  });
  if (!props.items) {
    return <h1>Загрузка</h1>;
  }

  return (
    <Fragment>
      <SliderContainer images={props.sliderImages}></SliderContainer>

      <ProductsSection typeName={name}></ProductsSection>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const path = require("path");
  const fs = require("fs");
  const { resolve } = require("path");
  const dir = "./../public/img/sliderImage";

  const absolutePath = resolve("./public/img/sliderImage");
  let imagesName;
  try {
    imagesName = fs.readdirSync(absolutePath, "utf-8");
  } catch (error) {
    console.log(error);
  }

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
    .find({ promo: true })
    .toArray();

  client.close();

  return {
    props: {
      items: JSON.stringify(result),
      sliderImages: imagesName,
    },
    revalidate: 300,
  };
}

export default HomePage;
