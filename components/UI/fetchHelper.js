import { useDispatch } from "react-redux";
import { itemsActions } from "../../store/itemSlice";

export const addToFavourites = async (
  userEmail,
  id,
  favouriteItemsIDs,
  type
) => {
  const arr = [...favouriteItemsIDs];
  if (type === "add") {
    arr.push(id);
  }

  if (type === "remove") {
    arr.splice(arr.indexOf(id), 1);
    console.log(arr);
  }

  const req = await fetch(`/api/users/${userEmail}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      favouriteId: arr,
    }),
  });
  const res = await req.json();
};

const getUserFavouritesIDs = async (userName) => {
  const req = await fetch(`/api/users/${userName}`);

  const res = await req.json();
  if (!req.ok) {
    throw new Error("Не удалось подключиться");
  }

  return res.favouritesItems;
};

const getUserFavouritesItems = async (IDs) => {
  const req = await fetch(`/api/items/${IDs}`);

  const res = await req.json();
  if (!req.ok) {
    throw new Error("Не удалось подключиться");
  }
  return res.items;
};

export const getFavourites = async (email) => {
  try {
    const favIDs = await getUserFavouritesIDs(email);
    if (favIDs.length === 0) {
      return [];
    }

    const sortedId = favIDs.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
    });

    const favItems = await getUserFavouritesItems(sortedId);

    return favItems;
  } catch (error) {
    throw new Error(
      "Что-то пошло не так. Не удалось получить список избранного"
    );
  }
};

const getCommentsItem = async (id) => {
  const req = await fetch(`/api/comments/${id}`);
  const res = await req.json();
  if (!req.ok) {
    throw new Error(res.message);
  }

  return res;
};

const addCommentToDB = async (id, comment) => {
  const req = await fetch(`/api/comments/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(comment),
  });

  const res = await req.json();
  if (!req.ok) {
    throw new Error(res.message);
  }
  return res;
};

export const addComment = async (id, email, comment) => {
  try {
    const commentsItem = await getCommentsItem(id);
    const currentUserComment = commentsItem.result.filter((el) => {
      return el.email === email;
    });
    console.log(currentUserComment);
    if (currentUserComment.length === 1) {
      throw new Error("Вы уже добавили отзыв на этот товар");
    }
    const commentAdded = await addCommentToDB(id, comment);
    console.log(commentAdded);
    const updatedComments = await getCommentsItem(id);
    return updatedComments;
  } catch (error) {
    throw new Error(error.message);
  }
};
