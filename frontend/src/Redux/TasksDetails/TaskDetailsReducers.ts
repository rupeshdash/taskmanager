import { updateTask } from "./TaskDetailsActions";
import {
  CREATE_TASK_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  GET_ALL_TASKS_FAILURE,
  GET_ALL_TASKS_REQUEST,
  GET_ALL_TASKS_SUCCESS,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_STATUS_FAILURE,
  UPDATE_TASK_STATUS_REQUEST,
  UPDATE_TASK_STATUS_SUCCESS,
  UPDATE_TASK_SUCCESS,
} from "./TaskDetailsTypes";

const initialState = {
  createTaskLoading: false,
  createTaskResponse: "",
  createTaskErrorResponse: "",
  getAllTasksLoading: false,
  getAllTasksResponse: "",
  getAllTasksErrorResponse: "",
  allTasks: [],
  taskAdmin: "",
  taskMembers: [],
  updateTaskLoading: false,
  updateTaskResponse: "",
  updateTaskErrorResponse: "",
  updateTaskStatusLoading: false,
  updateTaskStatusResponse: "",
  updateTaskStatusErrorResponse: "",
};

export const taskReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_TASK_REQUEST:
      return {
        ...state,
        createtaskLoading: true,
      };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        createtaskLoading: false,
        createTaskResponse: action.payload,
        taskAdmin: action.payload.admin,
        taskMembers: action.payload.members,
      };
    case CREATE_TASK_FAILURE:
      return {
        ...state,
        createTaskLoading: false,
        createTaskErrorResponse: action.payload,
      };
    case GET_ALL_TASKS_REQUEST:
      return {
        ...state,
        getAllTasksLoading: true,
      };
    case GET_ALL_TASKS_SUCCESS:
      return {
        ...state,
        getAllTasksLoading: false,
        getAllTasksResponse: action.payload,
        allTasks: action.payload.allTasks,
      };  
    case GET_ALL_TASKS_FAILURE:
      return {
        ...state,
        getAllTasksLoading: false,
        getAllTasksErrorResponse: action.payload,
      };
    case UPDATE_TASK_REQUEST:
      return {
        ...state,
        updateTaskLoading: true,
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        updateTaskLoading: false,
        updateTaskResponse: action.payload,
      };
    case UPDATE_TASK_FAILURE:
      return {
        ...state,
        updateTaskLoading: false,
        updateTaskErrorResponse: action.payload,
      };
    case UPDATE_TASK_STATUS_REQUEST:
      return {
        ...state,
        updateTaskStatusLoading: true,
      }
    case UPDATE_TASK_STATUS_SUCCESS:
      return {
        ...state,
        updateTaskStatusLoading: false,
        updateTaskStatusResponse: action.payload
      }
    case UPDATE_TASK_STATUS_FAILURE:
      return {
        ...state,
        updateTaskStatusLoading: false,
        updateTaskStatusErrorResponse: action.payload
      }
    default:
      return state;
  }
};
