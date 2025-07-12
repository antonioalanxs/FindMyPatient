import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import { axiosInstance } from "@/core/services/AxiosService";
import { storageService } from "@/core/services/StorageService/StorageService";
import { authenticationService } from "@/core/services/AuthenticationService";
import { notificationService } from "@/core/services/NotificationService";
import { decode } from "@/core/utilities/tokens";
import { HTTP_METHODS, HTTP_STATUS } from "@/core/constants/http";
import { EXPIRED_REFRESH_TOKEN_MESSAGES } from "@/core/constants/api";
import { ROUTES } from "@/core/constants/routes";

const AxiosInterceptorContext = createContext();

export default AxiosInterceptorContext;

export const AxiosInterceptorProvider = ({ children }) => {
  const { setUser } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  (function authorizeRequest() {
    axiosInstance.interceptors.request.use(async (request) => {
      const accessToken = await storageService.get(storageService.ACCESS_TOKEN);

      accessToken && (request.headers.Authorization = `Bearer ${accessToken}`);

      return request;
    });
  })();

  (function handleSuccessResponse() {
    axiosInstance.interceptors.response.use(
      (response) => {
        const method = response.config.method.toUpperCase();
        const status = response.status;

        method === HTTP_METHODS["DELETE"] &&
          status === HTTP_STATUS["204_NO_CONTENT"] &&
          notificationService.showToast(
            "The resource was successfully deleted.",
            notificationService.TYPE.SUCCESS
          );

        method === HTTP_METHODS["PATCH"] &&
          status === HTTP_STATUS["200_OK"] &&
          notificationService.showToast(
            "Changes saved.",
            notificationService.TYPE.SUCCESS
          );

        const message = response?.data?.message;

        (method === HTTP_METHODS["POST"] || method === HTTP_METHODS["PUT"]) &&
          (status === HTTP_STATUS["200_OK"] ||
            status === HTTP_STATUS["201_CREATED"]) &&
          message &&
          notificationService.showToast(
            message,
            notificationService.TYPE.SUCCESS
          );

        return response;
      },
      (error) => Promise.reject(error)
    );
  })();

  (function handleErrorResponse() {
    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;

        switch (status) {
          case HTTP_STATUS["0_NETWORK_CONNECTION"]:
            error.message = "Connection error. Check your internet connection.";
            notificationService.showToast(
              error.message,
              notificationService.TYPE.ERROR
            );
            break;

          case HTTP_STATUS["400_BAD_REQUEST"]:
            error.message = error.response?.data?.detail;
            break;

          case HTTP_STATUS["401_UNAUTHORIZED"]:
            return await handleUnauthorizedError(error);

          case HTTP_STATUS["403_FORBIDDEN"]:
            navigate(ROUTES.ERROR.ABSOLUTE["403"]);
            break;

          case HTTP_STATUS["404_NOT_FOUND"]:
            navigate(ROUTES.ERROR.ABSOLUTE["404"]);
            break;

          default:
            error.message = "A server error occurred. Please, try again later.";
            notificationService.showToast(
              error.message,
              notificationService.TYPE.ERROR
            );
        }

        return Promise.reject(error);
      }
    );
  })();

  async function handleUnauthorizedError(error) {
    if (EXPIRED_REFRESH_TOKEN_MESSAGES.has(error.response?.data?.detail)) {
      setUser(null);

      notificationService.showToast(
        "Your session has expired. Please, log in again.",
        notificationService.TYPE.ERROR
      );

      await storageService.destroySession();

      return;
    }

    return await authenticationService.refreshToken().then(async (response) => {
      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;
      const user = decode(accessToken);

      setUser(user);
      await storageService.saveSession(accessToken, refreshToken, user);

      const originalRequest = error.config;
      originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

      return await axiosInstance(originalRequest);
    });
  }

  return (
    <AxiosInterceptorContext.Provider value={{}}>
      {children}
    </AxiosInterceptorContext.Provider>
  );
};
