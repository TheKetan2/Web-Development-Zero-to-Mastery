import { ADD_ARTICLE } from "../constants/actions-type";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}
