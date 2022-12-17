import { useState } from "react";
import LoginButton from "./LoginButton";
import styles from "./LoginForm.module.css";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function LoginForm(props) {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");

  const { data: session } = useSession();
  console.log(session);

  const router = useRouter();

  const changePasswordHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const changeEmailHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log("Login");
    console.log(enteredEmail, enteredPassword);

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    if (!result.error) {
      router.replace("/");
    }

    // setEnteredLogin("");
    // setEnteredPassword("");
  };
  return (
    <div className={styles.loginContainer}>
      <h2>Авторизация</h2>

      <div className={styles.loginForm}>
        <div className={styles.loginFormElement}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={enteredEmail}
            onChange={changeEmailHandler}
            required
            placeholder="Введите Email"
          />
        </div>
        <div className={styles.loginFormElement}>
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            value={enteredPassword}
            onChange={changePasswordHandler}
            required
            placeholder="Введите пароль"
          />
        </div>
      </div>
      <LoginButton
        onLogin={loginHandler}
        onShowReg={props.onShowReg}
      ></LoginButton>
    </div>
  );
}
export default LoginForm;
