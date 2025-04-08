import { axiosInstance } from "@/core/services/AxiosService";
import {
  PAGINATION_PAGE_SIZE_PARAMETER,
  PAGINATION_PARAMETER,
  SEARCH_PARAMETER,
} from "@/core/constants/api";
import { DEFAULT_PAGINATION_SIZE } from "@/core/constants/default";

class AdministratorService {
  static instance = new AdministratorService();

  _prefix = "/administrators";

  constructor() {
    if (AdministratorService.instance) {
      return AdministratorService.instance;
    }

    AdministratorService.instance = this;
  }

  administrators = (query, page, pageSize = DEFAULT_PAGINATION_SIZE) => {
    return axiosInstance.get(
      `${this._prefix}/?${SEARCH_PARAMETER}=${query}&${PAGINATION_PARAMETER}=${page}&${PAGINATION_PAGE_SIZE_PARAMETER}=${pageSize}`
    );
  };

  create = (data) => {
    return axiosInstance.post(`${this._prefix}/`, data);
  };

  administrator = (id) => {
    return axiosInstance.get(`${this._prefix}/${id}/`);
  };
}

export const administratorService = AdministratorService.instance;
