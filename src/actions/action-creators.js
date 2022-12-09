import { SAVE_SEARCH } from "./action-type";

export const saveSearch = (searchKeywords) => ({
  type: SAVE_SEARCH,
  searchKeywords,
});
