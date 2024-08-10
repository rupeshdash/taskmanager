import axios from "axios";
import {
  LOGIN_DETAILS_FAILURE,
  LOGIN_DETAILS_REQUEST,
  LOGIN_DETAILS_SUCCESS,
  SIGNUP_DETAILS_FAILURE,
  SIGNUP_DETAILS_REQUEST,
  SIGNUP_DETAILS_SUCCESS,
} from "./AuthenticationDetailsTypes";

export const loginUser = (requestBody: any, requestHeader: any) => {
  return (dispatch: any) => {
    dispatch(loginUserRequest());
    axios
      .post("http://localhost:8080/api/user/login", requestBody, requestHeader)
      .then((resp) => {
        if (resp.data.errors) {
          dispatch(loginUserFailure(resp.data));
        } else {
          localStorage.setItem("token", resp?.data?.token);
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
      .post("http://localhost:8080/api/user/signup", requestBody, requestHeader)
      .then((resp) => {
        if (resp.data.errors) {
          dispatch(signupUserFailure(resp.data));
        } else {
          localStorage.setItem("token", resp?.data?.token);
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
