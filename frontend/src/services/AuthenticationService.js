import {
  axiosInstance,
  axiosInstanceWithTokens,
} from "@/services/AxiosInstanceService";
import axios from "axios";

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

  /**
   * Logs in the user.
   *
   * @param {string} username - The username.
   * @param {string} password - The password of the user.
   *
   * @returns {Promise} - The promise object representing the completion of the request.
   */
  login = ({ username, password }) => {
    return axiosInstance.post(`${this._prefix}login`, { username, password });
  };

  /**
   * Requests to reset the password. It sends an mail to the user with a reset password link.
   *
   * @param {String} mail - The mail of the user.
   *
   * @returns {Promise} - The promise object representing the completion of the request.
   */
  resetPasswordRequest = (mail) => {
    return axiosInstance.post(`${this._prefix}reset`, { email: mail });
  };

  /**
   * Checks if the reset password token is valid.
   *
   * @param {String} token - The reset password token.
   *
   * @returns {Promise} - The promise object representing the completion of the request.
   */
  isResetPasswordTokenValid = (token) => {
    return axiosInstance.get(`${this._prefix}reset/${token}`);
  };

  /**
   * Resets the password using the reset password token.
   *
   * @param {String} token - The reset password token.
   * @param {String} password - The new password.
   *
   * @returns {Promise} - The promise object representing the completion of the request.
   */
  resetPassword = (token, password) => {
    return axiosInstance.put(`${this._prefix}reset/${token}`, { password });
  };
}

export const authenticationService = AuthenticationService.instance;
