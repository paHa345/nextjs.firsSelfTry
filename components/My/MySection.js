import Link from "next/link";
import styles from "./MySection.module.css";

function MySection(props) {
  const logoutHandler = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.myContainer}>
          <h1 className={styles.name}>Здравствуйте, {props.name}</h1>
          <h1 className={styles.orderTitle}>Мои заказы</h1>
        </div>

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
