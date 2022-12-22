import Link from "next/link";
import styles from "./ButtonTakeOrder.module.css";
import { useSession } from "next-auth/react";

function ButtonTakeOrder() {
  const { data: session, status } = useSession();
  const takeOrderHandler = async (e) => {
    e.preventDefault();
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

    // console.log(session.user.email);

    if (!session) {
      alert("Необходимо залогиниться");
      return;
    }

    const fetchOrder = async (e) => {
      const req = await fetch(`/api/orders/${session.user.email}`, {
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
    };

    await fetchOrder();
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
