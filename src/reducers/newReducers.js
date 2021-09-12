import { initState } from "../store";

export const newsReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "GET_NEWS_EXCHANGES":
      return {
        ...state,
        loading: false,
        exchanges: action.payload,
      };
    case "GET_NEWS_INDUSTRIES":
      return {
        ...state,
        loading: false,
        industries: action.payload,
      };
    case "GET_SINGLE_NEWS":
      return {
        ...state,
        loading: false,
        singleNews: action.payload,
      };
    case "GET_ALL_NEWS":
      return {
        ...state,
        loading: false,
        news: action.payload,
      };
    case "GET_SIMILAR_NEWS":
      return {
        ...state,
        loading: false,
        similarNews: action.payload,
      };
    case "GET_NEWS_ENTITIES_TYPES":
      return {
        ...state,
        loading: false,
        entityTypes: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
