/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET_USER_DETAILS, GET_USER_DETAILS_FAILURE, GET_USER_DETAILS_SUCCESS, LOGIN_DETAILS_FAILURE, LOGIN_DETAILS_REQUEST, LOGIN_DETAILS_SUCCESS, LOGOUT_SUCCESS, SIGNUP_DETAILS_FAILURE, SIGNUP_DETAILS_REQUEST, SIGNUP_DETAILS_SUCCESS } from "./AuthenticationDetailsTypes";

const initialState = {
  authLoading: false,
  isAuthenticated: !!localStorage.getItem("token"),
  authLoginResponse: "",
  authToken: "",
  userName: localStorage.getItem("userName") || "",
  userEmail: localStorage.getItem("userEmail") || "",
  userId: localStorage.getItem("userId") || "",
  avatar: localStorage.getItem("avatar") || "",
  membersIn: "",
  adminIn: "",
  errorRespone: "",
  getUserDetailsLoading: false,
  getUserDetailsResponse: "",
  getUserDetailsErrorResponse: "",
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
        avatar: action.payload.user.avatar,
        userId: action.payload.user._id,
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
        userId: action.payload.user._id,
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
    case GET_USER_DETAILS:
      return {
        ...state,
        getUserDetailsLoading: true,
      }
    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        getUserDetailsLoading: false,
        getUserDetailsResponse: action.payload,
        authLoginResponse: action.payload,
        authToken: action.payload.token,
        userName: action.payload.user.name,
        userEmail: action.payload.user.email,
        userId: action.payload.user._id,
        membersIn: action.payload.user.teamsMember,
        adminIn: action.payload.user.teamsAdmin,
        
      }
    case GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        getUserDetailsLoading: false,
        getUserDetailsErrorResponse: action.payload
      }

    default:
      return state;
  }
};
