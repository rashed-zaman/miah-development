import axios from "axios";
import { BASE_URL } from "../serviceConfig";
export default {
  getData: async function (api) {
    try {
      const response = await axios.get(BASE_URL + api);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  postData: async function (api, body) {
    try {
      const response = await axios.post(BASE_URL + api , body);
      return response;
    } catch (error) {
      throw error;
    }
  },
  authGetData: async function (api, token) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    }
    try {
      const response = await axios.get(BASE_URL + api,  { headers });
      return response;
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear()
        location.href= "/"
      }
      throw error;
    }
  },
  postAuthData: async function (api, body, token) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    }
    try {
      const response = await axios.post(BASE_URL + api,  body, {headers });
      return response;
    } catch (error) {
      throw error;
    }
  },
};
