import { render } from "@testing-library/react";

import { AuthenticationProvider } from "@/core/contexts/AuthenticationContext";
import { MemoryRouter } from "react-router-dom";

/**
 * Renders a component with all necessary elements.
 *
 * @param {ReactNode} component - The component to render.
 *
 * @returns {ReactNode} - The component.
 */
export const customRender = (component) => {
  return render(
    <AuthenticationProvider
      value={{
        user: {},
        setUser: () => {},
      }}
    >
      <MemoryRouter>{component}</MemoryRouter>
    </AuthenticationProvider>
  );
};
