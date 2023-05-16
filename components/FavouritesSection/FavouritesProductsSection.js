import { Fragment } from "react";
import { useSelector } from "react-redux";
import LoadSpinner from "../UI/LoadSpinner";
import FavouritesProductCards from "./FavouritesProductCards";
import styles from "./ProductsSection.module.css";

function FavouritesProductsSection(props) {
  const stickySection = useSelector((state) => state.appState.stickySection);
  const currentType = useSelector((state) => state.appState.currentType);

  const favourites = useSelector((state) => state.item.favouriteItems);
  console.log(favourites);
  if (favourites[0]?.initial) {
    return <LoadSpinner></LoadSpinner>;
  }

  return (
    <Fragment>
      <section className={`${styles.bestProducts} ${stickySection}`}>
        <div className={`${styles.container}`}>
          <div className={styles.bestProductsMain}>
            <div className={styles.nameContainer}>
              <div className={styles.backgroundNameContainer}>
                <div className={styles.backgroundName}>Избранное</div>
              </div>
              <h2 className={styles.bestProductH2}>Избранное</h2>
            </div>

            <FavouritesProductCards></FavouritesProductCards>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default FavouritesProductsSection;
