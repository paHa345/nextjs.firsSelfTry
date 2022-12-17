import { Fragment, useEffect, useState } from "react";
import styles from "./HeaderComponent.module.css";

import MenuContainer from "./MenuContainer";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import Link from "next/link";
import Image from "next/image";

function HeaderComponent() {
  // const storage = localStorage.getItem("cartItems");
  const dispatch = useDispatch();

  const appState = useSelector((state) => state.appState);

  // useEffect(() => {
  //   if (storage === null) {
  //   } else {
  //     dispatch(cartActions.setCartFromLocalStorage());
  //   }
  // }, []);

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

  const hideCartHandler = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const showLoginHandler = (e) => {
    e.preventDefault();
    setShowLogin(true);
    setShowCart(false);
  };

  const HideLoginHandler = (e) => {
    e.preventDefault();
    setShowLogin(false);
    setShowCart(false);
  };

  let sticky = scrolled ? "sticky" : "";

  return (
    <Fragment>
      <header className={`${styles.header} ${sticky}`}>
        <div className={styles.prodC}>
          <Link href="/" className={styles.headerLogo}>
            <Image
              // className={styles.headerImg}
              // layout="fill"
              priority
              height={80}
              width={160}
              // objectFit="cover"
              src="/img/logo.png"
              alt="logo"
            />
          </Link>
          <MenuContainer
            onShowCart={showCartHandler}
            onShowLogin={showLoginHandler}
          ></MenuContainer>
        </div>
      </header>
      {/* {appState.showProducts && <ProductsSection></ProductsSection>}
      {showCart && <CartSection onHideCart={hideCartHandler}></CartSection>}
      {showLogin && (
        <LoginSection onHideLogin={HideLoginHandler}></LoginSection>
      )}
      {appState.showItem && <Item></Item>} */}
    </Fragment>
  );
}

export default HeaderComponent;
