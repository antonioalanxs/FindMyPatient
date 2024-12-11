import axios from "axios";

import { storageService } from "@/core/services/StorageService";
import { notificationService } from "@/core/services/NotificationService";
import { decode } from "@/core/utilities/functions";
import { API_URL } from "@/core/constants/general";

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
  let accessToken = await storageService.get(storageService.ACCESS_TOKEN);
  let refreshToken = await storageService.get(storageService.REFRESH_TOKEN);
  let user = await storageService.get(storageService.USER);

  const isAccessTokenExpired = user.exp < new Date() / 1000;

  if (isAccessTokenExpired) {
    await axiosInstance
      .post(`/tokens/refresh/`, {
        refresh: refreshToken,
      })
      .then(async (response) => {
        accessToken = response.data.access_token;
        refreshToken = response.data.refresh_token;
        user = decode(accessToken);

        await storageService.save(storageService.ACCESS_TOKEN, accessToken);
        await storageService.save(storageService.REFRESH_TOKEN, refreshToken);
        await storageService.save(storageService.USER, user);
      })
      .catch(async () => {
        await storageService.remove(storageService.ACCESS_TOKEN);
        await storageService.remove(storageService.REFRESH_TOKEN);
        await storageService.remove(storageService.USER);
        await storageService.remove(storageService.THEME);

        notificationService.showToast(
          "Your session has expired. Please restart the application and log in again.",
          notificationService.ICONS.ERROR
        );
      });
  }

  request.headers.Authorization = `Bearer ${accessToken}`;

  return request;
});

export { axiosInstance, axiosInstanceWithTokens };
