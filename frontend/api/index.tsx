import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const BASE_URL = "https://lilac-music.net/api/v1";
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(function (config) {
  const accessToken = cookies.get("accessToken");
  if (!accessToken) {
    config.headers.Authorization = null;
    return config;
  }

  if (config.headers && accessToken) {
    config.headers.Authorization = `${accessToken}`;
    return config;
  }
});

instance.interceptors.response.use(
  (response) => {
    console.log("interceptor response 200");
    return response;
  },

  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    // statusCode 401 : 만료된 토큰
    if (status === 401) {
      const accessToken = cookies.get("accessToken");
      const refreshToken = cookies.get("refreshToken");
      const originalRequest = config;

      // 토큰 재발급을 위한 요청
      if (refreshToken) {
        const token = sessionStorage.getItem("accessToken");
        const data = await axios.post(
          `${BASE_URL}/refresh`,
          {
            refreshToken: `${refreshToken}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const accessToken = data;
        cookies.set("accessToken", accessToken, { path: "/" });
        originalRequest.headers.Authorization = `${accessToken}`;
        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export const api = instance;

export const CLOUD_FRONT = "https://d1nj0um6xv6zar.cloudfront.net/";
