import { createContext, useState, useEffect } from "react";

import { storageService } from "@/core/services/StorageService";
import {
  axiosInstance,
  axiosInstanceWithTokens,
} from "@/core/services/AxiosInstanceService";
import { notificationService } from "@/core/services/NotificationService";
import { isTokenExpired, decode } from "@/core/utilities/tokens";
import { MESSAGES } from "@/core/constants/messages";
import { ROUTES } from "@/core/constants/routes";

const AuthenticationContext = createContext();

export default AuthenticationContext;

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  axiosInstanceWithTokens.interceptors.request.use(async (request) => {
    let accessToken = await storageService.get(storageService.ACCESS_TOKEN);
    let refreshToken = await storageService.get(storageService.REFRESH_TOKEN);
    let user = await storageService.get(storageService.USER);

    isTokenExpired(user) &&
      (await axiosInstance
        .post(ROUTES.REFRESH_TOKENS, {
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
          setUser(null);

          notificationService.showToast(
            MESSAGES.TOKEN_EXPIRED,
            notificationService.ICONS.ERROR
          );

          await storageService.clear();
        }));

    request.headers.Authorization = `Bearer ${accessToken}`;

    return request;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onMount = async () => {
      const data = await storageService.get(storageService.USER);
      setUser(data);
      setLoading(false);
    };

    onMount();
  }, []);

  const data = {
    user,
    setUser,
    loading,
  };

  return (
    <AuthenticationContext.Provider value={data}>
      {children}
    </AuthenticationContext.Provider>
  );
};
