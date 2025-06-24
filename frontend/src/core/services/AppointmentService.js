import { axiosInstance } from "@/core/services/AxiosService";
import {
  PAGINATION_PAGE_SIZE_PARAMETER,
  PAGINATION_PARAMETER,
  SEARCH_PARAMETER,
} from "@/core/constants/api";
import { DEFAULT_PAGINATION_SIZE } from "@/core/constants/default";

class AppointmentService {
  static instance = new AppointmentService();

  _prefix = "/appointments";

  constructor() {
    if (AppointmentService.instance) {
      return AppointmentService.instance;
    }

    AppointmentService.instance = this;
  }

  request = (data) => {
    return axiosInstance.post(`${this._prefix}/`, data);
  };

  appointments = (query, page, pageSize = DEFAULT_PAGINATION_SIZE) => {
    return axiosInstance.get(
      `${this._prefix}/?${SEARCH_PARAMETER}=${query}&${PAGINATION_PARAMETER}=${page}&${PAGINATION_PAGE_SIZE_PARAMETER}=${pageSize}`
    );
  };

  appointmentsByPatient = (
    id,
    query,
    page,
    pageSize = DEFAULT_PAGINATION_SIZE
  ) => {
    return axiosInstance.get(
      `${this._prefix}/patients/${id}/?${SEARCH_PARAMETER}=${query}&${PAGINATION_PARAMETER}=${page}&${PAGINATION_PAGE_SIZE_PARAMETER}=${pageSize}`
    );
  };

  cancel = (id) => {
    return axiosInstance.patch(`${this._prefix}/${id}/cancellation`);
  };

  calendar = () => {
    return axiosInstance.get(`${this._prefix}/calendar`);
  };
}

export const appointmentService = AppointmentService.instance;
