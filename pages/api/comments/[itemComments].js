import { MongoClient } from "mongodb";

async function handler(req, res) {
  const itemId = req.query.itemComments;

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
    console.log(req.body);
    if (req.body.text.length < 1) {
      res.status(422).json({
        message:
          "Не удалось добавить комментарии: текст комментария не должен быть пустым",
      });
      return;
    }
    console.log(itemId);
    try {
      const comment = await db
        .collection("sportNutritionComments")
        .insertOne({ ...req.body, item: itemId });

      res.status(200).json({ message: "success", result: comment });
    } catch (error) {
      res.status(500).json({ message: "Не удалось добавить комментарии" });
    }
  }
  client.close();
}

export default handler;
