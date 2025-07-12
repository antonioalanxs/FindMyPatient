import { render } from "@testing-library/react";

import { AuthenticationProvider } from "@/core/contexts/AuthenticationContext";
import { AxiosInterceptorProvider } from "@/core/contexts/AxiosInterceptorContext";
import { MemoryRouter } from "react-router-dom";

export const customRender = (component) => {
  return render(
    <AuthenticationProvider
      value={{
        user: {},
        setUser: () => {},
      }}
    >
      <MemoryRouter>
        <AxiosInterceptorProvider>{component}</AxiosInterceptorProvider>
      </MemoryRouter>
    </AuthenticationProvider>
  );
};
