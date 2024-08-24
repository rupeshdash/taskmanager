import { combineReducers } from "redux";
import { authReducer } from "./AuthenticationDetails/AuthenticationDetailsReducers";
import { teamReducer } from "./TeamsDetails/TeamDetailsReducers";

const rootReducer = combineReducers({
    authData : authReducer,
    teamData: teamReducer
})

export default rootReducer