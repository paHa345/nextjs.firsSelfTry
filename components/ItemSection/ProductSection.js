import styles from "./ProductSection.module.css";
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
        dispatch(itemsActions.setOrderedItems(orderedItems));
      };
      getUser();
    }
  }, [session, dispatch]);

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
          >
            {currentItem.type[0].toUpperCase() + currentItem.type.slice(1)}
          </Link>

          <div className={styles.nameContainer}>
            <div className={styles.backgroundNameContainer}>
              <div className={styles.backgroundName}>{currentItem.name}</div>
            </div>
            <h2 className={styles.bestProductH2}>{currentItem.name}</h2>
          </div>

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
