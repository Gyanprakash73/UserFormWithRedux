export const ADD_USER = 'ADD_USER';

export const addUser = user => ({
  type: ADD_USER,
  user: user,
});

const initialState = {
  user: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default Reducer;
