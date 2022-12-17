import { useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MySection from "../../components/My/MySection";
import LoadSpinner from "../../components/UI/LoadSpinner";
import { appStateActions } from "../../store/appStateSlice";
import { cartActions } from "../../store/cartSlice";

function My() {
  const [name, setLogin] = useState("");
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    const storage = localStorage.getItem("cartItems");
    dispatch(cartActions.setCartFromLocalStorage(storage));
    dispatch(appStateActions.setCurrentType("Особое предложение"));
    dispatch(cartActions.setCartItemsAmount(localStorage.getItem("cartItems")));
    if (session) {
      setLogin(session.user.name);
    }
  }, [session, dispatch]);

  if (!session) {
    return <LoadSpinner></LoadSpinner>;
  }

  return (
    <Fragment>
      <MySection name={name}></MySection>
    </Fragment>
  );
}

export default My;
