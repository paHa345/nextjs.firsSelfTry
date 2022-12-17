import styles from "./FooterAddress.module.css";

function FooterAddress() {
  return (
    <div className={styles.footerSection}>
      <p className={styles.footerMainText}>Адрес</p>
      <ul className={styles.footerText}>
        <li>г.Новосибирск</li>
        <li>ул. Вилюйская дом 13</li>
        <li>9231271059</li>
      </ul>
    </div>
  );
}

export default FooterAddress;
