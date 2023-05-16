import styles from "./MainMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faCartShopping,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

function MainMenu(props) {
  const { data: session } = useSession();
  // let storage;
  // if (typeof window !== "undefined") {
  //   storage = localStorage.getItem("cartItems");
  // }
  // const cartItems = useSelector((state) => state.cart.cartItems);

  // let totalQuantity;
  // if (storage) {
  //   totalQuantity = cartItems.reduce((acc, el) => {
  //     return el.quantity + acc;
  //   }, 0);
  // } else {
  //   totalQuantity = 0;
  // }
  // console.log(totalQuantity);
  const quantity = useSelector((state) => state.cart.cartItemsQuantity);

  return (
    <ul className={styles.headerNavList}>
      <li className={styles.allProducts}>
        <Link onClick={props.onShow} href="/" className={styles.headerNavLink}>
          {/* <span className={styles.menuText}>Все товары</span> */}
          <FontAwesomeIcon
            className={`${styles.menuText} ${styles.menuIcons}`}
            icon={faBars}
            size="1x"
          />
        </Link>
      </li>
      <li>
        <Link
          href="/cart"
          // onClick={props.onShowCart}
          className={`${styles.headerNavLink} ${styles.cartMenuElement}`}
        >
          {/* <span className={styles.menuText}>Корзина</span> */}

          <FontAwesomeIcon
            className={styles.menuIcons}
            icon={faCartShopping}
            size="1x"
          />
          <span className={styles.cartElementQuantity}>{quantity}</span>
        </Link>
      </li>
      {!session && (
        <li>
          <Link
            href="/login"
            // onClick={props.onShowLogin}
            className={styles.headerNavLink}
          >
            {/* <span className={styles.menuText}>Войти</span> */}
            <FontAwesomeIcon
              className={styles.menuIcons}
              icon={faUser}
              size="1x"
            />
          </Link>
        </li>
      )}
      {session && (
        <li>
          <Link
            href="/my"
            // onClick={props.onShowLogin}
            className={styles.headerNavLink}
          >
            {/* <span className={styles.menuText}>Кабинет</span> */}
            <FontAwesomeIcon
              className={styles.menuIcons}
              icon={faIdCard}
              size="1x"
            />
          </Link>
        </li>
      )}
    </ul>
  );
}

export default MainMenu;
