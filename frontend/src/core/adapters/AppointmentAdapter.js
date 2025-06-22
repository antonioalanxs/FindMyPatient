import { textPipe } from "@/core/pipes/textPipe";

class AppointmentAdapter {
  static instance = new AppointmentAdapter();

  constructor() {
    if (AppointmentAdapter.instance) {
      return AppointmentAdapter.instance;
    }

    AppointmentAdapter.instance = this;
  }

  _adapt(entity) {
    const result = {};

    Object.entries(entity).forEach(([key, value]) => {
      const newKey = key === "id" ? key : textPipe.transform(key);

      const newValue =
        key === "status"
          ? `<span class="py-1 px-2 badge bg-${
              value === "cancelled"
                ? "danger"
                : "scheduled"
                ? "success"
                : "secondary"
            } rounded-pill">${textPipe.transform(value)}</span>`
          : value;

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

export const appointmentAdapter = AppointmentAdapter.instance;
