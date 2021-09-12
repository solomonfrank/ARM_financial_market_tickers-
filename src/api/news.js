import axios from "../utils/axios";

const API_TOKEN = `${process.env.REACT_APP_API_TOKEN}`;
var params = {
  api_token: API_TOKEN,
  limit: "50",
  language: "en",
};

const encodeUrl = (params) => {
  var esc = encodeURIComponent;
  var query = Object.keys(params)
    .map(function (k) {
      return esc(k) + "=" + esc(params[k]);
    })
    .join("&");
  return query;
};

export const getAllNews = (payload) => {
  const requestBody = { ...params, ...payload };
  const query = encodeUrl(requestBody);
  return axios.get(`news/all?${query}`);
};

export const getIndustries = () =>
  axios.get(`entity/industry/list?api_token=${API_TOKEN}`);

export const getEntityTypes = () =>
  axios.get(`entity/type/list?api_token=${API_TOKEN}`);

export const getExchanges = () =>
  axios.get(`entity/exchange/list?api_token=${API_TOKEN}`);

export const getNews = (id) =>
  axios.get(`news/uuid/${id}?api_token=${API_TOKEN}`);

export const getSimilarNews = (id) =>
  axios.get(`news/similar/${id}?api_token=${API_TOKEN}`);
