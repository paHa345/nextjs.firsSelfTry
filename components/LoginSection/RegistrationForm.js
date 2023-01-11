import { useState } from "react";
import RegistrationButton from "./RegistrationButton";
import styles from "./RegistrationForm.module.css";

function RegistrationForm(props) {
  const [enteredLogin, setEnteredLogin] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");

  const changeLoginHandler = (e) => {
    setEnteredLogin(e.target.value);
  };

  const changePasswordHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const changeEmailHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const authHandler = async (e) => {
    e.preventDefault();

    const user = {
      login: enteredLogin,
      password: enteredPassword,
      email: enteredEmail,
    };

    async function fetchData() {
      const req = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user),
      });
      const res = await req.json();
      console.log(res);

      if (!req.ok) {
        throw new Error(res.message);
      }
    }

    await fetchData().catch((e) => alert(e.message));

    setEnteredLogin("");
    setEnteredPassword("");
    setEnteredEmail("");
  };

  return (
    <div className={styles.registrationContainer}>
      <h2>Регистрация</h2>
      <form className={styles.form} onSubmit={authHandler}>
        <div className={styles.loginForm}>
          <div className={styles.loginFormElement}>
            <label htmlFor="login">Логин</label>
            <input
              id="login"
              value={enteredLogin}
              onChange={changeLoginHandler}
              required
              placeholder="Введите логин"
            />
          </div>
          <div className={styles.loginFormElement}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={enteredEmail}
              onChange={changeEmailHandler}
              required
              placeholder="Введите email"
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
        <RegistrationButton
          onAuth={authHandler}
          onShowLogin={props.onShowLogin}
        ></RegistrationButton>
      </form>
    </div>
  );
}

export default RegistrationForm;
