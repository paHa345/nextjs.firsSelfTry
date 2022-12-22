import _ from "lodash";
import { MongoClient } from "mongodb";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  console.log(req.query.userOrders);
  console.log(session);

  let client;
  let db;
  try {
    client = await MongoClient.connect(
      `mongodb://${process.env.mongodb_username}:${process.env.mongodb_password}@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/${process.env.mongodb_database}?replicaSet=rs0`
    );
    db = client.db();
  } catch (error) {
    res.status(500).json({
      message: "Не удалось подключиться к базе данных",
    });
    return;
  }

  if (req.method === "GET") {
    if (session?.user.email !== req?.query?.userOrders) {
      res.status(401).json({ message: "Не авторизованный пользователь" });
      return;
    }

    try {
      const orders = await db
        .collection("sportNutritionOrders")
        .find({ email: session.user.email })
        .toArray();
      console.log(orders);

      res.status(200).json({ message: "success", result: orders });
      return;
    } catch (error) {
      res.status(500).json({ message: "Не удалось получить заказ" });
      return;
    }
  }

  if (req.method === "POST") {
    if (session.user.email !== req.body.email) {
      res.status(401).json({ message: "Не авторизованный пользователь" });
      return;
    }

    if (req.body.length === 0) {
      res
        .status(401)
        .json({ message: "Корзина пуста. Добавьте товары в корзину" });
      return;
    }

    const ids = req.body.order.map((el) => el.item.id);

    const items = await db
      .collection("sportNutritionItems")
      .find({ id: { $in: ids } })
      .toArray();

    const deep = _.cloneDeep(req.body);
    const deepCheck = deep.order.map((el, index) => {
      el.item.price = items[index].price;
      return el;
    });

    const totalCost = [...deepCheck].reduce((acc, el) => {
      return acc + el.item.price * el.quantity;
    }, 0);

    try {
      const order = await db.collection("sportNutritionOrders").insertOne({
        items: [...deepCheck],
        email: req.body.email,
        totalCost: totalCost,
        date: new Date(),
        paymentStatus: req.body.paymentStatus,
      });

      res.status(200).json({ message: "success", result: order });
      return;
    } catch (error) {
      res.status(500).json({ message: "Не удалось добавить заказ" });
      return;
    }
  }

  client.close();
}

export default handler;
