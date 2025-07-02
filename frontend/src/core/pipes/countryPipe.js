import { COUNTRIES } from "@/core/constants/countries";
import { DEFAULT_VALUE } from "@/core/constants/api";

class CountryPipe {
  static instance = new CountryPipe();

  constructor() {
    if (CountryPipe.instance) {
      return CountryPipe.instance;
    }

    CountryPipe.instance = this;
  }

  transform(value) {
    if (value?.trim() === "" || value === undefined) {
      return DEFAULT_VALUE;
    }

    const country = COUNTRIES.find((item) => item.value === value);
    return country ? country.label : value;
  }
}

export const countryPipe = CountryPipe.instance;
