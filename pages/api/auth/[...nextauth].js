import { compare } from "bcryptjs";
import { MongoClient } from "mongodb";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {
        let client = await MongoClient.connect(
          `mongodb://${process.env.mongodb_username}:${process.env.mongodb_password}@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/${process.env.mongodb_database}?replicaSet=rs0`
        );
        const db = client.db().collection("sportNutritionAccounts");

        if (
          credentials.email.trim().length === 0 ||
          credentials.password.trim().length === 0
        ) {
          throw new Error("Введите логин/пароль");
        }

        const user = await db.findOne({ email: credentials.email });

        if (!user) {
          return null;
        }
        const validPassword = await compare(
          credentials.password,
          user.password
        );
        if (!validPassword) {
          throw new Error("Неверный пароль");
        }

        client.close();
        return { email: user.email, name: user.login, image: user.name };
      },
    }),
  ],
};

export default NextAuth(authOptions);
