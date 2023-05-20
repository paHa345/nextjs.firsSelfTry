import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsActions } from "../../store/itemSlice";
import PaginationSection from "../PaginationSection/PaginationSection";
import SearchProductCards from "./SearchProductCards";
import styles from "./SearchProductsSection.module.css";

function SearchProductsSection(props) {
  const stickySection = useSelector((state) => state.appState.stickySection);
  const currentSearchItems = useSelector(
    (state) => state.item.currentSearchItems
  );
  const [priceSort, setPriceSort] = useState("decrement");

  const sort = useSelector((state) => state.item.sortBy);
  const router = useRouter();

  const dispatch = useDispatch();

  const sortingByPriceHandler = (e) => {
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
            <div className={styles.nameContainer}>
              <div className={styles.backgroundNameContainer}>
                <div
                  className={styles.backgroundName}
                >{`Результаты поиска: ${router.query.searchText} `}</div>
              </div>
              <h2
                className={styles.bestProductH2}
              >{`Результаты поиска: ${router.query.searchText} `}</h2>
            </div>

            {!currentSearchItems.status && (
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
            )}

            <SearchProductCards items={props.items}></SearchProductCards>

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
