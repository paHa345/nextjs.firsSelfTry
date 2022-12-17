import { useReducer } from "react";
import AppContext from "./app-context";
const defaultAppState = {
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
      image: "img/products/protein_1.jpg",
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
      image: "img/products/protein_2.jpg",
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
      image: "img/products/protein_3.jpg",
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
      image: "img/products/creatine_1.jpg",
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
      image: "img/products/creatine_1.jpg",
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
      image: "img/products/creatine_1.jpg",
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
      image: "img/products/fat-burn_1.jpg",
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
      image: "img/products/fat-burn_1.jpg",
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
      image: "img/products/fat-burn_1.jpg",
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
      type: "promo",
      name: "Протеин Optimum Nutrition 100% Whey Gold Standard, 909 гр., шоколад мальт",
      image: "img/products/protein_1.jpg",
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
      type: "promo",
      promo: true,

      name: "Creatine1",
      image: "img/products/creatine_1.jpg",
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
      type: "promo",
      promo: true,

      name: "Lipo 6",
      image: "img/products/fat-burn_1.jpg",
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

  currentItems: [
    {
      id: "p4",
      promo: true,
      type: "promo",
      name: "Протеин Optimum Nutrition 100% Whey Gold Standard, 909 гр., шоколад мальт",
      image: "img/products/protein_1.jpg",
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
      type: "promo",
      promo: true,

      name: "Creatine1",
      image: "img/products/creatine_1.jpg",
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
      type: "promo",
      promo: true,

      name: "Lipo 6",
      image: "img/products/fat-burn_1.jpg",
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

  cartItems: [
    // {
    //   item: {
    //     id: "l44",
    //     type: "promo",
    //     promo: true,
    //     image: "img/products/protein_1.jpg",
    //     name: "Optimum nutrition Whey protein",
    //     price: 120,
    //     cost: 120,
    //     description:
    //       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
    //     comments:
    //       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptatibus impedit rerum voluptas unde quos facere qui pariatur sunt. Expedita commodi velit quaerat aperiam nostrum, hic porro quibusdam tempora atque?",
    //     nutrients: {
    //       protein: 12,
    //       fat: 1,
    //       carbohydrates: 5,
    //     },
    //   },
    //   quantity: 1,
    // },
  ],
  currentType: "Особое предложение",
  //   totalAmount: 0,
  showProducts: true,
  showItem: false,
  stickySection: false,
};

const appReducer = (state, action) => {
  if (action.type === "CURRENT") {
    const curItems = action.items;

    const productType = action.productsType;
    return {
      currentItems: curItems,
      cartItems: state.cartItems,
      showItem: state.showItem,
      showProducts: state.showProducts,
      productsByType: state.productsByType,
      item: state.item,
      currentType: productType,
      stickySection: state.stickySection,
    };
  }
  if (action.type === "CURRENTITEM") {
    const curItem = action.item;

    return {
      currentItems: state.currentItems,
      cartItems: state.cartItems,
      showItem: state.showItem,
      showProducts: state.showProducts,
      productsByType: state.productsByType,
      item: curItem,
      currentType: state.currentType,
      stickySection: state.stickySection,
    };
  }
  if (action.type === "ADD") {
    console.log(action.quantity, action.id);

    const hasItemInCart = state.cartItems.find((el) => el.item.id === action.id)
      ? true
      : false;

    const existingCartItemIndex = state.cartItems.findIndex(
      (item) => item.item.id === action.id
    );
    const existingCartItem = state.cartItems[existingCartItemIndex];
    console.log(existingCartItem);

    let newCartElements;

    if (!hasItemInCart) {
      const addedItem = state.productsByType.find((el) => el.id === action.id);
      const newEl = { ...addedItem };
      const newArr = [{ item: newEl, quantity: Number(action.quantity) }];
      newCartElements = state.cartItems.concat(newArr);
    }
    if (hasItemInCart) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + Number(action.quantity),
      };
      newCartElements = [...state.cartItems];
      newCartElements[existingCartItemIndex] = updatedItem;
    }

    localStorage.setItem("cartItems", JSON.stringify(newCartElements));

    return {
      cartItems: newCartElements,
      currentItems: state.currentItems,
      showItem: state.showItem,
      showProducts: state.showProducts,
      productsByType: state.productsByType,
      item: state.item,
      currentType: state.currentType,
      stickySection: state.stickySection,
    };
  }

  if (action.type === "REMOVE") {
    const number = state.cartItems.findIndex((el) => el.item.id === action.id);
    const cartArr = [...state.cartItems];
    cartArr.splice(number, 1);

    console.log(cartArr);
    localStorage.setItem("cartItems", JSON.stringify(cartArr));

    return {
      cartItems: cartArr,
      currentItems: state.currentItems,
      showItem: state.showItem,
      showProducts: state.showProducts,
      productsByType: state.productsByType,
      item: state.item,
      currentType: state.currentType,
      stickySection: state.stickySection,
    };
  }

  if (action.type === "SHOWITEM") {
    const hideProducts = false;
    const showItem = true;

    return {
      cartItems: state.cartItems,
      currentItems: state.currentItems,
      showItem: showItem,
      showProducts: hideProducts,
      productsByType: state.productsByType,
      item: state.item,
      currentType: state.currentType,
      stickySection: state.stickySection,
    };
  }

  if (action.type === "HIDEITEM") {
    const hideProducts = true;
    const showItem = false;

    return {
      cartItems: state.cartItems,
      currentItems: state.currentItems,
      showItem: showItem,
      showProducts: hideProducts,
      productsByType: state.productsByType,
      item: state.item,
      currentType: state.currentType,
      stickySection: state.stickySection,
    };
  }
  if (action.type === "STICKY") {
    const styckyItem = action.item;

    return {
      cartItems: state.cartItems,
      currentItems: state.currentItems,
      showItem: state.showItem,
      showProducts: state.showProducts,
      productsByType: state.productsByType,
      item: state.item,
      currentType: state.currentType,
      stickySection: styckyItem,
    };
  }

  if (action.type === "SETCART") {
    const localStorageEl = JSON.parse(localStorage.getItem("cartItems"));

    return {
      cartItems: localStorageEl,
      currentItems: state.currentItems,
      showItem: state.showItem,
      showProducts: state.showProducts,
      productsByType: state.productsByType,
      item: state.item,
      currentType: state.currentType,
      stickySection: state.styckyItem,
    };
  }

  return defaultAppState;
};

