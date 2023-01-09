import { signOut } from "next-auth/react";
import Link from "next/link";
import ProductCards from "../CardsSection/ProductCards";
import styles from "./MySection.module.css";
import Orders from "./Orders";

function MySection(props) {
  const logoutHandler = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.myContainer}>
          <h1 className={styles.name}>Здравствуйте, {props.name}</h1>
          <div className={styles.loginButton}>
            <Link href="/favourites">Избранное</Link>
          </div>
          <br></br>

          <div className={styles.loginButton}>
            <Link href="/myOrders">Мои заказы</Link>
          </div>
        </div>
        <br></br>

        <div className={styles.loginButton}>
          <Link onClick={logoutHandler} href="/">
            Выйти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default MySection;
