import { useState } from "react";
import RecoverPasswordButton from "./RecoverPasswordButton";
import styles from "./RecoverPasswordForm.module.css";

function RecoverPasswordForm(props) {
  const [recoverPassword, setRecoverPassword] = useState("");

  const changePasswordHandler = (e) => {
    setRecoverPassword(e.target.value);
  };

  const resetPasshordHandler = async (e) => {
    e.preventDefault();
    if (recoverPassword.length < 5) {
      alert("Длинна пароля должна быть более 5 символов");
      return;
    }
    const req = await fetch(`/api/reset-password/${props.recoverToken}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword: recoverPassword }),
    });

    const data = await req.json();
    if (!req.ok) {
      console.log("Error");
      console.log(data);

      return;
    }
    console.log(data);
  };
  return (
    <div className={styles.loginContainer}>
      <h2>Восстановление пароля</h2>

      <form className={styles.form}>
        <div className={styles.loginForm}>
          <div className={styles.loginFormElement}>
            <label htmlFor="email">Введите новый пароль</label>
            <input
              id="email"
              value={recoverPassword}
              onChange={changePasswordHandler}
              required
              placeholder="Введите пароль"
            />
          </div>
        </div>
      </form>
      <RecoverPasswordButton
        onResetPass={resetPasshordHandler}
      ></RecoverPasswordButton>
    </div>
  );
}

export default RecoverPasswordForm;
