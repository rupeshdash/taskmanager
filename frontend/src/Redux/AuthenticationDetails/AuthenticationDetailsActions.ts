/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import {
  GET_USER_DETAILS,
  GET_USER_DETAILS_SUCCESS,
  LOGIN_DETAILS_FAILURE,
  LOGIN_DETAILS_REQUEST,
  LOGIN_DETAILS_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_DETAILS_FAILURE,
  SIGNUP_DETAILS_REQUEST,
  SIGNUP_DETAILS_SUCCESS,
} from "./AuthenticationDetailsTypes";
import { AppDispatch } from "../store";

export const loginUser = (requestBody: any, requestHeader: any) => {
  return (dispatch: any) => {
    dispatch(loginUserRequest());
    axios
      .post("https://taskmanager-vgl4.onrender.com/api/user/login", requestBody, requestHeader)
      .then((resp) => {
        if (resp.data.errors) {
          dispatch(loginUserFailure(resp.data));
        } else {
          localStorage.setItem("token", resp?.data?.token);
          localStorage.setItem("userEmail", resp?.data?.user?.email);
          localStorage.setItem("org", resp?.data?.user?.organization);
          localStorage.setItem("userId", resp?.data?.user?._id);
          localStorage.setItem("avatar", resp?.data?.user?.avatar);
          localStorage.setItem("userName", resp?.data?.user?.name);

          dispatch(loginUserSuccess(resp.data));
        }
      })
      .catch((error) => {
        dispatch(loginUserFailure(error));
      });
  };
};
const loginUserRequest = () => {
  return {
    type: LOGIN_DETAILS_REQUEST,
  };
};
const loginUserSuccess = (apiData: any) => {
  return {
    type: LOGIN_DETAILS_SUCCESS,
    payload: apiData,
  };
};

const loginUserFailure = (apiError: any) => {
  return {
    type: LOGIN_DETAILS_FAILURE,
    payload: apiError,
  };
};

export const signupUser = (requestBody: any, requestHeader: any) => {
  return (dispatch: any) => {
    dispatch(signupUserRequest());
    axios
      .post("https://taskmanager-vgl4.onrender.com/api/user/signup", requestBody, requestHeader)
      .then((resp) => {
        if (resp.data.errors) {
          dispatch(signupUserFailure(resp.data));
        } else {
          localStorage.setItem("token", resp?.data?.token);
          localStorage.setItem("userEmail", resp?.data?.user?.email);
          localStorage.setItem("org", resp?.data?.user?.organization);
          localStorage.setItem("userId", resp?.data?.user?._id);
          localStorage.setItem("avatar", resp?.data?.user?.avatar);
          localStorage.setItem("userName", resp?.data?.user?.name);
          dispatch(signupUserSuccess(resp.data));
        }
      })
      .catch((error) => {
        dispatch(signupUserFailure(error));
      });
  };
};

const signupUserRequest = () => {
  return {
    type: SIGNUP_DETAILS_REQUEST,
  };
};

const signupUserSuccess = (apiData: any) => {
  return {
    type: SIGNUP_DETAILS_SUCCESS,
    payload: apiData,
  };
};

const signupUserFailure = (apiError: any) => {
  return {
    type: SIGNUP_DETAILS_FAILURE,
    payload: apiError,
  };
};

export const logoutUserRequest = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("org");
  localStorage.removeItem("userId");
  localStorage.removeItem("avatar");
  localStorage.removeItem("userName");
  return (dispatch: any) => {
    if (!localStorage.getItem("token")) {
      dispatch(logoutuserSuccess());
    }
  };
};

const logoutuserSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const fetchUserDetails = (requestHeader: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(fetchUserDetailsRequest());
    axios
      .get("https://taskmanager-vgl4.onrender.com/api/user/getuserdetails", requestHeader)
      .then((resp) => {
        if (resp.data.errors) {
          dispatch(fetchUserDetailsFailure(resp.data.errors));
        } else {
          dispatch(fetchUserDetailsSuccess(resp.data));
        }
      })
      .catch((error) => {
        dispatch(fetchUserDetailsFailure(error.message));
      });
  };
};

const fetchUserDetailsRequest = () => {
  return {
    type: GET_USER_DETAILS,
  };
};

const fetchUserDetailsSuccess = (apiData: any) => {
  return {
    type: GET_USER_DETAILS_SUCCESS,
    payload: apiData,
  };
};

const fetchUserDetailsFailure = (apiError: any) => {
  return {
    type: GET_USER_DETAILS_SUCCESS,
    payload: apiError,
  };
};
