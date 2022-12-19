import { MongoClient } from "mongodb";

async function handler(req, res) {
  const id = req.query.item;

  const client = await MongoClient.connect(
    `mongodb://${process.env.mongodb_username}:${process.env.mongodb_password}@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/${process.env.mongodb_database}?replicaSet=rs0`
  );

  if (req.method === "GET") {
    console.log(id);
    const db = client.db();

    const result = await db
      .collection("sportNutritionItems")
      .findOne({ id: id });

    res.status(200).json({ message: "success", item: result });
    client.close();
  }
}

export default handler;