const AppProvider = (props) => {
  const [appState, dispatchAppAction] = useReducer(appReducer, defaultAppState);

  const setCurrentItems = (current) => {
    dispatchAppAction({
      type: "CURRENT",
      items: current.items,
      productsType: current.productsType,
    });
  };

  const addItemsToCart = (id, quantity) => {
    dispatchAppAction({ type: "ADD", id: id, quantity: quantity });
  };

  const removeItem = (id) => {
    dispatchAppAction({ type: "REMOVE", id: id });
  };

  const showItemHandler = (item) => {
    dispatchAppAction({ type: "SHOWITEM" });
  };

  const hideItemHandler = () => {
    dispatchAppAction({ type: "HIDEITEM" });
  };
  const setCurrentItemHandler = (item) => {
    dispatchAppAction({ type: "CURRENTITEM", item: item });
  };

  const setStickyHandler = (item) => {
    dispatchAppAction({ type: "STICKY", item: item });
  };

  const setCartFromLocalStorage = () => {
    dispatchAppAction({ type: "SETCART" });
  };

  const appContext = {
    items: appState.currentItems,
    totalAmount: 0,
    currentItems: setCurrentItems,
    cartItems: appState.cartItems,
    addItem: addItemsToCart,
    showProducts: appState.showProducts,
    showItem: appState.showItem,
    showItemHandler: showItemHandler,
    hideItemHandler: hideItemHandler,
    productsByType: appState.productsByType,
    item: appState.item,
    currentType: appState.currentType,
    setCurrentItem: setCurrentItemHandler,
    stickySection: appState.stickySection,
    setStickyHandler: setStickyHandler,
    removeItem: removeItem,
    setCartFromLocalStorage: setCartFromLocalStorage,
  };

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
