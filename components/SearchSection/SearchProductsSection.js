import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsActions, itemSlice } from "../../store/itemSlice";
import PaginationSection from "../PaginationSection/PaginationSection";
import FetchNotification from "../UI/FetchNotification";
import SearchProductCards from "./SearchProductCards";
import styles from "./SearchProductsSection.module.css";

function SearchProductsSection(props) {
  const stickySection = useSelector((state) => state.appState.stickySection);
  const currentType = useSelector((state) => state.appState.currentType);
  const currentSearchItems = useSelector(
    (state) => state.item.currentSearchItems
  );
  const [priceSort, setPriceSort] = useState("decrement");

  // console.log(currentSearchItems);

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
    dispatch(itemsActions.sortCurrentSearchItems(priceSort));
  };
  return (
    <Fragment>
      <section className={`${styles.bestProducts} ${stickySection}`}>
        <div className={`${styles.container}`}>
          <div className={styles.bestProductsMain}>
            <h2
              className={styles.bestProductH2}
            >{`Результаты поиска: ${router.query.searchText} `}</h2>
            <div className={styles.sortButton}>
              <Link
                href={`${process.env.NEXTAUTH_URL}/search/${
                  router.query.searchText
                }?page=${1}${sort ? `&sortBy=${sort}` : ""}`}
                onClick={sortingByPriceHandler}
              >
                {priceSort === "increment"
                  ? "По увеличению цены"
                  : "По уменьшению цены"}
              </Link>
            </div>

            <SearchProductCards items={props.items}></SearchProductCards>

            {/* <div className={styles.notificationContainer}>
              {fetchStatus && (
                <FetchNotification
                  status={fetchStatus}
                  text={fetchStatusText}
                ></FetchNotification>
              )}
            </div> */}

            <PaginationSection
              itemsQuantity={props?.items?.length}
              type={"search"}
              search={true}
            ></PaginationSection>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default SearchProductsSection;
