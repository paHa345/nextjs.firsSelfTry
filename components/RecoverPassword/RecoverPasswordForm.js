import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appStateActions } from "../../store/appStateSlice";
import FetchNotification from "../UI/FetchNotification";
import RecoverPasswordButton from "./RecoverPasswordButton";
import styles from "./RecoverPasswordForm.module.css";

function RecoverPasswordForm(props) {
  const [recoverPassword, setRecoverPassword] = useState("");

  const fetchStatus = useSelector(
    (state) => state.appState.fetchDataNotification
  );
  const fetchStatusText = useSelector((state) => state.appState.fetchText);

  const dispatch = useDispatch();

  const changePasswordHandler = (e) => {
    setRecoverPassword(e.target.value);
  };

  const resetPasshordHandler = async (e) => {
    e.preventDefault();
    if (recoverPassword.length < 5) {
      dispatch(
        appStateActions.setFetchNotificationStatus({
          status: "Error",
          text: `Длинна пароля должна быть более 5 символов`,
        })
      );
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
      return;
    }
    dispatch(
      appStateActions.setFetchNotificationStatus({
        status: "Success",
        text: `Пароль успешно изменён`,
      })
    );
    setRecoverPassword("");
  };
  return (
    <div className={styles.loginContainer}>
      <h2>Восстановление пароля</h2>

      <div className={styles.notificationContainer}>
        {fetchStatus && (
          <FetchNotification
            status={fetchStatus}
            text={fetchStatusText}
          ></FetchNotification>
        )}
      </div>

      <form className={styles.form} onSubmit={resetPasshordHandler}>
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
