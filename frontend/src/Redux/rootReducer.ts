import { combineReducers } from "redux";
import { authReducer } from "./AuthenticationDetails/AuthenticationDetailsReducers";
import { taskReducer } from "./TasksDetails/TaskDetailsReducers";
import { teamReducer } from "./TeamsDetails/TeamDetailsReducers";
import { chatReducer } from "./ChatDetails/ChatDetailsReducers";

const rootReducer = combineReducers({
  authData: authReducer,
  teamData: teamReducer,
  taskData: taskReducer,
  chatData: chatReducer,
});

export default rootReducer