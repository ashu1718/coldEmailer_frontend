import axios from "axios";
import { getRefreshToken, setAccessToken, clearTokens } from "../utils/token";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: BASE_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  // attach access token from localStorage
  const access = localStorage.getItem("access");
  if (access) {
    config.headers["Authorization"] = `Bearer ${access}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle when 401 from auth and we haven't retried yet
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh = getRefreshToken();
      if (!refresh) {
        // No refresh token: user must login again
        clearTokens();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // queue the request
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // hit refresh endpoint directly (do not use api instance to avoid loop)
        const resp = await axios.post(
          `${BASE_URL}/api/token/refresh/`,
          {
            refresh: refresh,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const newAccess = resp.data.access;
        // update localStorage
        setAccessToken(newAccess);

        api.defaults.headers.common["Authorization"] = "Bearer " + newAccess;
        processQueue(null, newAccess);

        // retry original request
        originalRequest.headers["Authorization"] = "Bearer " + newAccess;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearTokens(); // force logout
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
