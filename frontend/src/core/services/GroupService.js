import { axiosInstance } from "@/core/services/AxiosService";
import {
  PAGINATION_PAGE_SIZE_PARAMETER,
  PAGINATION_PARAMETER,
  SEARCH_PARAMETER,
} from "@/core/constants/api";
import { DEFAULT_PAGINATION_SIZE } from "@/core/constants/default";

class GroupService {
  static instance = new GroupService();

  _prefix = "/groups";

  constructor() {
    if (GroupService.instance) {
      return GroupService.instance;
    }

    GroupService.instance = this;
  }

  groups = (query, page, pageSize = DEFAULT_PAGINATION_SIZE) => {
    return axiosInstance.get(
      `${this._prefix}/?${SEARCH_PARAMETER}=${query}&${PAGINATION_PARAMETER}=${page}&${PAGINATION_PAGE_SIZE_PARAMETER}=${pageSize}`
    );
  };

  group = (id) => {
    return axiosInstance.get(`${this._prefix}/${id}/`);
  };

  destroy = (id) => {
    return axiosInstance.delete(`${this._prefix}/${id}/`);
  };

  update = (id, data) => {
    return axiosInstance.patch(`${this._prefix}/${id}/`, data);
  };

  create = (data) => {
    return axiosInstance.post(`${this._prefix}/`, data);
  };
}

export const groupService = GroupService.instance;
