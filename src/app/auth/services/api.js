import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const setupIntercepteur = (store) => {
  api.interceptors.request.use(
    async (config) => {
      const accessToken = store?.getState()?.user?.accessToken;
      if (accessToken) {
        config.headers["x-access-token"] = `${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
