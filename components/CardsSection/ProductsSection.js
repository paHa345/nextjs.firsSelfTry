import Link from "next/link";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsActions, itemSlice } from "../../store/itemSlice";
import ProductCards from "./ProductCards";
import styles from "./ProductsSection.module.css";

function ProductsSection(props) {
  const stickySection = useSelector((state) => state.appState.stickySection);
  const currentType = useSelector((state) => state.appState.currentType);
  const currentItems = useSelector((state) => state.item.currentItems);
  const [priceSort, setPriceSort] = useState("decrement");

  const dispatch = useDispatch();

  const sortingByPriceHandler = (e) => {
    e.preventDefault();
    if (priceSort === "decrement") {
      setPriceSort("increment");
    } else {
      setPriceSort("decrement");
    }
    dispatch(itemsActions.sortCurrentItems(priceSort));
  };
  return (
    <Fragment>
      <section className={`${styles.bestProducts} ${stickySection}`}>
        <div className={`${styles.container}`}>
          <div className={styles.bestProductsMain}>
            <h2 className={styles.bestProductH2}>{currentType}</h2>
            <div className={styles.sortButton}>
              <Link href="/" onClick={sortingByPriceHandler}>
                {priceSort === "increment"
                  ? "По увеличению цены"
                  : "По уменьшению цены"}
              </Link>
            </div>

            <ProductCards></ProductCards>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default ProductsSection;
