/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { AppDispatch } from "../store";
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
import { fetchTeamDetails } from "../TeamsDetails/TeamDetailsActions";

export const createTask = (
  requestBody: any,
  requestHeader: any,
  teamId: any
) => {
  return (dispatch: AppDispatch) => {
    dispatch(createTaskRequest());
    axios
      .post(
        "https://taskmanager-vgl4.onrender.com/api/v1/task/createtask",
        requestBody,
        requestHeader
      )
      .then((resp) => {
        if (resp.data.errors) {
          dispatch(createTaskFailure(resp.data));
        } else {
          dispatch(createTaskSuccess(resp.data));
          const requestHeader = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          };
          dispatch(
            fetchTeamDetails(requestHeader, resp?.data?.task?.team?._id)
          );
        }
      })
      .catch((error) => {
        dispatch(createTaskFailure(error));
      });
  };
};
const createTaskRequest = () => {
  return {
    type: CREATE_TASK_REQUEST,
  };
};

const createTaskSuccess = (data: any) => {
  return {
    type: CREATE_TASK_SUCCESS,
    payload: data,
  };
};

const createTaskFailure = (error: any) => {
  return {
    type: CREATE_TASK_FAILURE,
    payload: error,
  };
};

export const getAllTasks = (requestHeader: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(getAllTasksRequest());
    axios
      .get("https://taskmanager-vgl4.onrender.com/api/v1/task/getalltasks", requestHeader)
      .then((resp) => {
        if (resp.data.errors) {
          dispatch(getAllTasksFailure(resp.data.errors));
        } else {
          dispatch(getAllTasksSuccess(resp.data));
        }
      })
      .catch((error) => {
        dispatch(getAllTasksFailure(error.message));
      });
  };
};

const getAllTasksRequest = () => {
  return {
    type: GET_ALL_TASKS_REQUEST,
  };
};

const getAllTasksSuccess = (data: any) => {
  return {
    type: GET_ALL_TASKS_SUCCESS,
    payload: data,
  };
};

const getAllTasksFailure = (error: any) => {
  return {
    type: GET_ALL_TASKS_FAILURE,
    payload: error,
  };
};

export const updateTask = (requestBody: any, requestHeader: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(updateTaskRequest());
    axios
      .post(
        `https://taskmanager-vgl4.onrender.com/api/v1/task/updatetask`,
        requestBody,
        requestHeader
      )
      .then((resp) => {
        if (resp.data.errors) {
          dispatch(updateTaskFailure(resp.data));
        } else {
          dispatch(updateTaskSuccess(resp.data));
          const requestHeader = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          };

          dispatch(
            fetchTeamDetails(requestHeader, resp?.data?.task?.team?._id)
          );
        }
      })
      .catch((error) => {
        dispatch(updateTaskFailure(error));
      });
  };
};

const updateTaskRequest = () => {
  return {
    type: UPDATE_TASK_REQUEST,
  };
};

const updateTaskSuccess = (data: any) => {
  return {
    type: UPDATE_TASK_SUCCESS,
    payload: data,
  };
};

const updateTaskFailure = (error: any) => {
  return {
    type: UPDATE_TASK_FAILURE,
    payload: error,
  };

};


export const updateTaskStatus = (requestBody: any, requestHeader: any, userId:any) => {
  return (dispatch: AppDispatch) => {
    dispatch(updateTaskStatusRequest());
    axios
      .post(
        `https://taskmanager-vgl4.onrender.com/api/v1/task/updatetaskstatus`,
        requestBody,
        requestHeader
      )
      .then((resp) => {
        if (resp.data.errors) {
          dispatch(updateTaskStatusFailure(resp.data));
        } else {
          dispatch(updateTaskStatusSuccess(resp.data));
           const requestHeader = {
             Authorization: `Bearer ${localStorage.getItem("token")}`,
             userId: userId,
           };

           dispatch(getAllTasks({ headers: requestHeader }));
        }
      })
      .catch((error) => {
        dispatch(updateTaskStatusFailure(error));
      });
  };
};

const updateTaskStatusRequest = () => {
  return {
    type: UPDATE_TASK_STATUS_REQUEST,
  };
};  

const updateTaskStatusSuccess = (data: any) => {
  return {
    type: UPDATE_TASK_STATUS_SUCCESS,
    payload: data,
  };
};

const updateTaskStatusFailure = (error: any) => {
  return {
    type: UPDATE_TASK_STATUS_FAILURE,
    payload: error,
  };
};