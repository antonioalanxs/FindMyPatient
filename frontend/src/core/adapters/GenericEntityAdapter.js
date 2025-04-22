import { textPipe } from "@/core/pipes/textPipe";

class GenericEntityAdapter {
  static instance = new GenericEntityAdapter();

  constructor() {
    if (GenericEntityAdapter.instance) {
      return GenericEntityAdapter.instance;
    }

    GenericEntityAdapter.instance = this;
  }

  _adapt(entity) {
    const result = {};

    Object.entries(entity).forEach(([key, value]) => {
      const newKey = key === "id" ? key : textPipe.transform(key);
      const newValue = value;

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

export const genericEntityAdapter = GenericEntityAdapter.instance;
