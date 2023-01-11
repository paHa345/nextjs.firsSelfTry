import styles from "./ItemSection.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import NutrientsPrice from "../ItemSection/NutrientsPrice";
import DescriptionComments from "../ItemSection/DescriptionComments";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { itemsActions } from "../../store/itemSlice";
import { useEffect } from "react";
import { appStateActions } from "../../store/appStateSlice";

function Item(props) {
  const stickySection = useSelector((state) => state.appState.stickySection);
  const currentItem = useSelector((state) => state.item.item);
  const ordereditems = useSelector((state) => state.item.orderedItems);

  const orderedItems = [];
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      const getUser = async () => {
        const req = await fetch(`/api/orders/${session?.user?.email}`);
        const data = await req.json();
        if (!req.ok) {
          console.log("Не удалось загрузить список заказов");
        }

        const arr = data.result.map((el, index) => {
          return el.items.map((el) => {
            return el.item.id;
          });
        });

        arr.map((el) => {
          return el.map((el) => {
            if (!orderedItems.includes(el)) {
              orderedItems.push(el);
            }
          });
        });
        console.log(orderedItems);
        dispatch(itemsActions.setOrderedItems(orderedItems));
      };
      getUser();
    }
  }, [session]);

  useEffect(() => {
    if (props.item) {
      dispatch(
        appStateActions.setCanAddComment(
          ordereditems.includes(JSON.parse(props.item).id)
        )
      );
    }
  }, [props.item, dispatch, ordereditems]);

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
                // canAddComment={ordereditems.includes(JSON.parse(props.item).id)}
              ></DescriptionComments>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Item;
