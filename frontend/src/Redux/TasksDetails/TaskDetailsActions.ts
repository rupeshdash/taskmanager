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
        "http://localhost:8080/api/v1/task/createtask",
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
const createTaskRequest = () => ({
  type: CREATE_TASK_REQUEST,
});

const createTaskSuccess = (data: any) => ({
  type: CREATE_TASK_SUCCESS,
  payload: data,
});

const createTaskFailure = (error: any) => ({
  type: CREATE_TASK_FAILURE,
  payload: error,
});

export const getAllTasks = (requestBody: any, requestHeader: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(getAllTasksRequest());
    axios
      .post(
        "http://localhost:8080/api/v1/task/getalltasks",
        requestBody,
        requestHeader
      )
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

const getAllTasksRequest = () => ({
  type: GET_ALL_TASKS_REQUEST,
});

const getAllTasksSuccess = (data: any) => ({
  type: GET_ALL_TASKS_SUCCESS,
  payload: data,
});

const getAllTasksFailure = (error: any) => ({
  type: GET_ALL_TASKS_FAILURE,
  payload: error,
});

export const updateTask = (requestBody: any, requestHeader: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(updateTaskRequest());
    axios
      .post(
        `http://localhost:8080/api/v1/task/updatetask`,
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

const updateTaskRequest = () => ({
  type: UPDATE_TASK_REQUEST,
});

const updateTaskSuccess = (data: any) => ({
  type: UPDATE_TASK_SUCCESS,
  payload: data,
});

const updateTaskFailure = (error: any) => ({
  type: UPDATE_TASK_FAILURE,
  payload: error,
});
