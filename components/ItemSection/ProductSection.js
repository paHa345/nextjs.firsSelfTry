import styles from "./ItemSection.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import NutrientsPrice from "../ItemSection/NutrientsPrice";
import DescriptionComments from "../ItemSection/DescriptionComments";
import Link from "next/link";
``;

function Item(props) {
  const stickySection = useSelector((state) => state.appState.stickySection);

  const currentItem = useSelector((state) => state.item.item);
  return (
    <section
      className={`${styles.itemSection}
    ${stickySection}`}
    >
      {!props.item && <h1>Загрузка</h1>}
      {props.item && (
        <div className={styles.container}>
          <Link
            className={styles.backLink}
            href={`/catalog/${currentItem.type}`}

            // onClick={goToProductsHandler}
          >
            <FontAwesomeIcon icon={faCircleLeft} size="1x" />
            Назад
          </Link>
          <div className={styles.itemContainer}>
            <div className={styles.itemBreadcrumbClement}></div>
            <div className={styles.itemNameElement}>
              {props.item && (
                <p className={styles.itemName}>{props.item.name}</p>
              )}
            </div>

            {props.item && (
              <NutrientsPrice currentItem={currentItem}></NutrientsPrice>
            )}

            {props.item && (
              <DescriptionComments
                currentItem={currentItem}
              ></DescriptionComments>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Item;
