import { useState } from "react";
import LoginButton from "./LoginButton";
import styles from "./LoginForm.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

function LoginForm(props) {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");

  const router = useRouter();

  const changePasswordHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const changeEmailHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });
    if (result.error) {
      alert(result.error);
    }

    if (!result.error) {
      router.replace("/my");
    }
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.nameContainer}>
        <div className={styles.backgroundNameContainer}>
          <div className={styles.backgroundName}>Авторизация</div>
        </div>
        <h2 className={styles.bestProductH2}>Авторизация</h2>
      </div>
      <form className={styles.form} onSubmit={loginHandler}>
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
      </form>
    </div>
  );
}
export default LoginForm;
