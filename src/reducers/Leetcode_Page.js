// export const IsBusyReducer = (state = true, action) => {
//   console.log("Reducer >>  Is_Busy");
//   switch (action.type) {
//     case "Buzy":
//       return !state;
//     default:
//       return state;
//   }
// };

export const leetCodeReducer = (state = null, action) => {
  // console.log("Reducer >>  Task_Kist");
  // console.log("Task page List : ", state);
  switch (action.type) {
    case "LEETCODE_PROBLEMS_LIST":
      return action.payload;
    default:
      return state;
  }
};
