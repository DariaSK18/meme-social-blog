import { createContext, useContext, useEffect, useState } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  refreshAccessToken,
} from "../api/authApi";
import { parseJwt } from "../utils/jwt";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const data = await refreshAccessToken();
        setAccessToken(data.accessToken);

        const decoded = parseJwt(data.data.accessToken);
        setUser({ id: decoded.id });
        localStorage.setItem("accessToken", data.accessToken);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    const interval = setInterval(async () => {
      try {
        const data = await refreshAccessToken();
        setAccessToken(data.accessToken);

        const decoded = parseJwt(data.data.accessToken);
        setUser({ id: decoded.id });
        localStorage.setItem("accessToken", data.accessToken);
      } catch (err) {
        console.error(err);
        setUser(null);
        setAccessToken(null);
      }
    }, 9 * 60 * 1000);

    return () => clearInterval(interval);
  }, [accessToken]);

  // --- login ---
  async function login(email, password) {
    const data = await apiLogin(email, password);

    setAccessToken(data.accessToken);
    localStorage.setItem("accessToken", data.data.accessToken);

    const decoded = parseJwt(data.data.accessToken);
    setUser({ id: decoded.id });
  }

  // --- register ---
  async function register(username, email, password) {
    await apiRegister(username, email, password);
    const data = await apiLogin(email, password);

    setAccessToken(data.accessToken);
    localStorage.setItem("accessToken", data.accessToken);

    const decoded = parseJwt(data.data.accessToken);
    setUser({ id: decoded.id });
  }

  // --- logout ---
  async function logout() {
    await apiLogout();
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  }

  const value = {
    user,
    accessToken,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
