import { createContext, useState } from "react";

const AuthenticationContext = createContext();
export default AuthenticationContext;

export const AuthenticationProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const data = {
    isUserAuthenticated,
    setIsUserAuthenticated,
  };

  return (
    <AuthenticationContext.Provider value={data}>
      {children}
    </AuthenticationContext.Provider>
  );
};
