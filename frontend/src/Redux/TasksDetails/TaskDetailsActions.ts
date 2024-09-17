/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { AppDispatch } from "../store";
import { CREATE_TASK_FAILURE, CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, GET_ALL_TASKS_FAILURE, GET_ALL_TASKS_REQUEST, GET_ALL_TASKS_SUCCESS } from "./TaskDetailsTypes";

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

        //   dispatch(
        //     getAllTasks(
        //       {
        //         adminEmail: adminEmail,
        //       },
        //       { headers: requestHeader }
        //     )
        //   );
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
