import { Fragment, useState } from "react";
import styles from "./MenuContainer.module.css";
import MainMenu from "./MainMenu";
import ProductsMenu from "./ProductsMenu";

function MenuContainer(props) {
  const [showProductsMenu, setShowProductsMenu] = useState(false);

  const showProductsMenuHandler = (e) => {
    e.preventDefault();

    setShowProductsMenu((prevState) => !prevState);
  };

  const hideProductsHandler = (e) => {
    setShowProductsMenu(false);
  };

  const mouseLeaveHandler = () => {
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
