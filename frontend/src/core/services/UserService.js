import { axiosInstanceWithTokens } from "@/services/AxiosInstanceService";

/**
 * User service. It is used to related operations with the user.
 *
 * This class is a singleton, so it should be instantiated only once.
 *
 * @class
 * @category Services
 * @subcategory UserService
 */
class UserService {
  static instance = new UserService();

  _prefix = "/users/";

  /**
   * Change the address of the user.
   *
   * @param {String} address - The new address.
   *
   * @returns {Promise} - The promise object representing the completion of the request.
   */
  changeAddress = (address) => {
    return axiosInstanceWithTokens.patch(`${this._prefix}address`, {
      ...address,
    });
  };
}

export const userService = UserService.instance;
