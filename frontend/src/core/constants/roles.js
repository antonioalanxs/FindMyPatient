export const ROLES = Object.fromEntries(
  import.meta.env.VITE_ROLES.split(",").map((role) => [
    role.toUpperCase(),
    role,
  ])
);
