import React, { createContext, useReducer } from "react";
import { newsReducer } from "./reducers/newReducers";

export const initState = {
  news: [],
  industries: [],
  entityTypes: [],
  exchanges: [],
  singleNews: null,
  loading: false,
  similarNews: [],
};

export const Context = createContext(initState);

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(newsReducer, initState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {" "}
      {children}{" "}
    </Context.Provider>
  );
};

export default Provider;
