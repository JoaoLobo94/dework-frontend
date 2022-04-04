import tokenReducer from "./reducers/token";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  token: tokenReducer,
});

export default rootReducer;
