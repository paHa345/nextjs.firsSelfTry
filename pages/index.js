import { MongoClient } from "mongodb";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductsSection from "../components/CardsSection/ProductsSection";
import HeaderSection from "../components/HeaderComponents/HeaderComponent";
import { appStateActions } from "../store/appStateSlice";
import { cartActions } from "../store/cartSlice";
import { itemsActions } from "../store/itemSlice";

function HomePage(props) {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.appState.currentType);
  console.log(process.env.SECRET);

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
      {/* <div>
        <nav>
          <Link href="/cart">Cart</Link>
          <br></br>
          <Link href="/login">Login</Link>
          <br></br>
          <Link href="/catalog">Catalog</Link>
          <br></br>
          <Link href="/catalog/protein">All Protein</Link>
          <br></br>
          <Link href="/products/p1">Protein 1</Link>
        </nav>
        <h1>Home page!!!!!</h1>;
      </div> */}

      <ProductsSection typeName={name}></ProductsSection>
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
    },
    revalidate: 300,
  };
}

export default HomePage;
