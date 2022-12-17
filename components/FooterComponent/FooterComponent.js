import FooterAddress from "./FooterAddress";
import styles from "./FooterComponent.module.css";
import FooterLinks from "./FooterLinks";
import FooterLogo from "./FooterLogo";

function FooterComponent() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGridContainer}>
          <FooterLogo></FooterLogo>
          <FooterAddress></FooterAddress>
          <FooterLinks></FooterLinks>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
