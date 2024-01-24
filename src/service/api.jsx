import axios from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000, // Set a timeout
  headers: {
    "Content-Type": "application/json",
  },
});
const api = {
  get: async (endpoint, params = {}) => {
    try {
      const response = await instance.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error("There was a problem with the GET request:", error);
      return error;
    }
  },

  post: async (endpoint, data = {}) => {
    try {
      const response = await instance.post(endpoint, data);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("There was a problem with the POST request:", error);
      return error;
    }
  },

  put: async (endpoint, data = {}) => {
    try {
      const response = await instance.put(endpoint, data);
      return response.data;
    } catch (error) {
      console.error("There was a problem with the PUT request:", error);
      return error;
    }
  },

  delete: async (endpoint) => {
    try {
      const response = await instance.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error("There was a problem with the DELETE request:", error);
      return error;    }
  },
};

export default api;
