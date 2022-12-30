import { MongoClient } from "mongodb";

import { hash } from "bcryptjs";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

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
    console.log(req.query);
    console.log(session.user.name);

    if (!session) {
      res.status(401).json({ message: "Не авторизованные запрос" });
      return;
    }

    if (session.user.email !== req.query.user) {
      res.status(401).json({ message: "Невозможно получить пользователя" });
      return;
    }

    const user = await db
      .collection("sportNutritionAccounts")
      .findOne({ email: req.query.user });

    res.status(200).json({ favouritesItems: user.favouritesItems });
    return;
  }
  if (req.method === "PATCH") {
    console.log(req.body);

    const data = await db
      .collection("sportNutritionAccounts")
      .findOneAndUpdate(
        { email: req.query.user },
        { $set: { favouritesItems: req.body.favouriteId } }
      );

    res.status(200).json({ message: "Success" });
    return;
  }
  client.close();
}

export default handler;
