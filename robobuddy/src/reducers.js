import { CHANGE_SEARCHFIELD } from "./constant.js";

const initialState = {
  searchField: ""
};

export const searchRobots = (state = initialState, action = {}) => {
  console.log(action.type);
  switch (action.type) {
    case CHANGE_SEARCHFIELD:
      return Object.assign({}, state, { searchField: action.payload });
    default:
      return state;
  }
};
