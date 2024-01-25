import React from "react";
import "./index.css";
import { useSelector } from "react-redux";
import { Leetcode } from "./Leetcode/Leetcode";


export const Pagex = () => {
    const page = useSelector((state) => state.page_live);
    const components = {
        Leetcode : Leetcode,
    }
    var  Xpage = components[page];
    
    return <Xpage />;
};
