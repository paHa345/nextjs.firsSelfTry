import styles from "./Comments.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import AddCommentForm from "./AddCommentForm";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { itemsActions } from "../../store/itemSlice";

function Comments(props) {
  const currentComments = useSelector((state) => state.item.currentComments);
  const currentItem = useSelector((state) => state.item.item);
  const dispatch = useDispatch();

  const { data: session, status } = useSession();
  console.log(session?.user?.email);

  const deleteCommentHandler = async (e) => {
    e.preventDefault();
    const commentId = e.currentTarget.dataset.id;
    const deleteComment = async (e) => {
      const req = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();
      if (!req.ok) {
        throw new Error(req.message);
      }
      console.log(res);

      async function fetchComments() {
        console.log("fetch");

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

    try {
      await deleteComment();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (currentComments === null || currentComments.length === 0) {
    return (
      <div className={styles.itemCommentsElement}>
        <h3>Нет комментариев</h3>
        <AddCommentForm></AddCommentForm>
      </div>
    );
  }
  if (currentComments.length === 0) {
    return <h1>Комментарии загружаются</h1>;
  }

  const comments = currentComments.map((el, index) => {
    return (
      <div key={index} className={styles.comment}>
        <div className={styles.comment}>
          <div className={styles.toast}>
            <div className={styles.toastHeader}>
              <FontAwesomeIcon icon={faUser} size="2x" />

              <strong className="me-auto">{el.name}</strong>
              <small>{el.date}</small>
              {session?.user.email === el.email && (
                <Link href="/" onClick={deleteCommentHandler} data-id={el._id}>
                  <FontAwesomeIcon icon={faCircleXmark} size="1x" />
                </Link>
              )}
            </div>
            <div className={styles.toastBody}>{el.text}</div>
          </div>
        </div>

        {/* <div className={styles.commentMain}>
          <p>{el.date}</p>
          <p>{el.name}</p>
        </div>
        <p>{el.text}</p> */}
      </div>
    );
  });

  return (
    <div className={styles.itemCommentsElement}>
      <h3>Комментарии</h3>
      <div className={styles.comments}>{comments}</div>
      <AddCommentForm></AddCommentForm>
    </div>
  );
}

export default Comments;
