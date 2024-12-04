import { render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

/**
 * Renders a component with all necessary elements.
 *
 * @param {ReactNode} component - The component to render.
 *
 * @returns {ReactNode} - The component.
 */
export const customRender = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};
