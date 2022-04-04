const tokenReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return action.payload;
    case "SIGN_OUT":
      return "";
    default:
      return state;
  }
};

export default tokenReducer;
