import { useState, useEffect, createContext, useContext } from "react";
import cookie from "js-cookie";

const authContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const isAuthenticated = token === null ? false : true;

  /* sets the cookie in the browser immediately
  a user logs in. */
  const setUserAuthInfo = (data) => {
    cookie.set("authToken", data, { expires: 24 });
    setToken(data);
  };

  const logout = () => {
    cookie.remove("authToken");
    setToken("");
  };

  /* This is used to avoid hydration error.
  it sets the initial token  to the the value of the cookie.
  if you set it directly when defining the useState hook. you'd get 
  a hydration error */
  useEffect(() => setToken(cookie.get("authToken")), []);

  return (
    <authContext.Provider
      value={{
        token,
        setToken,
        setUserAuthInfo,
        logout,
        isAuthenticated,
        loading,
        setLoading,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
export default AuthContextProvider;
