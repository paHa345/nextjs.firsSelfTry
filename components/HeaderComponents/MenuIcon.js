import styles from "./MenuIcon.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function MenuIcon(props) {
  return (
    <div className={styles.menuIcons}>
      <Link href="/" className={styles.headerNavLink}>
        <FontAwesomeIcon icon={faBars} size="2x" />
      </Link>
      <a href="/login.html" className={styles.headerNavLink}>
        <FontAwesomeIcon icon={faCartShopping} size="2x" />
      </a>
      <a href="/card.html" className={styles.headerNavLink}>
        <FontAwesomeIcon icon={faUser} size="2x" />
      </a>
    </div>
  );
}

export default MenuIcon;
