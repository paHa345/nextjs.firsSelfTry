import { useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appStateActions } from "../../store/appStateSlice";
import { itemsActions } from "../../store/itemSlice";
import FetchNotification from "../UI/FetchNotification";

import styles from "./addCommentForm.module.css";

function AddCommentForm(props) {
  const [login, setLogin] = useState("anonimous");
  const [email, setEmail] = useState("anonimous");
  const dispatch = useDispatch();
  const session = useSession();
  const dataNotification = useSelector(
    (state) => state.appState.fetchDataNotification
  );
  const textNotification = useSelector((state) => state.appState.fetchText);

  const canAdd = useSelector((state) => state.appState.canAddComment);

  useEffect(() => {
    if (session.data !== null) {
      setEmail(session.data.user.email);
    }
  }, [session.data]);

  useEffect(() => {
    if (session.data) {
      setLogin(session.data.user.name);
    }
  }, [session.data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        appStateActions.setFetchNotificationStatus({
          status: false,
          text: "",
        })
      );
    }, 4000);
  }, [dataNotification, dispatch]);

  const currentItem = useSelector((state) => state.item.item);

  const [enteredText, setEnteredText] = useState("");

  const changeLoginHandler = (e) => {
    setEnteredText(e.target.value);
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    if (!canAdd) {
      // alert("Невозможно добавить комментарий. Товара нет в списке купленных");
      dispatch(
        appStateActions.setFetchNotificationStatus({
          status: "Error",
          text: "Невозможно добавить комментарий. Товара нет в списке купленных",
        })
      );
      return;
    }

    const comment = {
      text: enteredText,
      date: new Date().toISOString(),
      name: login,
      email: email,
    };
    const fetchdata = async (e) => {
      try {
        const req = await fetch(`/api/comments/${currentItem.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(comment),
        });

        const res = await req.json();
        if (!req.ok) {
          console.log(res.message);
          throw new Error(res.message);
        }
      } catch (error) {
        console.log(error);
        // alert(error.message);
        dispatch(
          appStateActions.setFetchNotificationStatus({
            status: "Error",
            text: error.message,
          })
        );
      }

      async function fetchComments() {
        const req = await fetch(`/api/comments/${currentItem.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });
        const res = await req.json();
        dispatch(itemsActions.setCurrentComments(res.result));
      }
      await fetchComments();
    };
    await fetchdata().catch((e) => {
      console.log(e.message);
    });
    setEnteredText("");
  };
  return (
    <Fragment>
      {!session.data && <h1>Зарегистрируйтесь для добавления комментариев</h1>}
      <div className={styles.notificationContainer}>
        {dataNotification && (
          <FetchNotification text={textNotification}></FetchNotification>
        )}
      </div>
      {session.data && (
        <div className={styles.loginContainer}>
          <div className={styles.loginForm}>
            <div className={styles.loginFormElement}>
              <label htmlFor="login">Ваш комментарий</label>
              <textarea
                id="login"
                cols="40"
                rows="5"
                value={enteredText}
                onChange={changeLoginHandler}
                required
                placeholder="Введите текст"
              />
            </div>
          </div>

          <div className={styles.loginButton}>
            <Link href="/" onClick={addCommentHandler}>
              Добавить комментарий
            </Link>
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default AddCommentForm;
