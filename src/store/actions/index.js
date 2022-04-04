export const setToken = (token) => {
  return {
    type: "SET_TOKEN",
    payload: token,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};
