export const userReducer = (state = {}, action) => {

  switch (action.type) {

  case "FETCH_USER":
    return {
      ...state,
      user: action.user,
    };
    
  default:
    return state;
  }

};

export default userReducer;
