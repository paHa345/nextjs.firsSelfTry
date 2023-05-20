import Link from "next/link";
import styles from "./ButtonTakeOrder.module.css";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { orderActions } from "../../store/orderSlice";
import { useRouter } from "next/router";
import { appStateActions } from "../../store/appStateSlice";

function ButtonTakeOrder() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const takeOrderHandler = async (e) => {
    e.preventDefault();
    if (JSON.parse(localStorage.getItem("cartItems")) === null) {
      dispatch(
        appStateActions.setFetchNotificationStatus({
          status: "Error",
          text: "Добавьте продукты в корзину",
        })
      );
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
      dispatch(
        appStateActions.setFetchNotificationStatus({
          status: "Error",
          text: "Добавьте продукты в корзину",
        })
      );
      return;
    }

    if (!session) {
      dispatch(
        appStateActions.setFetchNotificationStatus({
          status: "Error",
          text: `Необходимо залогиниться`,
        })
      );
      return;
    }

    dispatch(orderActions.addOrder(data));
    router.push("/payment");
  };
  return (
    <div className={styles.cartOrderButton}>
      <Link href="/" onClick={takeOrderHandler}>
        Оформить заказ
      </Link>
    </div>
  );
}

export default ButtonTakeOrder;
