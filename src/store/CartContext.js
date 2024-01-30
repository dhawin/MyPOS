// CartContext.js
import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialCartState = {
  cart: [],
};

const calculateTotalAmount = (cart) => {
  return cart.reduce((total, item) => total + parseFloat(item.totalAmount), 0);
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: addToCart(state.cart, action.payload),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: removeFromCart(state.cart, action.payload),
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: increaseQuantity(state.cart, action.payload),
        totalAmount: state.totalAmount + action.payload.price,
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: decreaseQuantity(state.cart, action.payload),
        totalAmount: state.totalAmount - action.payload.price,
      };
    default:
      return state;
  }
};

const increaseQuantity = (cart, product) => {
  return cart.map((item) =>
    item.id === product.id
      ? {
          ...item,
          quantity: item.quantity + 1,
          totalAmount: parseFloat(item.price) * parseFloat(item.quantity + 1),
        }
      : item
  );
};

const decreaseQuantity = (cart, product) => {
  return cart
    .map((item) =>
      item.id === product.id
        ? item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              totalAmount: parseFloat(item.price) * parseFloat(item.quantity - 1),
            }
          : null
        : item
    )
    .filter(Boolean); // Remove null values (products with quantity <= 0)
};

const addToCart = (cart, product) => {
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    return cart.map((item) =>
      item.id === product.id
        ? {
            ...item,
            quantity: item.quantity + 1,
            totalAmount: parseFloat(item.price) * parseFloat(item.quantity + 1),
          }
        : item
    );
  } else {
    return [...cart, { ...product, quantity: 1, totalAmount: product.price }];
  }
};

const removeFromCart = (cart, product) => {
  return cart.filter((item) => item.id !== product.id);
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const { cart } = state;
  const totalAmount = calculateTotalAmount(cart);

  return (
    <CartContext.Provider value={{ cartState: { ...state, totalAmount }, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
