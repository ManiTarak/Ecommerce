import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_CART_COUNT } from "../redux/actionTypes";
const AddToCart = ({ product }) => {
  const count = useSelector((state) => {
    return state.cartCountReducer.count;
  });
  const cartItems = useSelector((state) => {
    return state.cartCountReducer.cartItems;
  });
  const dispatch = useDispatch();

  // function to handle Add to cart button click
  const handleAddCartBtnClick = (e) => {
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    dispatch({
      type: UPDATE_CART_COUNT,
      count: count + 1,
      cartItems: cartItems,
    });
  };
  useEffect(() => {
    var a = [];
    if (localStorage.getItem("cartItems") && cartItems.length == 0) {
      a = [...JSON.parse(localStorage.getItem("cartItems"))];
    }

    for (let i = 0; i < a.length; i++) {
      cartItems.push(a[i]);
    }
    dispatch({
      type: UPDATE_CART_COUNT,
      count: cartItems.length,
      cartItems: cartItems,
    });
  }, []);
  return (
    <button
      onClick={handleAddCartBtnClick}
      className="text-base font-serif bg-blue-600 p-[5px] text-white rounded-lg px-[15px]  mr-[5px] "
    >
      Add Cart
    </button>
  );
};

export default AddToCart;
