import Link from "next/link";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import ProductCards from "./ProductCards";
import styles from "./ProductsSection.module.css";

function ProductsSection(props) {
  const stickySection = useSelector((state) => state.appState.stickySection);
  const currentType = useSelector((state) => state.appState.currentType);
  const [priceSort, setPriceSort] = useState("По увеличению цены");
  return (
    <Fragment>
      <section className={`${styles.bestProducts} ${stickySection}`}>
        <div className={`${styles.container}`}>
          <div className={styles.bestProductsMain}>
            <h2 className={styles.bestProductH2}>{currentType}</h2>

            <div className={styles.sortButton}>
              <Link href="/">{priceSort}</Link>
            </div>

            <ProductCards></ProductCards>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default ProductsSection;
