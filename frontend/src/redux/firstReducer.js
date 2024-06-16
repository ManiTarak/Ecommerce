import { UPDATE_SEARCHED_PRODUCTS } from "./actionTypes";

function firstReducer(state = { keyword: "", results: [] }, action) {
  switch (action.type) {
    case UPDATE_SEARCHED_PRODUCTS:
      return {
        ...state,
        keyword: action.keyword,
        results: [...action.results],
      };
    default:
      return state;
  }
}
export default firstReducer;
