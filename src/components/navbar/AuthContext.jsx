import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleAuth = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
