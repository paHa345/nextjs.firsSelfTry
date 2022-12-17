import styles from "./Comments.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AddCommentForm from "./AddCommentForm";
import { useSelector } from "react-redux";

function Comments(props) {
  const currentComments = useSelector((state) => state.item.currentComments);

  if (currentComments === null) {
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
