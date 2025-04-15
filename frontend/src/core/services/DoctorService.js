import { axiosInstance } from "@/core/services/AxiosService";
import {
  PAGINATION_PAGE_SIZE_PARAMETER,
  PAGINATION_PARAMETER,
  SEARCH_PARAMETER,
} from "@/core/constants/api";
import { DEFAULT_PAGINATION_SIZE } from "@/core/constants/default";

class DoctorService {
  static instance = new DoctorService();

  _prefix = "/doctors";

  constructor() {
    if (DoctorService.instance) {
      return DoctorService.instance;
    }

    DoctorService.instance = this;
  }

  doctorsWithoutPagination = () => {
    return axiosInstance.get(`${this._prefix}/`);
  };

  update = (id, data) => {
    return axiosInstance.patch(`${this._prefix}/${id}/`, data);
  };

  doctors = (query, page, pageSize = DEFAULT_PAGINATION_SIZE) => {
    return axiosInstance.get(
      `${this._prefix}/?${SEARCH_PARAMETER}=${query}&${PAGINATION_PARAMETER}=${page}&${PAGINATION_PAGE_SIZE_PARAMETER}=${pageSize}`
    );
  };

  doctor = (id) => {
    return axiosInstance.get(`${this._prefix}/${id}/`);
  };

  patientsByDoctor = (id, query, page, pageSize = DEFAULT_PAGINATION_SIZE) =>
    axiosInstance.get(
      `${this._prefix}/${id}/patients?${SEARCH_PARAMETER}=${query}&${PAGINATION_PARAMETER}=${page}&${PAGINATION_PAGE_SIZE_PARAMETER}=${pageSize}`
    );
}

export const doctorService = DoctorService.instance;
