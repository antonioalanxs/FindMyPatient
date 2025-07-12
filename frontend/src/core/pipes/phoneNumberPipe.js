import { parsePhoneNumberFromString } from "libphonenumber-js";

import { DEFAULT_VALUE } from "@/core/constants/api";

class PhoneNumberPipe {
  static instance = new PhoneNumberPipe();

  constructor() {
    if (PhoneNumberPipe.instance) {
      return PhoneNumberPipe.instance;
    }

    PhoneNumberPipe.instance = this;
  }

  transform = (value) => {
    if (!value) {
      return DEFAULT_VALUE;
    }

    const phoneNumber = parsePhoneNumberFromString(value).formatInternational();

    return phoneNumber;
  };
}

export const phoneNumberPipe = PhoneNumberPipe.instance;
