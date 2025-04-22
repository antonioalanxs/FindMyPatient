import { axiosInstance } from "@/core/services/AxiosService";
import {
  PAGINATION_PAGE_SIZE_PARAMETER,
  PAGINATION_PARAMETER,
  SEARCH_PARAMETER,
} from "@/core/constants/api";
import { DEFAULT_PAGINATION_SIZE } from "@/core/constants/default";

class PatientService {
  static instance = new PatientService();

  _prefix = "/patients";

  constructor() {
    if (PatientService.instance) {
      return PatientService.instance;
    }

    PatientService.instance = this;
  }

  patients = (query, page, pageSize = DEFAULT_PAGINATION_SIZE) => {
    return axiosInstance.get(
      `${this._prefix}/?${SEARCH_PARAMETER}=${query}&${PAGINATION_PARAMETER}=${page}&${PAGINATION_PAGE_SIZE_PARAMETER}=${pageSize}`
    );
  };

  update = (id, data) => {
    return axiosInstance.patch(`${this._prefix}/${id}/`, data);
  };

  create = (data) => {
    return axiosInstance.post(`${this._prefix}/`, data);
  };

  patient = (id) => {
    return axiosInstance.get(`${this._prefix}/${id}/`);
  };
}

export const patientService = PatientService.instance;
