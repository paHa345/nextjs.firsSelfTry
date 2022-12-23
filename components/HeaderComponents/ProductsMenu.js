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
      <ul className={styles.productsNavList}>
        <li className={styles.productsNavListEl}>
          <Link
            href="/catalog/protein"
            onClick={props.onHide}
            // onClick={clickHandler}
            data-name="protein"
          >
            Протеин
          </Link>
        </li>
        <li className={styles.productsNavListEl}>
          <Link
            onClick={props.onHide}
            href="/catalog/creatine"
            // onClick={clickHandler}
            data-name="creatine"
          >
            Креатин
          </Link>
        </li>
        <li className={styles.productsNavListEl}>
          <Link
            onClick={props.onHide}
            href="/catalog/lipo"
            //  onClick={clickHandler}
            data-name="lipo"
          >
            Жиросжигающие добавки
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ProductsMenu;
