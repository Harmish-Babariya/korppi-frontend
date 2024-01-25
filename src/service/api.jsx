import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000, // Set a timeout
  headers: {
    "Content-Type": "application/json",
  },
});

const handleRequestError = (requestType, endpoint, error) => {
  console.error(`There was a problem with the ${requestType} request to ${endpoint}:`, error);
  return error;
};

const api = {
  get: async (endpoint, params = {}) => {
    try {
      const response = await instance.get(endpoint, { params });
      return response.data;
    } catch (error) {
      return handleRequestError("GET", endpoint, error);
    }
  },

  post: async (endpoint, data = {}) => {
    try {
      const response = await instance.post(endpoint, data);
      return response.data;
    } catch (error) {
      return handleRequestError("POST", endpoint, error);
    }
  },

  put: async (endpoint, data = {}) => {
    try {
      const response = await instance.put(endpoint, data);
      return response.data;
    } catch (error) {
      return handleRequestError("PUT", endpoint, error);
    }
  },

  delete: async (endpoint) => {
    try {
      const response = await instance.delete(endpoint);
      return response.data;
    } catch (error) {
      return handleRequestError("DELETE", endpoint, error);
    }
  },
};

export default api;
