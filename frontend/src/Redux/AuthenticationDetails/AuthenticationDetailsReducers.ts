import { LOGIN_DETAILS_FAILURE, LOGIN_DETAILS_REQUEST, LOGIN_DETAILS_SUCCESS, LOGOUT_SUCCESS, SIGNUP_DETAILS_FAILURE, SIGNUP_DETAILS_REQUEST, SIGNUP_DETAILS_SUCCESS } from "./AuthenticationDetailsTypes";

const initialState = {
  authLoading: false,
  isAuthenticated: !!localStorage.getItem("token"),
  authLoginResponse: "",
  authToken: "",
  userName: "",
  userEmail: localStorage.getItem("userEmail") || "",
  membersIn: "",
  adminIn: "",
  errorRespone: "",
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_DETAILS_REQUEST:
      return {
        ...state,
        authLoading: true,
        isAuthenticated: false,
      };
    case LOGIN_DETAILS_SUCCESS:
      return {
        ...state,
        authLoading: false,
        authLoginResponse: action.payload,
        authToken: action.payload.token,
        userName: action.payload.user.name,
        userEmail: action.payload.user.email,
        membersIn: action.payload.user.teamsMember,
        adminIn: action.payload.user.teamsAdmin,
        isAuthenticated: true,
      };
    case LOGIN_DETAILS_FAILURE:
      return {
        ...state,
        authLoading: false,
        errorResponse: action.payload.errors,
        isAuthenticated: false,
      };
    case SIGNUP_DETAILS_REQUEST:
      return {
        ...state,
        authLoading: true,
        isAuthenticated: false,
      };
    case SIGNUP_DETAILS_SUCCESS:
      return {
        ...state,
        authLoading: false,
        authLoginResponse: action.payload,
        authToken: action.payload.token,
        userName: action.payload.user.name,
        userEmail: action.payload.user.email,
        membersIn: action.payload.user.teamsMember,
        adminIn: action.payload.user.teamsAdmin,
        isAuthenticated: true,
      };
    case SIGNUP_DETAILS_FAILURE:
      return {
        ...state,
        authLoading: false,
        errorResponse: action.payload.errors,
        isAuthenticated: false,
      };
    case LOGOUT_SUCCESS: 
      return {
        ...state,
        authLoginResponse: "",
        authToken: "",
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
