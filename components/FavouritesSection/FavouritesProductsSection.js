import { Fragment } from "react";
import { useSelector } from "react-redux";
import FavouritesProductCards from "./FavouritesProductCards";
import styles from "./ProductsSection.module.css";

function FavouritesProductsSection(props) {
  const stickySection = useSelector((state) => state.appState.stickySection);
  const currentType = useSelector((state) => state.appState.currentType);
  return (
    <Fragment>
      <section className={`${styles.bestProducts} ${stickySection}`}>
        <div className={`${styles.container}`}>
          <div className={styles.bestProductsMain}>
            <h2 className={styles.bestProductH2}>Избранное</h2>

            <FavouritesProductCards></FavouritesProductCards>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default FavouritesProductsSection;
