import "./constant";
import { CHANGE_SEARCHFIELD } from "./constant";

export const setSearchField = text => {
  console.log(text);
  return {
    type: CHANGE_SEARCHFIELD,
    payload: text
  };
};
