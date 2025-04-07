import { axiosInstance } from "@/core/services/AxiosService";

import { storageService } from "@/core/services/StorageService/StorageService";

class AuthenticationService {
  static instance = new AuthenticationService();

  _prefix = "/authentication/";

  constructor() {
    if (AuthenticationService.instance) {
      return AuthenticationService.instance;
    }

    AuthenticationService.instance = this;
  }

  refreshToken = async () => {
    const refreshToken = await storageService.get(storageService.REFRESH_TOKEN);

    return axiosInstance.post("tokens/refresh", {
      refresh: refreshToken,
    });
  };

  login = ({ username, password }) => {
    return axiosInstance.post(`${this._prefix}login`, { username, password });
  };

  resetPasswordRequest = (email) => {
    return axiosInstance.post(`${this._prefix}reset`, { email: email });
  };

  isResetPasswordTokenValid = (token) => {
    return axiosInstance.get(`${this._prefix}reset/${token}`);
  };

  resetPassword = (token, password) => {
    return axiosInstance.put(`${this._prefix}reset/${token}`, { password });
  };

  logout = () => {
    return axiosInstance.post(`${this._prefix}logout`);
  };

  changePassword = ({ old_password, new_password }) => {
    return axiosInstance.put(`${this._prefix}password`, {
      old_password,
      new_password,
    });
  };
}

export const authenticationService = AuthenticationService.instance;
