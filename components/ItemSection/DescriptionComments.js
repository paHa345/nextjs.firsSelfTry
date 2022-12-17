import Link from "next/link";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { itemsActions } from "../../store/itemSlice";

import Comments from "./Comments";
import Description from "./Description";
import styles from "./DescriptionComments.module.css";

function DescriptionComments(props) {
  const dispatch = useDispatch();
  const [showDescriptionComments, setShowDescriptionComments] =
    useState("description");

  const showHandler = async (e) => {
    e.preventDefault();

    setShowDescriptionComments(e.target.getAttribute("data-show"));
    if (e.target.getAttribute("data-show") === "comments") {
      const fetchComments = async function (e) {
        dispatch(itemsActions.setCurrentComments([]));

        const req = await fetch(`/api/comments/${props.currentItem.id}`);
        const comments = await req.json();
        if (comments.result.length === 0) {
          dispatch(itemsActions.setCurrentComments(null));
        } else {
          dispatch(itemsActions.setCurrentComments(comments.result));
        }
      };
      const comments = await fetchComments();
    }
  };
  return (
    <Fragment>
      <div className={styles.descriptionComments}>
        <div className={styles.descriptionCommentsLinksSection}>
          <div className={styles.descriptionLinkSection}>
            <Link
              onClick={showHandler}
              className={styles.descriptionLink}
              data-show="description"
              href="/"
            >
              Описание
            </Link>
          </div>
          <div className={styles.commentsLinkSection}>
            <Link
              onClick={showHandler}
              className={styles.commentsLink}
              data-show="comments"
              href="/"
            >
              Комментарии
            </Link>
          </div>
        </div>
      </div>

      {showDescriptionComments === "description" ? (
        <Description description={props.currentItem.description}></Description>
      ) : null}

      {showDescriptionComments === "comments" ? <Comments></Comments> : null}
    </Fragment>
  );
}

export default DescriptionComments;
