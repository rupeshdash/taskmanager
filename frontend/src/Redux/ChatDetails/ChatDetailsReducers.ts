import { get } from "http";
import { GET_ALL_CHAT_USERS_FAILURE, GET_ALL_CHAT_USERS_REQUEST, GET_ALL_CHAT_USERS_SUCCESS, GET_MESSAGES_FAILURE, GET_MESSAGES_REQUEST, GET_MESSAGES_SUCCESS, SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, SET_MESSAGES } from "./ChatDetailsTypes";

const initialState = {
  getAllChatUsersLoading : false,
  getAllChatUsersResponse : "",
  getAllChatUsersErrorResponse : "",
  chatUsers : [],
  activeUserToChat : "",
  messages : [],
  selectedChatType : "",
  sendMessageLoading : false,
  sendMessageResponse : "",
  sendMessageErrorResponse : "",
  getMessageLoading : false,
  getMessageResponse : "",
  getMessageErrorResponse : "",
};

export const chatReducer = (state = initialState, action: any) => {
  switch (action.type) {
    
    case GET_ALL_CHAT_USERS_REQUEST:
      return {
        ...state,
        getAllChatUsersLoading : true,
      }
    case GET_ALL_CHAT_USERS_SUCCESS:
      return {
        ...state,
        getAllChatUsersLoading: false,
        getAllChatUsersResponse: action.payload,
        chatUsers: action.payload.allChatUsers,
      };
    case GET_ALL_CHAT_USERS_FAILURE:
      return {
        ...state,
        getAllChatUsersLoading: false,
        getAllChatUsersErrorResponse: action.payload,
      }
    case SEND_MESSAGE_REQUEST:
      return {
        ...state,
        sendMessageLoading: true,
      }
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        sendMessageLoading: false,
        sendMessageResponse: action.payload,
        messages: [...state.messages, action.payload.recentMessage],
        sendMessageErrorResponse: "",
      };
    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        sendMessageLoading: false,
        sendMessageResponse: "",
        sendMessageErrorResponse: action.payload,
      }
    case GET_MESSAGES_REQUEST:
      return {
        ...state,
        getMessageLoading: true,
      }
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        getMessageLoading: false,
        getMessageResponse: action.payload,
        getMessageErrorResponse: "",
        messages: action.payload.messages,
      }
    case GET_MESSAGES_FAILURE:
      return {
        ...state,
        getMessageLoading: false,
        getMessageResponse: "",
        getMessageErrorResponse: action.payload,
      }
    case SET_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }
    default:
      return state;
  }
};
