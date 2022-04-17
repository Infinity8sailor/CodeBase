import React from "react";
import "./index.css";
import { useSelector } from "react-redux";
// import { selectPage, toggleBuzy } from "./../../actions/index";

// import { Tasks } from './Tasks/tasks';
// import { Home } from './Home/home';
// import { Users } from "./Users/Users";
// import { Projects } from "./Projects/projects";
// import { Apps } from "./Apps/Apps";
import { Leetcode } from "./Leetcode/Leetcode";


export const Pagex = () => {
    const page = useSelector((state) => state.page_live);

    //
    const components = {
        // Tasks : Tasks,
        // Projects : Projects,
        // Users : Users,
        // Apps :Apps,
        // Home : Home,
        Leetcode : Leetcode,
    }
    var  Xpage = components[page];
    
    return <Xpage />;
};
