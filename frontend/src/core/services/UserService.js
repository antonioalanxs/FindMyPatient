import { axiosInstance } from "@/core/services/AxiosService";

class UserService {
  static instance = new UserService();

  _prefix = "/base/users";

  constructor() {
    if (UserService.instance) {
      return UserService.instance;
    }

    UserService.instance = this;
  }

  user = (id) => {
    return axiosInstance.get(`${this._prefix}/${id}/`);
  };

  update = (id, data) => {
    return axiosInstance.patch(`${this._prefix}/${id}/`, data);
  };
}

export const userService = UserService.instance;
