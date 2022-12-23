import { Fragment, useState } from "react";
import styles from "./MenuContainer.module.css";
import MainMenu from "./MainMenu";
import ProductsMenu from "./ProductsMenu";
import { useRouter } from "next/router";

function MenuContainer(props) {
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const router = useRouter();

  const showProductsMenuHandler = (e) => {
    e.preventDefault();

    setShowProductsMenu((prevState) => !prevState);
  };

  const hideProductsHandler = (e) => {
    // router.push("/cart");
    setShowProductsMenu(false);
  };

  const mouseLeaveHandler = () => {
    console.log("Leave");
    setShowProductsMenu(false);
  };

  return (
    <Fragment>
      <nav className={styles.headerNav}>
        <MainMenu
          onShowCart={props.onShowCart}
          onShow={showProductsMenuHandler}
          onShowLogin={props.onShowLogin}
        ></MainMenu>
      </nav>

      {showProductsMenu && (
        <ProductsMenu
          onLeave={mouseLeaveHandler}
          onHide={hideProductsHandler}
        ></ProductsMenu>
      )}
    </Fragment>
  );
}

export default MenuContainer;
