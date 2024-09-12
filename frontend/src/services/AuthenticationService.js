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

  /**
   * Logs in the user.
   *
   * @param {string} username - The username.
   * @param {string} password - The password of the user.
   *
   * @returns {Promise} - The promise object representing the completion of the request.
   */
  _login = ({ username, password }) => {
    return axiosInstance.post("/authentication/login", { username, password });
  };
}

export const authenticationService = AuthenticationService.instance;
