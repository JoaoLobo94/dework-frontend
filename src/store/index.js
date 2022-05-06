import tokenReducer from "./reducers/token";
import userReducer from "./reducers/user";
import companyReducer from "./reducers/company";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  credentials: tokenReducer,
  user:  userReducer,
  company:  companyReducer
});

export default rootReducer;
