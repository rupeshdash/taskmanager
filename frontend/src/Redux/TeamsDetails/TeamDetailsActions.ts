import axios from "axios";
import { AppDispatch } from "../store";
import {
  CREATE_TEAM_FAILURE,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  GET_ALL_TEAMS_FAILURE,
  GET_ALL_TEAMS_REQUEST,
  GET_ALL_TEAMS_SUCCESS,
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
        "http://localhost:8080/api/v1/team/createteam",
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
        "http://localhost:8080/api/v1/team/getallteams",
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
