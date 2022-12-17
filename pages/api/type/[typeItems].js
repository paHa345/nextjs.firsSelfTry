import { MongoClient } from "mongodb";

async function handler(req, res) {
  const type = req.query.typeItems;
  console.log(type);

  let client;
  let db;
  try {
    client = await MongoClient.connect(
      "mongodb://uerqlzlole9xj0pi0wbk:TfXXkUycEhfDe2lkcePT@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bnjpnqkq0agsple?replicaSet=rs0"
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
