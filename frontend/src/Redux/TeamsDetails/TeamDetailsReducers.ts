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
        teamAdmin: action.payload.admin,
        teamMembers: action.payload.members,
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
    default:
      return state;
  }
};
