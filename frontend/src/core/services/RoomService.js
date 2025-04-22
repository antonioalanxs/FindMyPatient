import { axiosInstance } from "@/core/services/AxiosService";
import {
  PAGINATION_PAGE_SIZE_PARAMETER,
  PAGINATION_PARAMETER,
  SEARCH_PARAMETER,
} from "@/core/constants/api";
import { DEFAULT_PAGINATION_SIZE } from "@/core/constants/default";

class RoomService {
  static instance = new RoomService();

  _prefix = "/rooms";

  constructor() {
    if (RoomService.instance) {
      return RoomService.instance;
    }

    RoomService.instance = this;
  }

  rooms = (query, page, pageSize = DEFAULT_PAGINATION_SIZE) => {
    return axiosInstance.get(
      `${this._prefix}/?${SEARCH_PARAMETER}=${query}&${PAGINATION_PARAMETER}=${page}&${PAGINATION_PAGE_SIZE_PARAMETER}=${pageSize}`
    );
  };

  destroy = (id) => {
    return axiosInstance.delete(`${this._prefix}/${id}/`);
  };

  room = (id) => {
    return axiosInstance.get(`${this._prefix}/${id}/`);
  };
}

export const roomService = RoomService.instance;
