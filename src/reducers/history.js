import { SAVE_SEARCH } from "../actions/action-type";

const initialState = {
  searchKeywords: [],
  historyData: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_SEARCH:
      return {
        ...state,
        searchKeywords: state.searchKeywords.concat(action.searchKeywords),
      };
    default:
      return state;
  }
}
