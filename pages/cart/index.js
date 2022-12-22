import { useEffect } from "react";
import CartSection from "../../components/CartSection/CartSection";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
function Cart(props) {
  const dispatch = useDispatch();

  // const storage = localStorage.getItem("cartItems");
  // const storageIds = JSON.parse(storage).map((el) => el.item.id);
  // console.log(storageIds);

  useEffect(() => {
    const storage = localStorage.getItem("cartItems");
    // console.log(JSON.parse(storage)[0]);
    console.log(JSON.parse(storage).length);

    dispatch(cartActions.setCartItemsAmount(localStorage.getItem("cartItems")));
    if (storage && JSON.parse(storage).length !== 0) {
      const storageIds = JSON.parse(storage).map((el) => el.item.id);
      const fetchItems = async (e) => {
        const req = await fetch(`/api/items/${storageIds}`);
        const res = await req.json();
        return res;
      };
      const cartItems = fetchItems()
        .then((data) => {
          console.log(data);

          const newStorage = JSON.parse(storage).map((el, index) => {
            console.log(data.items[index].price);
            el.item.price = data.items[index].price;
            return { ...el };
          });
          console.log(newStorage);
          localStorage.setItem("cartItems", JSON.stringify(newStorage));

          dispatch(
            cartActions.setCartFromLocalStorage(JSON.stringify(newStorage))
          );
        })
        .catch((error) => alert(error));
    }
  });

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
