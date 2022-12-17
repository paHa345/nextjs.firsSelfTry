import styles from "./FooterLogo.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

function FooterLogo() {
  return (
    <div className={styles.footerSocial}>
      <Image
        className={styles.footerLogo}
        src="/img/logo.png"
        alt="imageFooterLogo"
        width={100}
        height={50}
      />
      <div className={styles.socialIcons}>
        <Link href="/">
          <FontAwesomeIcon icon={faUser} size="4x" />
        </Link>
        <Link href="/">
          <FontAwesomeIcon icon={faThumbsUp} size="4x" />
        </Link>
      </div>
      <p className={styles.copyright}>
        Copyright © 2022 by paHa. All right reserved.
      </p>
    </div>
  );
}

export default FooterLogo;
