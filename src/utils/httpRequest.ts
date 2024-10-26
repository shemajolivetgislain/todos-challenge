// src/utils/HttpRequest.ts

import axios, { AxiosRequestConfig } from "axios";

const HttpRequest = {
  get: async (url: string, config: AxiosRequestConfig = {}) => {
    const response = await axios.get(url, config);
    return response.data;
  },

  post: async (url: string, data: any, config: AxiosRequestConfig = {}) => {
    const response = await axios.post(url, data, config);
    return response.data;
  },

  put: async (url: string, data: any, config: AxiosRequestConfig = {}) => {
    const response = await axios.put(url, data, config);
    return response.data;
  },

  delete: async (url: string, config: AxiosRequestConfig = {}) => {
    const response = await axios.delete(url, config);
    return response.data;
  },
};

export default HttpRequest;
