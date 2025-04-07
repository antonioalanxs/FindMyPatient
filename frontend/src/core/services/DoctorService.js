import { axiosInstance } from "@/core/services/AxiosService";

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
}

export const doctorService = DoctorService.instance;
