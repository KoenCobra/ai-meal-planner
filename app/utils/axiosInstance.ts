import axios from "axios";

// Axios Interceptor Instance
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPOONACULAR_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      apiKey: process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY,
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
