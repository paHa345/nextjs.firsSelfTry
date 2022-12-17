import { useEffect } from "react";
import CartSection from "../../components/CartSection/CartSection";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
function Cart(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    const storage = localStorage.getItem("cartItems");
    dispatch(cartActions.setCartFromLocalStorage(storage));
    dispatch(cartActions.setCartItemsAmount(localStorage.getItem("cartItems")));
  });
  // return <h1>444</h1>;
  return <CartSection></CartSection>;
}

export async function getServerSideProps(context) {
  return {
    props: {
      username: "paha",
    },
  };
}

export default Cart;
