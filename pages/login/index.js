import { useEffect } from "react";
import { useDispatch } from "react-redux";
import LoginSection from "../../components/LoginSection/LoginSection";
import { cartActions } from "../../store/cartSlice";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

function Login() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartActions.setCartItemsAmount(localStorage.getItem("cartItems")));
  });

  return <LoginSection></LoginSection>;
}

export default Login;

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}
