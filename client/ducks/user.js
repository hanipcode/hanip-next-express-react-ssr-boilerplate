// Actions
const LOGIN = 'user/login';
const LOGOUT = 'user/logout';
const USER_EDIT = 'user/edit';

// initial state
const initialState = {
  user: {},
  accessToken: null,
};

// Action Creators
export function userLoginState(userData, accessToken) {
  return {
    type: LOGIN,
    userData,
    accessToken,
  };
}

export function userEditState(userData) {
  return {
    type: USER_EDIT,
    userData,
  };
}

export function userLogoutState() {
  return {
    type: LOGOUT,
  };
}

// reducers
export default function reducer(state = initialState, action) {
  if (!action) return state;
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.userData,
        accessToken: action.accessToken,
      };
    case LOGOUT:
      return {
        ...state,
        ...initialState,
      };
    case USER_EDIT:
      return {
        ...state,
        user: action.userData,
      };
    default:
      return state;
  }
}

export const getUserAccessTokenState = state => state.accessToken;
export const getUserDataState = state => state.user;
