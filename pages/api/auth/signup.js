import { MongoClient } from "mongodb";

import { hash } from "bcryptjs";

async function handler(req, res) {
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

  if (req.method !== "POST") {
    return;
  }
  if (req.method === "POST") {
    console.log(req.body);
    if (
      req.body.login.length < 5 ||
      req.body.password.length < 5 ||
      req.body.email.length < 5
    ) {
      res
        .status(422)
        .json({ message: "Длинна логина/пароля должна быть более 5 символов" });
      return;
    }

    const existUser = await db
      .collection("sportNutritionAccounts")
      .findOne({ email: req.body.email });
    console.log(existUser);
    if (existUser) {
      res.status(400).json({ message: "Такой пользователь существует" });
      return;
    }

    const hashedPassword = await hash(req.body.password, 12);

    const addedAccount = await db
      .collection("sportNutritionAccounts")
      .insertOne({
        login: req.body.login,
        password: hashedPassword,
        email: req.body.email,
        favouritesItems: [],
      });

    res.status(200).json({ message: "Success", account: addedAccount });
  }
  client.close();
}

export default handler;
