import { render } from "@testing-library/react";

import { AuthenticationProvider } from "@/contexts/AuthenticationContext";

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
        isUserAuthenticated: true,
        setIsUserAuthenticated: () => {},
      }}
    >
      {component}
    </AuthenticationProvider>
  );
};
