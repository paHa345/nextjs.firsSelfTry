import { MongoClient } from "mongodb";
import _ from "lodash";

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent

  // people from directly manipulating the amount on the client
  return 1400;
};

export default async function handler(req, res) {
  // const { items } = req.body;
  console.log(req.body.items);

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

  const ids = req.body.items.orders.map((el) => el.item.id);

  const items = await db
    .collection("sportNutritionItems")
    .find({ id: { $in: ids } })
    .toArray();

  const deep = _.cloneDeep(req.body.items.orders);
  const deepCheck = deep.map((el, index) => {
    el.item.price = items[index].price;
    return el;
  });

  const totalCost = [...deepCheck].reduce((acc, el) => {
    return acc + el.item.price * el.quantity;
  }, 0);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCost * 100,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
