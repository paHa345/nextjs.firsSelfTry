import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appStateActions } from "../../store/appStateSlice";
import FetchNotification from "../UI/FetchNotification";
import ForgetPassButton from "./ForgetPassButton";
import styles from "./ForgetPassForm.module.css";

function ForgetPassForm(props) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [notificationText, setNotificationText] = useState("");
  const fetchStatus = useSelector(
    (state) => state.appState.fetchDataNotification
  );
  const fetchStatusText = useSelector((state) => state.appState.fetchText);

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        appStateActions.setFetchNotificationStatus({
          status: false,
          text: "",
        })
      );
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [fetchStatus, dispatch]);

  const changeEmailHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const resetPasshordHandler = async (e) => {
    e.preventDefault();
    console.log(enteredEmail);
    dispatch(
      appStateActions.setFetchNotificationStatus({
        status: "inAction",
        text: "Отправлен запрос на смену пароля",
      })
    );

    const req = await fetch("/api/forget-password/reset-password", {
      method: "PATCH",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: enteredEmail }),
    });

    const data = await req.json();

    if (!req.ok) {
      console.log("Error");
      console.log(data);
      dispatch(
        appStateActions.setFetchNotificationStatus({
          status: "Error",
          text: data.message,
        })
      );

      return;
    }
    console.log(data);
    dispatch(
      appStateActions.setFetchNotificationStatus({
        status: "Success",
        text: `Письмо с дальнейшими указаниями по смене пароля направлено на почту ${enteredEmail}`,
      })
    );
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

      <form className={styles.form}>
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
        </div>
      </form>

      <ForgetPassButton onResetPass={resetPasshordHandler}></ForgetPassButton>
    </div>
  );
}

export default ForgetPassForm;
