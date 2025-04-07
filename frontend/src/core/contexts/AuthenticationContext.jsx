import { createContext, useState, useEffect } from "react";

import { storageService } from "@/core/services/StorageService/StorageService";

const AuthenticationContext = createContext();

export default AuthenticationContext;

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onMount = async () => {
      const data = await storageService.get(storageService.USER);
      setUser(data);
      setLoading(false);
    };

    onMount();
  }, []);

  const data = {
    user,
    setUser,
    loading,
  };

  return (
    <AuthenticationContext.Provider value={data}>
      {children}
    </AuthenticationContext.Provider>
  );
};
