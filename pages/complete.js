import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadSpinner from "../components/UI/LoadSpinner";
import { cartActions } from "../store/cartSlice";

function Complete(props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const secret = useSelector((state) => state.order.clientSecret);
  const order = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cartItems")) === null) {
      alert("Добавьте продукты в корзину");
      return;
    }
    const data = JSON.parse(localStorage.getItem("cartItems")).map((el) => {
      return {
        item: {
          id: el.item.id,
          price: el.item.price,
          image: el.item.image,
          name: el.item.name,
        },
        quantity: el.quantity,
      };
    });
    if (data.length === 0) {
      alert("Добавьте продукты в корзину");
      return;
    }

    // if (!session) {
    //   alert("Необходимо залогиниться");
    //   return;
    // }

    // && router.query.payment_intent === secret
    if (router.query.payment_intent && session) {
      console.log("fetch");

      async function fetchOrder() {
        const req = await fetch(`/api/orders/${router.query.payment_intent}`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            order: data,
            email: session.user.email,
            totalCost: 10000,
            paymentStatus: false,
          }),
        });
        const res = await req.json();
        console.log(res);
      }

      fetchOrder().then((data) => {
        localStorage.removeItem("cartItems");

        dispatch(cartActions.clearCart());
        router.push("/my");
      });
    }
  }, [session, router, dispatch]);
  return (
    <Fragment>
      <LoadSpinner></LoadSpinner>
    </Fragment>
  );
}

export default Complete;
