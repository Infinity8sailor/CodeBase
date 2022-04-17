import { IsLoggedReducer, userInfoReducer } from "./isLogged";
// import IsMenuVisibleReducer from "./isMenuVisible";
// import {IsBusyReducer, tasksListReducer} from "./Tasks_Page";
// import {twitterTrendsListReducer } from "./Home_Page";
// import { usersListReducer} from "./Users_Page";
// import { projectsListReducer } from "./Projects_Page";
import SelectPageReducer from "./selectPage";
import {combineReducers} from 'redux';
import { leetCodeReducer } from './Leetcode_Page'


const allReducers = combineReducers({
    log_in_status : IsLoggedReducer,
    user_info : userInfoReducer,
    // tasks_page_tasks : tasksListReducer,
    // users_page_users : usersListReducer,
    leetcode_page_problems : leetCodeReducer,
    // home_page_twittertrends : twitterTrendsListReducer,
    // projects_page_projects : projectsListReducer,
    // menu_vis : IsMenuVisibleReducer,g
    // buzy_status : IsBusyReducer,
    page_live : SelectPageReducer,
});

export default allReducers;