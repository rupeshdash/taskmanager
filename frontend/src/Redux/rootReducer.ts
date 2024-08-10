import { combineReducers } from "redux";
import { authReducer } from "./AuthenticationDetails/AuthenticationDetailsReducers";

const rootReducer = combineReducers({
    authData : authReducer
})

export default rootReducer