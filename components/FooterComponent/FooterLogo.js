import styles from "./FooterLogo.module.css";
import Image from "next/legacy/image";

function FooterLogo() {
  return (
    <div className={styles.footerSocial}>
      <Image
        className={styles.footerLogo}
        src="/img/protLogo.png"
        alt="imageFooterLogo"
        height={200}
        width={200}
        layout="responsive"
      />

      <p className={styles.copyright}>
        Copyright © 2023 by paHa. All right reserved.
      </p>
    </div>
  );
}

export default FooterLogo;
