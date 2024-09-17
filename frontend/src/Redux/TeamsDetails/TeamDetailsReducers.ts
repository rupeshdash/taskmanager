/* eslint-disable @typescript-eslint/no-explicit-any */
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

const initialState = {
  createTeamLoading: false,
  createTeamResponse: "",
  createTeamErrorResponse: "",
  getAllTeamsLoading: false,
  getAllTeamsResponse: "",
  getAllTeamsErrorResponse: "",
  allTeams: [],
  teamAdmin: "",
  teamMembers: "",
  getAllUsersLoading: false,
  getAllUsersResponse: "",
  getAllUsersErrorResponse: "",
  allUsers: [],
  getTeamDetailsLoading: false,
  getTeamDetailsResponse: "",
  getTeamDetailsErrorResponse: "",
  allTeamMembers: [],
  allTasksOfTeam: [],
};

export const teamReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_TEAM_REQUEST:
      return {
        ...state,
        createteamLoading: true,
      };
    case CREATE_TEAM_SUCCESS:
      return {
        ...state,
        createteamLoading: false,
        createTeamResponse: action.payload,
        teamAdmin: action?.payload?.admin,
        teamMembers: action?.payload?.members,
      };
    case CREATE_TEAM_FAILURE:
      return {
        ...state,
        createTeamLoading: false,
        createTeamErrorResponse: action.payload,
      };
    case GET_ALL_TEAMS_REQUEST:
      return {
        ...state,
        getAllTeamsLoading: true,
      };
    case GET_ALL_TEAMS_SUCCESS:
      return {
        ...state,
        getAllTeamsLoading: false,
        getAllTeamsResponse: action.payload,
        allTeams: action.payload.teams,
      };
    case GET_ALL_TEAMS_FAILURE:
      return {
        ...state,
        getAllTeamsLoading: false,
        getAllTeamsErrorResponse: action.payload,
        allTeams: action.payload.teams,
      };
    case GET_ALL_USERS_REQUEST:
      return {
        ...state,
        getAllUsersLoading: true,
        getAllUsersResponse: "",
        getAllUsersErrorResponse: "",
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        getAllUsersLoading: false,
        getAllUsersResponse: action.payload,
        allUsers: action.payload.orgUsers,
      };
    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        getAllUsersLoading: false,
        getAllUsersErrorResponse: action.payload,
      };
    case GET_TEAM_DETAILS_REQUEST:
      return {
        ...state,
        getTeamDetailsLoading: true,
        getTeamDetailsResponse: "",
        getTeamDetailsErrorResponse: "",
      };
    case GET_TEAM_DETAILS_SUCCESS:
      return {
        ...state,
        getTeamDetailsLoading: false,
        getTeamDetailsResponse: action.payload,
        allTeamMembers: action?.payload?.teamDetails[0]?.members,
        allTaskOfTeam: action?.payload?.teamDetails[0]?.allTasks,
      };
    case GET_TEAM_DETAILS_FAILURE:
      return {
        ...state,
        getTeamDetailsLoading: false,
        getTeamDetailsErrorResponse: action.payload,
      };
    default:
      return state;
  }
};
