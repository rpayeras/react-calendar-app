import { types } from "../types/types";

const initialState = {
  checking: false,
  // uid: null,
  // name: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };
    case types.authRegister:
      return {
        ...state,
        ...action.payload,
      };
    case types.authCheckingFinish:
      return {
        ...state,
        checking: false,
      };
    case types.authLogout:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
