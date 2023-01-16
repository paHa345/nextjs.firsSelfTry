import nodemailer from "nodemailer";
import jwt, { decode } from "jsonwebtoken";
import { MongoClient } from "mongodb";
import { reject } from "lodash";

async function handler(req, res) {
  console.log(req.body);

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

  if (req.method === "PATCH") {
    const user = await db
      .collection("sportNutritionAccounts")
      .findOne({ email: req.body.email });

    if (!user) {
      res.status(403).json({ message: "Пользователя с таким email нет" });
      return;
    }

    const secret = process.env.SECRET;

    const token = jwt.sign(
      { login: user.login, email: req.body.email },
      secret,
      {
        expiresIn: 60 * 60,
      }
    );
    console.log(decode(token));

    const data = await db
      .collection("sportNutritionAccounts")
      .findOneAndUpdate(
        { email: req.body.email },
        { $set: { password: token } }
      );
    if (!data.lastErrorObject.updatedExisting) {
      res.status(500).json({ message: "Не удалось обновить данные" });
      client.close();
      return;
    }

    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.mail.ru",
      auth: {
        user: "pav.345@mail.ru",
        pass: "LJ1YPtKcVshZxGuE9cgB",
      },
      secure: true,
    });

    const mailData = {
      from: "pav.345@mail.ru",
      to: req.body.email,
      subject: `Message From paHa store Admin`,
      text: req.body.message + " | Sent from: " + req.body.email,
      html: `<div>Для восстановления пароля перейдите по ссылке</div>
      <p>https://nextjs-firs-self-try.vercel.app/recover-password/${token}</p>
      <p>Sent from:
        ${req.body.email}</p>`,
    };

    const sendMessage = async (message) => {
      console.log(mailData);

      transporter.sendMail({
        mailData,
        function(err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
          }
        },
      });
    };
    try {
      await sendMessage();
    } catch (error) {
      res.status(500).json({ message: "Не удалось обновить пароль" });
      client.close();
      return;
    }

    // const sendMessage = async(() => {
    //   await transporter.sendMail(mailData, function (err, info) {
    //     if (err) {
    //       console.log(err);

    //     } else {
    //       console.log(info);

    //     }
    //   });
    // });

    res.status(200).json({ message: "Success" });
  }
  client.close();
}

export default handler;
