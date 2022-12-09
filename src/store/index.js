import { applyMiddleware, compose, createStore } from "redux";

import { reducer } from "../reducers/history";
import thunk from "redux-thunk";

const isBrowser = typeof document !== "undefined";

const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    isBrowser &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const configureStore = () => {
  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
};

const store = configureStore();

export default store;
