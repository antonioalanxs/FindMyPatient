import { render } from "@testing-library/react";

import { IonReactMemoryRouter } from "@ionic/react-router";

/**
 * Renders a component with all necessary elements.
 *
 * @param {ReactNode} component - The component to render.
 *
 * @returns {ReactNode} - The component.
 */
export const customRender = (component) => {
  return render(<IonReactMemoryRouter>{component}</IonReactMemoryRouter>);
};
