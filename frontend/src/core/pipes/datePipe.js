import { DEFAULT_VALUE } from "@/core/constants/api";

class DatePipe {
  static instance = new DatePipe();

  constructor() {
    if (DatePipe.instance) {
      return DatePipe.instance;
    }

    this.OPTIONS = {
      BACKEND: "backend",
      NUMERIC: "numeric",
      SHORT: "short",
      MEDIUM: "medium",
    };

    this.PIPES = {
      [this.OPTIONS.BACKEND]: (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
      }, // e.g. 2022-01-01
      [this.OPTIONS.NUMERIC]: (date) =>
        new Intl.DateTimeFormat(undefined, {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(date), // e.g. 01/01/2022
      [this.OPTIONS.SHORT]: (date) =>
        new Intl.DateTimeFormat(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(date), // e.g. Jan 1, 2022
      [this.OPTIONS.MEDIUM]: (date) =>
        new Intl.DateTimeFormat(undefined, {
          month: "long",
          year: "numeric",
        }).format(date), // e.g. January 2022
    };

    DatePipe.instance = this;
  }

  transform(value, format) {
    const date = new Date(value);
    const pipe = this.PIPES[format];

    if (pipe && date.getTime()) {
      return pipe(date);
    }

    return DEFAULT_VALUE;
  }
}

export const datePipe = DatePipe.instance;
