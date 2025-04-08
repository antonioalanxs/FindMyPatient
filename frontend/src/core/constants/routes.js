const absoluteRoutes = (base, routes) =>
  Object.entries(routes).reduce((accumulator, [key, value]) => {
    accumulator[key] =
      typeof value === "function"
        ? (...args) => `${base}/${value(...args)}`
        : `${base}/${value}`;
    return accumulator;
  }, {});

const anywhere = (base) => `${base.split("/").pop()}/*`;

const createModuleRoutes = (base, routes) => ({
  BASE: base,
  RELATIVE: { ...routes },
  ABSOLUTE: { ...absoluteRoutes(base, routes) },
  ANYWHERE: anywhere(base),
});

export const ROUTES = {
  ANYWHERE: "*",
  ROOT: "/",
  ERROR: createModuleRoutes("/error", {
    403: "403",
    404: "404",
  }),

  FLOW: createModuleRoutes("/flow", {
    LOGIN: "login",
    RESET_PASSWORD_REQUEST: "reset",
    RESET_PASSWORD: (token = ":token") => `reset/${token}`,
  }),
  IN: {
    ...createModuleRoutes("/in", {
      HOME: "home",
      PROFILE: "profile",
    }),
    PATIENTS: createModuleRoutes("/in/patients", {
      DETAIL: (id = ":id") => id,
      CREATE: "new",
    }),
    GROUPS: createModuleRoutes("/in/groups", {
      DETAIL: (id = ":id") => id,
      EDIT: (id = ":id") => `${id}/edition`,
    }),
    MEDICAL_SPECIALTIES: createModuleRoutes("/in/medical-specialties", {
      DETAIL: (id = ":id") => id,
      CREATE: "new",
      EDIT: (id = ":id") => `${id}/edition`,
    }),
  },
};
