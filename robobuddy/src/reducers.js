import { CHANGE_SEARCHFIELD } from "./constant.js";

const initialState = {
  searchField: ""
};

export const searchRobots = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SEARCHFIELD:
      return { ...state, searchField: action.payload };
    default:
      return state;
  }
};
