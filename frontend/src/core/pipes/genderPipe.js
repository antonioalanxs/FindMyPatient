import { DEFAULT_VALUE } from "@/core/constants/api";

class GenderPipe {
  static instance = new GenderPipe();

  constructor() {
    if (GenderPipe.instance) {
      return GenderPipe.instance;
    }

    GenderPipe.instance = this;
  }

  transform = (value) => {
    if (value === "M") {
      return "Male";
    }

    if (value === "F") {
      return "Female";
    }

    return DEFAULT_VALUE;
  };
}

export const genderPipe = GenderPipe.instance;
