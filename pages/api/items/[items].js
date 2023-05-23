import { MongoClient, ObjectId } from "mongodb";
import { unstable_getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req, res) {
  const itemsIds = req.query.items;

  const session = await unstable_getServerSession(req, res, authOptions);
  console.log(`Items ID ${itemsIds.split(",")}`);

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
    try {
      const items = await db
        .collection("sportNutritionItems")
        .find({ id: { $in: itemsIds.split(",") } }, { _id: 0, name: 1 })
        .toArray();

      res.status(200).json({ message: "success", items });
    } catch (error) {
      res.status(500).json({ message: "Не удалось получить элементы" });
    }
  }

  client.close();
}

export default handler;
