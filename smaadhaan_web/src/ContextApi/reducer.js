export const initialState = {
  isAuth: false,
  details: {
    Org_id: '',
    org_name: '',
    username: '',
    location: '',
  },
  AcceptedUser: [],
  AllRequest: [],
};

export const actions = {
  SET_AUTH: 'SET_AUTH',
  SET_DETAILS: 'SET_DETAILS',
  SET_ACCEPTEDUSER: 'SET_ACCEPTEDUSER',
  SET_ALL_REQUESTS: 'SET_ALL_REQUESTS',
};

const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case actions.SET_AUTH:
      return {
        ...state,
        isAuth: action.isAuth,
      };
    case actions.SET_DETAILS:
      return {
        ...state,
        details: action.details,
      };
    case actions.SET_ACCEPTEDUSER:
      return {
        ...state,
        AcceptedUser: action.AcceptedUser,
      };
    case actions.SET_ALL_REQUESTS:
      return {
        ...state,
        AllRequest: action.AllRequest,
      };

    default:
      return state;
  }
};

export default reducer;
