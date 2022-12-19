import { MongoClient } from "mongodb";

async function handler(req, res) {
  const type = req.query.typeItems;

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
      const result = await db
        .collection("sportNutritionItems")
        .find({ promo: true })
        .toArray();

      res.status(200).json({ message: "success", result: result });
    } catch (error) {
      res.status(500).json({ message: "Не удалось получить данные с сервера" });
    }
  }
  client.close();
}

export default handler;
