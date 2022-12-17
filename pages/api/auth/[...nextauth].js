import { compare } from "bcryptjs";
import { MongoClient } from "mongodb";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        let client = await MongoClient.connect(
          "mongodb://uerqlzlole9xj0pi0wbk:TfXXkUycEhfDe2lkcePT@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bnjpnqkq0agsple?replicaSet=rs0"
        );
        const db = client.db();
        const user = await db
          .collection("sportNutritionAccounts")
          .findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Такого пользователя не найдено");
        }
        const validPassword = await compare(
          credentials.password,
          user.password
        );
        if (!validPassword) {
          throw new Error("Неверный пароль");
        }

        client.close();
        return { email: user.email, name: user.login };
      },
    }),
  ],
});
