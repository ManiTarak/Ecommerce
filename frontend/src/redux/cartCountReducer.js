import { UPDATE_CART_COUNT } from "./actionTypes";

export function cartCountReducer(state = { count: 0, cartItems: [] }, action) {
  switch (action.type) {
    case UPDATE_CART_COUNT:
      return {
        ...state,
        count: action.count,
        cartItems: [...action.cartItems],
      };
    default:
      return state;
  }
}
