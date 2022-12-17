import Link from "next/link";
import styles from "./FooterLinks.module.css";

function FooterLinks() {
  return (
    <div>
      <div className={styles.footerSection}>
        <p className={styles.footerMainText}></p>
        <ul className={styles.footerText}>
          <li>
            <Link href="/">Создать аккаунт</Link>
          </li>
          <li>
            <Link href="/">Войти</Link>
          </li>
          <li>
            <Link href="/">Корзина</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FooterLinks;
