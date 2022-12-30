import { useDispatch } from "react-redux";
import { itemsActions } from "../../store/itemSlice";

export const addToFavourites = async (
  userEmail,
  id,
  favouriteItemsIDs,
  props,
  favouriteItems
) => {
  console.log(userEmail);
  const arr = [...favouriteItemsIDs];
  arr.push(id);
  // console.log(arr);

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
  console.log(res);
};

const getUserFavouritesIDs = async (userName) => {
  const req = await fetch(`/api/users/${userName}`);
  const res = await req.json();

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
    const favIDs = await getUserFavouritesIDs("pav.345@mail.ru");
    const favItems = await getUserFavouritesItems(favIDs);

    return favItems;
  } catch (error) {
    throw new Error(
      "Что-то пошло не так. Не удалось получить список избранного"
    );
  }
};
