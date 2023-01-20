import { MongoClient } from "mongodb";

async function handler(req, res) {
  console.log(req.query.serchItems);

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
      //   console.log(/^req.query.serchItems/i);
      const searchQuery = req.query.serchItems;

      var re = new RegExp(searchQuery, "i");
      console.log(re);

      const re33 = new RegExp(`^${searchQuery}`, "i");
      console.log(re33);

      const searchItems = await db
        .collection("sportNutritionItems")
        .find({ name: { $regex: re } })
        .toArray();
      console.log(searchItems);

      if (searchItems.length === 0) {
        res
          .status(200)
          .json({ message: "Success", searchItems: { status: "Not found" } });
        return;
      } else {
        res.status(200).json({ message: "Success", searchItems: searchItems });
        return;
      }
    } catch (error) {
      res.status(400).json({ message: "Не удалось получить список продуктов" });
    }
  }
  client.close();
}

export default handler;
