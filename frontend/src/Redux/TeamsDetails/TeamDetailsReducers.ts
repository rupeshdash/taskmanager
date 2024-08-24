import {
  CREATE_TEAM_FAILURE,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  GET_ALL_TEAMS_FAILURE,
  GET_ALL_TEAMS_REQUEST,
  GET_ALL_TEAMS_SUCCESS,
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
    default:
      return state;
  }
};
