import { MongoClient, ObjectId } from "mongodb";
import { unstable_getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req, res) {
  const itemId = req.query.itemComments;
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
    try {
      const comments = await db
        .collection("sportNutritionComments")
        .find({ item: itemId })
        .toArray();

      res.status(200).json({ message: "success", result: comments });
    } catch (error) {
      res.status(500).json({ message: "Не удалось получить комментарии" });
    }
  }
  if (req.method === "POST") {
    if (!session) {
      res.status(401).json({ message: "Не авторизованные запрос" });
      return;
    }
    if (req.body.text.length < 1) {
      res.status(422).json({
        message:
          "Не удалось добавить комментарии: текст комментария не должен быть пустым",
      });
      return;
    }
    try {
      const comment = await db
        .collection("sportNutritionComments")
        .insertOne({ ...req.body, item: itemId });

      res.status(200).json({ message: "success", result: comment });
      return;
    } catch (error) {
      res.status(500).json({ message: "Не удалось добавить комментарии" });
      return;
    }
  }
  if (req.method === "DELETE") {
    if (!session) {
      res.status(401).json({ message: "Не авторизованные запрос" });
      return;
    }
    const o_id = new ObjectId(itemId);

    const deletedDocument = await db
      .collection("sportNutritionComments")
      .deleteOne({ _id: o_id });

    res.status(200).json({ message: "Delete success" });
  }
  client.close();
}

export default handler;
