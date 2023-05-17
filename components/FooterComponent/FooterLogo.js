import styles from "./FooterLogo.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Image from "next/legacy/image";
import Link from "next/link";

function FooterLogo() {
  return (
    <div className={styles.footerSocial}>
      <Image
        className={styles.footerLogo}
        src="/img/protLogo.png"
        alt="imageFooterLogo"
        height={200}
        width={200}
        // objectFit="cover"
        layout="responsive"
      />
      {/* <div className={styles.socialIcons}>
        <Link href="/">
          <FontAwesomeIcon icon={faUser} size="2x" />
        </Link>
        <Link href="/">
          <FontAwesomeIcon icon={faThumbsUp} size="2x" />
        </Link>
      </div> */}
      <p className={styles.copyright}>
        Copyright © 2023 by paHa. All right reserved.
      </p>
    </div>
  );
}

export default FooterLogo;
