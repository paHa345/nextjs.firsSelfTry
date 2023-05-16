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
          <div className={styles.nameContainer}>
            <div className={styles.backgroundNameContainer}>
              <div className={styles.backgroundName}>Здравствуйте</div>
            </div>
            <h2 className={styles.bestProductH2}>Здравствуйте, {props.name}</h2>
          </div>
          <div className={styles.cabinetButtonContainer}>
            <div className={styles.cabinetButton}>
              <Link href="/favourites">Избранное</Link>
            </div>

            <div className={styles.cabinetButton}>
              <Link href="/myOrders">Мои заказы</Link>
            </div>
            <div className={styles.cabinetButton}>
              <Link onClick={logoutHandler} href="/">
                Выйти
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MySection;
