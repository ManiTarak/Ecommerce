import { combineReducers } from "redux";
import firstReducer from "./firstReducer";
import { cartCountReducer } from "./cartCountReducer";

export default combineReducers({
  firstReducer,
  cartCountReducer,
});
