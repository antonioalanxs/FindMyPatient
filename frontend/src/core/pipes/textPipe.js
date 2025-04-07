import { DEFAULT_VALUE } from "@/core/constants/default";

class TextPipe {
  static instance = new TextPipe();

  constructor() {
    if (TextPipe.instance) {
      return TextPipe.instance;
    }

    TextPipe.instance = this;
  }

  transform(value) {
    if (value?.trim() === "") {
      return DEFAULT_VALUE;
    }

    let text = value;

    text = text?.replace(/_/g, " ");
    text = text?.charAt(0).toUpperCase() + text?.slice(1);

    return text;
  }
}

export const textPipe = TextPipe.instance;
