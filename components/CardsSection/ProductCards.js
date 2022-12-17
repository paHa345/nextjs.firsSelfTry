import { Fragment } from "react";
import { useSelector } from "react-redux";
import LoadSpinner from "../UI/LoadSpinner";
import Card from "./Card";
import styles from "./ProductCards.module.css";

function ProductCards() {
  const currentItems = useSelector((state) => state.item.currentItems);

  if (currentItems.length === 0) {
    return (
      <Fragment>
        <LoadSpinner></LoadSpinner>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className={styles.productCardContainer}>
        {currentItems.map((el, index) => {
          return (
            <Card
              cardName={el.name}
              cardImage={el.image}
              key={index}
              id={el.id}
              price={el.price}
            ></Card>
          );
        })}
      </div>
    </Fragment>
  );
}

export default ProductCards;
