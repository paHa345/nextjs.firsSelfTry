import { Fragment, useEffect, useState } from "react";
import styles from "./HeaderComponent.module.css";

import MenuContainer from "./MenuContainer";
import Link from "next/link";
import Image from "next/legacy/image";
import SearchComponent from "./SearchComponent";

function HeaderComponent() {
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    const scrollListener = window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const showCartHandler = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const showLoginHandler = (e) => {
    e.preventDefault();
    setShowLogin(true);
    setShowCart(false);
  };

  let sticky = scrolled ? "sticky" : "";

  return (
    <Fragment>
      <header className={`${styles.header} ${sticky}`}>
        <div className={styles.prodC}>
          <Link href="/" className={styles.headerLogo}>
            <Image
              height={100}
              width={100}
              layout="responsive"
              src="/img/protLogo.png"
              alt="logo"
            />
          </Link>
          <SearchComponent></SearchComponent>
          <MenuContainer
            onShowCart={showCartHandler}
            onShowLogin={showLoginHandler}
          ></MenuContainer>
        </div>
      </header>
    </Fragment>
  );
}

export default HeaderComponent;
