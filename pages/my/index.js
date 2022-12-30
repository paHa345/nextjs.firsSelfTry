import { getSession, useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MySection from "../../components/My/MySection";
import LoadSpinner from "../../components/UI/LoadSpinner";
import { appStateActions } from "../../store/appStateSlice";
import { cartActions } from "../../store/cartSlice";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import Cookies from "js-cookie";
import { compare, hash } from "bcryptjs";

function My(props) {
  const [name, setLogin] = useState("");
  const { data: session } = useSession();
  const dispatch = useDispatch();

  // const addTokenHandler = async (e) => {
  //   e.preventDefault();

  //   const token = await hash("paHa345", 12);
  //   Cookies.set("paymentToken", token, {
  //     expires: 1 / 24,
  //   });
  // };

  // const removeTokenHandler = (e) => {
  //   e.preventDefault();
  //   Cookies.remove("paymentToken");
  // };

  useEffect(() => {
    const storage = localStorage.getItem("cartItems");
    dispatch(cartActions.setCartFromLocalStorage(storage));
    dispatch(appStateActions.setCurrentType("Особое предложение"));
    dispatch(cartActions.setCartItemsAmount(localStorage.getItem("cartItems")));
    if (session) {
      setLogin(session.user.name);
    }
  }, [session, dispatch]);

  useEffect(() => {
    async function fetchOrders() {
      dispatch(cartActions.setOrders({ status: "Загрузка" }));
      // alert("Загрузка");
      const req = await fetch(`/api/orders/${session.user.email}`);
      const res = await req.json();
      return res;
    }
    fetchOrders().then((data) => {
      dispatch(cartActions.setOrders(data.result));
    });
  }, [session.user.email, dispatch]);

  if (!session) {
    return <LoadSpinner></LoadSpinner>;
  }

  return (
    <Fragment>
      {/* <button onClick={addTokenHandler}>Add Token</button>
      <button onClick={removeTokenHandler}>Remove Token</button> */}
      <MySection name={name}></MySection>
    </Fragment>
  );
}

export default My;

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session !== null) {
    session.user.image = "image";
  }

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session: session } };
}
