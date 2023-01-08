import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import { hash } from "bcryptjs";

async function handler(req, res) {
  if (req.method === "PATCH") {
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

    let tokenIsTrue;
    try {
      tokenIsTrue = jwt.verify(req.query.resetToken, process.env.SECRET);
    } catch (error) {}

    const user = await db.collection("sportNutritionAccounts").findOne({
      email: tokenIsTrue.email,
    });

    console.log(req.query.resetToken === user.password);

    if (
      req.query.resetToken !== user.password ||
      req.body.newPassword.length < 5
    ) {
      res.status(403).json({
        message: "Не удалось изменить пароль",
      });
      client.close();
      return;
    }

    if (req.query.resetToken === user.password) {
      const hashedPassword = await hash(req.body.newPassword, 12);

      try {
        const userWithNewPassword = await db
          .collection("sportNutritionAccounts")
          .findOneAndUpdate(
            {
              email: tokenIsTrue.email,
            },
            { $set: { password: hashedPassword } }
          );
      } catch (error) {
        res.status(403).json({
          message: "Не удалось изменить пароль",
        });
        client.close();
        return;
      }
    }

    res.status(200).json({ message: "Удачно" });
  }
}

export default handler;
