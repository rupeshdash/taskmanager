/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { AppDispatch } from "../store";
import {
  CREATE_TEAM_FAILURE,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  GET_ALL_TEAMS_FAILURE,
  GET_ALL_TEAMS_REQUEST,
  GET_ALL_TEAMS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_TEAM_DETAILS_FAILURE,
  GET_TEAM_DETAILS_REQUEST,
  GET_TEAM_DETAILS_SUCCESS,
} from "./TeamsDetailsTypes";

export const createTeam = (
  requestBody: any,
  requestHeader: any,
  adminEmail: any
) => {
  return (dispatch: AppDispatch) => {
    dispatch(createTeamRequest());
    axios
      .post(
        "https://taskmanager-vgl4.onrender.com/api/v1/team/createteam",
        requestBody,
        requestHeader
      )
      .then((resp) => {
        if (resp.data.errors) {
          dispatch(createTeamFailure(resp.data));
        } else {
          dispatch(createTeamSuccess(resp.data));
          const requestHeader = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          };

          dispatch(
            getAllTeams(
              {
                adminEmail: adminEmail,
              },
              { headers: requestHeader }
            )
          );
        }
      })
      .catch((error) => {
        dispatch(createTeamFailure(error));
      });
  };
};
const createTeamRequest = () => ({
  type: CREATE_TEAM_REQUEST,
});

const createTeamSuccess = (data: any) => ({
  type: CREATE_TEAM_SUCCESS,
  payload: data,
});

const createTeamFailure = (error: any) => ({
  type: CREATE_TEAM_FAILURE,
  payload: error,
});

export const getAllTeams = (requestBody: any, requestHeader: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(getAllTeamsRequest());
    axios
      .post(
        "https://taskmanager-vgl4.onrender.com/api/v1/team/getallteams",
        requestBody,
        requestHeader
      )
      .then((resp) => {
        if (resp.data.errors) {
          dispatch(getAllTeamsFailure(resp.data.errors));
        } else {
          dispatch(getAllTeamsSuccess(resp.data));
        }
      })
      .catch((error) => {
        dispatch(getAllTeamsFailure(error.message));
      });
  };
};

const getAllTeamsRequest = () => ({
  type: GET_ALL_TEAMS_REQUEST,
});

const getAllTeamsSuccess = (data: any) => ({
  type: GET_ALL_TEAMS_SUCCESS,
  payload: data,
});

const getAllTeamsFailure = (error: any) => ({
  type: GET_ALL_TEAMS_FAILURE,
  payload: error,
});

export const fetchAllUsers = (requestBody: any, requestHeader: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(getAllUsersRequest());
    axios
      .post(
        "https://taskmanager-vgl4.onrender.com/api/v1/team/getallusers",
        requestBody,
        requestHeader
      )
      .then((resp) => {
        if (resp.data.errors) {
          dispatch(getAllUsersFailure(resp.data.errors));
        } else {
          dispatch(getAllUsersSuccess(resp.data));
        }
      })
      .catch((error) => {
        dispatch(getAllUsersFailure(error.message));
      });
  };
};

export const getAllUsersRequest = () => ({
  type: GET_ALL_USERS_REQUEST,
});

export const getAllUsersSuccess = (data : any) => ({
  type: GET_ALL_USERS_SUCCESS,
  payload: data,
});

export const getAllUsersFailure = (error : any) => ({
  type: GET_ALL_USERS_FAILURE,
  payload: error,
});

export const fetchTeamDetails = (requestHeader:any ,teamId: string) => {
   return (dispatch: AppDispatch) => {
     dispatch(getTeamDetailsRequest());
     axios
       .get(
         "https://taskmanager-vgl4.onrender.com/api/v1/team/getteamdetails",

        {
          headers: requestHeader,
          params: {
            teamId: teamId
          }
        }
       )
       .then((resp) => {
         if (resp.data.errors) {
           dispatch(getTeamDetailsFailure(resp.data.errors));
         } else {
           dispatch(getTeamDetailsSuccess(resp.data));
         }
       })
       .catch((error) => {
         dispatch(getTeamDetailsFailure(error.message));
       });
   };
}

const getTeamDetailsRequest = () => {
  return {
    type : GET_TEAM_DETAILS_REQUEST
  }
}
const getTeamDetailsSuccess = (data:object) => {
  return {
    type: GET_TEAM_DETAILS_SUCCESS,
    payload: data
  };
};
const getTeamDetailsFailure = (error:object) => {
  return {
    type: GET_TEAM_DETAILS_FAILURE,
    payload: error
  };
};