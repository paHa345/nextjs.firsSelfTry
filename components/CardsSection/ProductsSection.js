import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsActions, itemSlice } from "../../store/itemSlice";
import PaginationSection from "../PaginationSection/PaginationSection";
import FetchNotification from "../UI/FetchNotification";
import ProductCards from "./ProductCards";
import styles from "./ProductsSection.module.css";

function ProductsSection(props) {
  const stickySection = useSelector((state) => state.appState.stickySection);
  const currentType = useSelector((state) => state.appState.currentType);
  const currentItems = useSelector((state) => state.item.currentItems);
  const [priceSort, setPriceSort] = useState("decrement");

  const sort = useSelector((state) => state.item.sortBy);
  const router = useRouter();

  const dispatch = useDispatch();

  const fetchStatus = useSelector(
    (state) => state.appState.fetchDataNotification
  );
  const fetchStatusText = useSelector((state) => state.appState.fetchText);

  const sortingByPriceHandler = (e) => {
    // e.preventDefault();
    if (priceSort === "decrement") {
      dispatch(itemsActions.setSortBy("increment"));
      setPriceSort("increment");
    } else {
      dispatch(itemsActions.setSortBy("decrement"));
      setPriceSort("decrement");
    }
    dispatch(itemsActions.sortCurrentItems(priceSort));
  };
  return (
    <Fragment>
      <section className={`${styles.bestProducts} ${stickySection}`}>
        <div className={`${styles.container}`}>
          <div className={styles.bestProductsMain}>
            <div className={styles.nameContainer}>
              <div className={styles.backgroundNameContainer}>
                <div className={styles.backgroundName}>{currentType}</div>
              </div>
              <h2 className={styles.bestProductH2}>{currentType}</h2>
            </div>
            {router.query.productType && (
              <div className={styles.sortButton}>
                <Link
                  href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/catalog/${
                    router.query.productType
                  }?page=${1}${sort ? `&sortBy=${sort}` : ""}`}
                  onClick={sortingByPriceHandler}
                >
                  {priceSort === "increment"
                    ? "По увеличению цены"
                    : "По уменьшению цены"}
                </Link>
              </div>
            )}

            <ProductCards></ProductCards>

            {/* <div className={styles.notificationContainer}>
              {fetchStatus && (
                <FetchNotification
                  status={fetchStatus}
                  text={fetchStatusText}
                ></FetchNotification>
              )}
            </div> */}
            {router.query.productType && (
              <PaginationSection
                itemsQuantity={currentItems.length}
                type={currentType}
              ></PaginationSection>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default ProductsSection;
