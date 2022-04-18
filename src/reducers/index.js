import { IsLoggedReducer, userInfoReducer } from "./isLogged";
import SelectPageReducer from "./selectPage";
import {combineReducers} from 'redux';
import { leetCodeReducer } from './Leetcode_Page'


const allReducers = combineReducers({
    log_in_status : IsLoggedReducer,
    user_info : userInfoReducer,
    leetcode_page_problems : leetCodeReducer,
    page_live : SelectPageReducer,
});

export default allReducers;