import { getSession, useSession } from "next-auth/react";
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

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return { props: { session } };
}
