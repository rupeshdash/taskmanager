import axios from "axios";
import { AppDispatch } from "../store";
import {
  GET_ALL_CHAT_USERS_FAILURE,
  GET_ALL_CHAT_USERS_REQUEST,
  GET_ALL_CHAT_USERS_SUCCESS,
  GET_MESSAGES_FAILURE,
  GET_MESSAGES_SUCCESS,
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SET_MESSAGES,
} from "./ChatDetailsTypes";

export const fetchAllChatUsers = (requestBody: any, requestHeader: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(getallChatUsersRequest());
    axios
      .post(
        "http://localhost:8080/api/v1/chat/getallchatusers",
        requestBody,
        requestHeader
      )
      .then((resp) => {
        if (resp.data.errors) {
          dispatch(getallChatUsersFailure(resp.data.errors));
        } else {
          dispatch(getallChatUsersSuccess(resp.data));
        }
      })
      .catch((error) => {
        dispatch(getallChatUsersFailure(error.message));
      });
  };
};

export const getallChatUsersRequest = () => ({
  type: GET_ALL_CHAT_USERS_REQUEST,
});

export const getallChatUsersSuccess = (data: any) => ({
  type: GET_ALL_CHAT_USERS_SUCCESS,
  payload: data,
});

export const getallChatUsersFailure = (error: any) => ({
  type: GET_ALL_CHAT_USERS_FAILURE,
  payload: error,
});

export const sendMessage = (requestBody: any, requestHeader: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(sendMessageRequest());
    axios
      .post(
        "http://localhost:8080/api/v1/chat/sendmessage",
        requestBody,
        requestHeader
      )
      .then((resp) => {
        if (resp.data.errors) {
          dispatch(sendMessageFailure(resp.data.errors));
        } else {
          dispatch(sendMessageSuccess(resp.data));
        }
      })
      .catch((error) => {
        dispatch(sendMessageFailure(error.message));
      });
  };
};

const sendMessageRequest = () => ({
  type: SEND_MESSAGE_REQUEST,
});

const sendMessageSuccess = (data: any) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: data,
});

const sendMessageFailure = (error: any) => ({
  type: SEND_MESSAGE_FAILURE,
  payload: error,
});

export const getMessages = (requestBody: any, requestHeader: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(getMessagesRequest());
    axios
      .post(
        "http://localhost:8080/api/v1/chat/getmessages",
        requestBody,
        requestHeader
      )
      .then((resp) => {
        if (resp.data.errors) {
          dispatch(getMessagesFailure(resp.data.errors));
        } else {
          dispatch(getMessagesSuccess(resp.data));
        }
      })
      .catch((error) => {
        dispatch(getMessagesFailure(error.message));
      });
  };
};

const getMessagesRequest = () => ({
  type: SEND_MESSAGE_REQUEST,
});

const getMessagesSuccess = (data: any) => ({
  type: GET_MESSAGES_SUCCESS,
  payload: data,
});

const getMessagesFailure = (error: any) => ({
  type: GET_MESSAGES_FAILURE,
  payload: error,
});

export const setMessages = (data: any) => ({
  type: SET_MESSAGES,
  payload: data,
})