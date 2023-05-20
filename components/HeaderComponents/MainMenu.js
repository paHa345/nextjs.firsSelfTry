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

function MainMenu(props) {
  const { data: session } = useSession();
  const quantity = useSelector((state) => state.cart.cartItemsQuantity);

  return (
    <ul className={styles.headerNavList}>
      <li className={styles.allProducts}>
        <Link onClick={props.onShow} href="/" className={styles.headerNavLink}>
          {/* <FontAwesomeIcon
            className={`${styles.menuText} ${styles.menuIcons}`}
            icon={faBars}
            size="1x"
          /> */}
          <div className={styles.catalog}>Каталог</div>
        </Link>
      </li>
      <li>
        <Link
          href="/cart"
          className={`${styles.headerNavLink} ${styles.cartMenuElement}`}
        >
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
          <Link href="/login" className={styles.headerNavLink}>
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
          <Link href="/my" className={styles.headerNavLink}>
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
