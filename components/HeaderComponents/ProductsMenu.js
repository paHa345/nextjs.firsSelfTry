import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { appStateActions } from "../../store/appStateSlice";
import { itemsActions } from "../../store/itemSlice";
import styles from "./ProductsMenu.module.css";

function ProductsMenu(props) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.productsByType);

  const handle = (e) => {
    console.log("llll");
  };

  const clickHandler = (e) => {
    e.preventDefault();

    const name = e.target.dataset.name;
    console.log(name);

    const currentProd = items.filter((el) => el.type === name);

    dispatch(appStateActions.setCurrentType(e.target.textContent));
    dispatch(itemsActions.setCurrentTypeItems(currentProd));
    dispatch(appStateActions.hideItem());
    window.history.pushState({}, "", `/catalog/${name}`);
    // router.push({
    //   pathname:`/catalog/[productType]`,
    //   query:{
    //     productType:router.query.id
    //   }
    // })
  };

  return (
    <div className={styles.productsNav} onMouseLeave={props.onLeave}>
      <div className={styles.productsNavList}>
        <div
          data-name="protein"
          onClick={props.onHide}
          className={styles.productsNavListEl}
        >
          <Link
            href="/catalog/protein"
            // onClick={clickHandler}
          >
            Протеин
          </Link>
        </div>
        <div
          data-name="creatine"
          onClick={props.onHide}
          className={styles.productsNavListEl}
        >
          <Link
            href="/catalog/creatine"
            // onClick={clickHandler}
          >
            Креатин
          </Link>
        </div>
        <div
          data-name="lipo"
          onClick={props.onHide}
          className={styles.productsNavListEl}
        >
          <Link
            href="/catalog/lipo"
            //  onClick={clickHandler}
          >
            Жиросжигающие добавки
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductsMenu;
