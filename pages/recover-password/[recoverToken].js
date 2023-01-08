import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";
import Router, { useRouter } from "next/router";
import { Fragment } from "react";
import RecoverPasswordForm from "../../components/RecoverPassword/RecoverPasswordForm";

function Recover() {
  const router = useRouter();
  console.log(router.query.recoverToken);

  return (
    <Fragment>
      <RecoverPasswordForm
        recoverToken={router.query.recoverToken}
      ></RecoverPasswordForm>
    </Fragment>
  );
}

export default Recover;

export async function getServerSideProps(context) {
  const token = jwt.decode(context.params.recoverToken);
  const data = Date.now();
  const secret = "456";

  let tokenIsTrue;
  try {
    tokenIsTrue = jwt.verify(context.params.recoverToken, process.env.SECRET);
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  console.log(`True: ${tokenIsTrue?.email}`);

  if (token?.exp < data / 1000 || !token?.exp) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

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

  return {
    props: {},
  };
}
