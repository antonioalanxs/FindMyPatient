export const ROUTES = {
  REFRESH_TOKENS: "/tokens/refresh/",
  ANYWHERE: "*",
  ERROR: "/error",
  ROOT: "/",
  FLOW: {
    BASE: "/flow",
    RELATIVE: {
      LOGIN: "login",
      RESET_PASSWORD_REQUEST: "reset",
      RESET_PASSWORD: (token = ":token") => `reset/${token}`,
    },
    get LOGIN() {
      return `${this.BASE}/${this.RELATIVE.LOGIN}`;
    },
    get RESET_PASSWORD_REQUEST() {
      return `${this.BASE}/${this.RELATIVE.RESET_PASSWORD_REQUEST}`;
    },
    RESET_PASSWORD(token = ":token") {
      return `${this.BASE}/${this.RELATIVE.RESET_PASSWORD(token)}`;
    },
    get ANYWHERE() {
      return `${this.BASE}/${ROUTES.ANYWHERE}`;
    },
  },
  IN: {
    BASE: "/in",
    RELATIVE: {
      HOME: "home",
      SETTINGS: "settings",
    },
    get HOME() {
      return `${this.BASE}/${this.RELATIVE.HOME}`;
    },
    get SETTINGS() {
      return `${this.BASE}/${this.RELATIVE.SETTINGS}`;
    },
    get ANYWHERE() {
      return `${this.BASE}/${ROUTES.ANYWHERE}`;
    },
  },
};
