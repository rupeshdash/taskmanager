import { combineReducers } from "redux";
import { authReducer } from "./AuthenticationDetails/AuthenticationDetailsReducers";
import { taskReducer } from "./TasksDetails/TaskDetailsReducers";
import { teamReducer } from "./TeamsDetails/TeamDetailsReducers";

const rootReducer = combineReducers({
    authData : authReducer,
    teamData: teamReducer,
    taskdata: taskReducer,
})

export default rootReducer