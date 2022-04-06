import tokenReducer from "./reducers/token";
import userReducer from "./reducers/user";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  credentials: tokenReducer,
  user:  userReducer
});

export default rootReducer;
