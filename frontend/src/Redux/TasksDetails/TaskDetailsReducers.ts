import {
  CREATE_TASK_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  GET_ALL_TASKS_FAILURE,
  GET_ALL_TASKS_REQUEST,
  GET_ALL_TASKS_SUCCESS,
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
        allTasks: action.payload.tasks,
      };
    case GET_ALL_TASKS_FAILURE:
      return {
        ...state,
        getAllTasksLoading: false,
        getAllTasksErrorResponse: action.payload,
        allTasks: action.payload.tasks,
      };
    default:
      return state;
  }
};
