import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("user_token");
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken.toString()}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleRequestError = (requestType, endpoint, error) => {
  console.error(
    `There was a problem with the ${requestType} request to ${endpoint}:`,
    error
  );
  return error;
};

const api = {
  post: async (endpoint, data = {}) => {
    try {
      const response = await instance.post(endpoint, data);
      return response.data;
    } catch (error) {
      return handleRequestError("POST", endpoint, error);
    }
  },
};

export default api;
