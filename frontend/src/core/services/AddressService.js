import { axiosInstance } from "@/core/services/AxiosService";

class AddressService {
  static instance = new AddressService();

  constructor() {
    if (AddressService.instance) {
      return AddressService.instance;
    }

    AddressService.instance = this;
  }

  address = (id) => {
    return axiosInstance.get(`/patients/${id}/address`);
  };

  update = (id, data) => {
    return axiosInstance.patch(`/patients/${id}/address`, {
      street: data.Street,
      city: data.City,
      zip_code: data["Postal code"],
      country: data.Country,
    });
  };
}

export const addressService = AddressService.instance;
