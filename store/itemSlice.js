import { createSlice } from "@reduxjs/toolkit";

export const initItemsState = {
  item: {
    id: "p11",
    type: "protein",
    name: "Optimum nutrition Whey protein",
    image: "/img/products/protein_1.jpg",
    price: 1200,
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
    comments:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
    nutrients: {
      protein: 12,
      fat: 1,
      carbohydrates: 5,
    },
  },

  productsByType: [
    {
      id: "p1",
      type: "protein",
      promo: false,

      name: "Protein1",
      image: "/img/products/protein_1.jpg",
      price: 1200,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      comments:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      nutrients: {
        protein: 12,
        fat: 1,
        carbohydrates: 5,
      },
    },
    {
      id: "p2",
      type: "protein",
      promo: false,

      name: "Protein2",
      image: "/img/products/protein_2.jpg",
      price: 1200,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      comments:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      nutrients: {
        protein: 12,
        fat: 1,
        carbohydrates: 5,
      },
    },
    {
      id: "p3",
      type: "protein",
      promo: false,

      name: "Protein3",
      image: "/img/products/protein_3.jpg",
      price: 1200,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      comments:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      nutrients: {
        protein: 12,
        fat: 1,
        carbohydrates: 5,
      },
    },

    {
      id: "c1",
      type: "creatine",
      promo: false,

      name: "Creatine1",
      image: "/img/products/creatine_1.jpg",
      price: 1200,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      comments:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      nutrients: {
        protein: 12,
        fat: 1,
        carbohydrates: 5,
      },
    },
    {
      id: "c2",
      type: "creatine",
      promo: false,

      name: "Creatine2",
      image: "/img/products/creatine_1.jpg",
      price: 1200,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      comments:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      nutrients: {
        protein: 12,
        fat: 1,
        carbohydrates: 5,
      },
    },
    {
      id: "c3",
      type: "creatine",
      promo: false,

      name: "Creatine3",
      image: "/img/products/creatine_1.jpg",
      price: 1200,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      comments:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      nutrients: {
        protein: 12,
        fat: 1,
        carbohydrates: 5,
      },
    },

    {
      id: "l1",
      type: "lipo",
      promo: false,

      name: "Lipo2",
      image: "/img/products/fat-burn_1.jpg",
      price: 1200,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      comments:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      nutrients: {
        protein: 12,
        fat: 1,
        carbohydrates: 5,
      },
    },
    {
      id: "l2",
      type: "lipo",
      promo: false,

      name: "Lipo3",
      image: "/img/products/fat-burn_1.jpg",
      price: 1200,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      comments:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      nutrients: {
        protein: 12,
        fat: 1,
        carbohydrates: 5,
      },
    },
    {
      id: "l3",
      type: "lipo",
      promo: false,

      name: "Lipo4",
      image: "/img/products/fat-burn_1.jpg",
      price: 1200,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      comments:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      nutrients: {
        protein: 12,
        fat: 1,
        carbohydrates: 5,
      },
    },
    {
      id: "p4",
      promo: true,
      type: "protein",
      name: "Протеин Optimum Nutrition 100% Whey Gold Standard, 909 гр., шоколад мальт",
      image: "/img/products/protein_1.jpg",
      price: 1200,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      comments:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      nutrients: {
        protein: 12,
        fat: 1,
        carbohydrates: 5,
      },
    },
    {
      id: "c4",
      type: "creatine",
      promo: true,

      name: "Creatine1",
      image: "/img/products/creatine_1.jpg",
      price: 1200,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      comments:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      nutrients: {
        protein: 12,
        fat: 1,
        carbohydrates: 5,
      },
    },
    {
      id: "l4",
      type: "lipo",
      promo: true,

      name: "Lipo 6",
      image: "/img/products/fat-burn_1.jpg",
      price: 1200,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      comments:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
      nutrients: {
        protein: 12,
        fat: 1,
        carbohydrates: 5,
      },
    },
  ],

  currentItems: [],
  currentComments: [],
  favouriteItemsIDs: [],
  favouriteItems: [{ initial: true }],
  orderedItems: [{ initial: true }],
};

export const itemSlice = createSlice({
  name: "item",
  initialState: initItemsState,
  reducers: {
    setCurrentItem(state, action) {
      state.item = action.payload;
    },
    setCurrentTypeItems(state, action) {
      state.currentItems = action.payload;
    },
    setCurrentComments(state, action) {
      state.currentComments = action.payload;
    },
    setFavouriteItems(state, action) {
      state.favouriteItems = action.payload.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
      });
    },
    setFavouriteIDs(state, action) {
      const IDs = action.payload.map((el) => el.id);
      state.favouriteItemsIDs = IDs.sort((a, b) => {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
      });
    },
    setOrderedItems(state, action) {
      state.orderedItems = action.payload;
    },
  },
});

export const itemsActions = itemSlice.actions;
