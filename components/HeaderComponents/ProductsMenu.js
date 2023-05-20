import Link from "next/link";

import styles from "./ProductsMenu.module.css";

function ProductsMenu(props) {
  return (
    <div className={styles.productsNav} onMouseLeave={props.onLeave}>
      <div className={styles.productsNavList}>
        <div
          data-name="protein"
          onClick={props.onHide}
          className={styles.productsNavListEl}
        >
          <Link href="/catalog/protein">Протеин</Link>
        </div>
        <div
          data-name="creatine"
          onClick={props.onHide}
          className={styles.productsNavListEl}
        >
          <Link href="/catalog/creatine">Креатин</Link>
        </div>
        <div
          data-name="lipo"
          onClick={props.onHide}
          className={styles.productsNavListEl}
        >
          <Link href="/catalog/lipo">Жиросжигающие добавки</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductsMenu;
