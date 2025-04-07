import { genderPipe } from "@/core/pipes/genderPipe";
import { datePipe } from "@/core/pipes/datePipe";
import { phoneNumberPipe } from "@/core/pipes/phoneNumberPipe";
import { textPipe } from "@/core/pipes/textPipe";

class PatientAdapter {
  static instance = new PatientAdapter();

  constructor() {
    if (PatientAdapter.instance) {
      return PatientAdapter.instance;
    }

    this._KEYS = {
      date_joined: "Joined at",
      birth_date: "Date of birth",
      phone_number: "Phone",
      joined_date: "Joined at",
    };

    this._VALUES = {
      gender: (value) => genderPipe.transform(value),
      birth_date: (value) =>
        datePipe.transform(value, datePipe.OPTIONS.NUMERIC),
      date_joined: (value) => datePipe.transform(value, datePipe.OPTIONS.LONG),
      phone_number: (value) => phoneNumberPipe.transform(value),
    };

    PatientAdapter.instance = this;
  }

  _adapt(entity) {
    const result = {};

    Object.entries(entity).forEach(([key, value]) => {
      if (key === "id") {
        result[key] = value;
        return;
      }

      const newKey = this._KEYS[key] || textPipe.transform(key);
      const newValue = this._VALUES[key] ? this._VALUES[key](value) : value;

      result[newKey] = newValue;
    });

    return result;
  }

  run(input) {
    if (Array.isArray(input)) {
      return input.map((entity) => this._adapt(entity));
    }

    return this._adapt(input);
  }
}

export const patientAdapter = PatientAdapter.instance;
