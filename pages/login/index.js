import { useEffect } from "react";
import { useDispatch } from "react-redux";
import LoginSection from "../../components/LoginSection/LoginSection";
import { cartActions } from "../../store/cartSlice";

function Login() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartActions.setCartItemsAmount(localStorage.getItem("cartItems")));
  });

  return <LoginSection></LoginSection>;
}

export default Login;
