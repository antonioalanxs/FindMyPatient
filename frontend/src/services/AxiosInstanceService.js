import { useHistory } from "react-router-dom";

import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { storageService } from "@/services/StorageService";
import { API_URL } from "@/constants";

/**
 * Axios instance specifically for making requests to the API defined by `API_URL` constant.
 *
 * This instance is used for requests that do not require an access token.
 */
const axiosInstance = axios.create({
  baseURL: API_URL,
});

/**
 * Axios instance specifically for making requests to the API defined by `API_URL` constant.
 *
 * This instance is used for requests that require an access token.
 *
 * It includes an interceptor to add and refresh the access token.
 */

const axiosInstanceWithTokens = axios.create({
  baseURL: API_URL,
});

axiosInstanceWithTokens.interceptors.request.use(async (request) => {
  let accessToken = storageService.get(storageService.ACCESS_TOKEN);
  let refreshToken = storageService.get(storageService.REFRESH_TOKEN);
  let user = storageService.get(storageService.USER);

  const isAccessTokenExpired = user.exp < new Date() / 1000;

  if (isAccessTokenExpired) {
    await axiosInstance
      .post(`/tokens/refresh/`, {
        refresh: refreshToken,
      })
      .then((response) => {
        accessToken = response.data.access_token;
        refreshToken = response.data.refresh_token;
        user = jwtDecode(accessToken);

        storageService._save(storageService.ACCESS_TOKEN, accessToken);
        storageService._save(storageService.REFRESH_TOKEN, refreshToken);
        storageService._save(storageService.USER, user);
      })
      .catch(() => {
        storageService._clear();
        useHistory().push("/");
      });
  }

  request.headers.Authorization = `Bearer ${accessToken}`;

  return request;
});

export { axiosInstance, axiosInstanceWithTokens };
