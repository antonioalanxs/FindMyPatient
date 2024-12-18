import {
  axiosInstance,
  axiosInstanceWithTokens,
} from "@/core/services/AxiosInstanceService";

/**
 * Authentication service. It is used to related operations with the authentication.
 *
 * This class is a singleton, so it should be instantiated only once.
 *
 * @class
 * @category Services
 * @subcategory AuthenticationService
 */
class AuthenticationService {
  static instance = new AuthenticationService();

  _prefix = "/authentication/";

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
    return axiosInstanceWithTokens.post(`${this._prefix}logout`);
  };

  changePassword = ({ old_password, new_password }) => {
    return axiosInstanceWithTokens.put(`${this._prefix}password`, {
      old_password,
      new_password,
    });
  };
}

export const authenticationService = AuthenticationService.instance;
