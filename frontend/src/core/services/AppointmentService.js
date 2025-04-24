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
    return axiosInstance.post(`${this._prefix}/request`, data);
  };
}

export const appointmentService = AppointmentService.instance;
