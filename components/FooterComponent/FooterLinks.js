import styles from "./FooterLinks.module.css";

function FooterLinks() {
  return (
    <div>
      <div className={styles.footerSection}>
        <p className={styles.footerMainText}></p>
        <ul className={styles.footerText}>
          <li>
            <a href="/">Создать аккаунт</a>
          </li>
          <li>
            <a href="/">Войти</a>
          </li>
          <li>
            <a href="/">Корзина</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FooterLinks;
