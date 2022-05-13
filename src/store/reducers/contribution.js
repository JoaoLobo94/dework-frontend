const contributionReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_CONTRIBUTION":
      return action.payload;
    default:
      return state;
  }
};

export default contributionReducer;
