const companyReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_COMPANY":
      return action.payload;
    default:
      return state;
  }
};

export default companyReducer;
