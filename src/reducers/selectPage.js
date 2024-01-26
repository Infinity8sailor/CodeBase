const SelectPageReducer = (state = "Leetcode", action) =>{
    switch(action.type){
        case 'PAGE_SELECTION' : 
            return action.payload;
        default :
            return state;
    }
};

export default SelectPageReducer;