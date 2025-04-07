import { textPipe } from "@/core/pipes/textPipe";

class GroupsAdapter {
  static instance = new GroupsAdapter();

  constructor() {
    if (GroupsAdapter.instance) {
      return GroupsAdapter.instance;
    }

    GroupsAdapter.instance = this;
  }

  _adapt(entity) {
    const result = {};

    Object.entries(entity).forEach(([key, value]) => {
      if (key === "id") {
        const newKey = key.toUpperCase();

        result[newKey] = value;

        return;
      }

      const newKey = textPipe.transform(key);
      const newValue = textPipe.transform(value);

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

export const groupsAdapter = GroupsAdapter.instance;
