import Cookies from "js-cookie";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

import { IUser } from "@/types.ts";
import { baseAxios } from "@/utils/axios.ts";

interface AuthContext {
  userLoading: boolean;
  setBearerToken: (token: string) => void;
  user: IUser | null;
  checkUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string>(Cookies.get("token") || "");
  const [userLoading, setUserLoading] = useState<boolean>(true);

  const setBearerToken = (token: string): void => {
    setToken(token);
    if (token) {
      Cookies.set("token", token, {
        expires: 1 / 24,
        secure: process.env.NODE_ENV === "production",
      });
    } else {
      Cookies.remove("token");
      setUser(null);
    }
  };

  const checkUser = async (): Promise<void> => {
    try {
      const user = await baseAxios.get("/users/info");
      setUser(user.data);
    } catch (error: any) {
      console.error(error.response.data.message);
      setUser(null);
      setBearerToken("");
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    token
      ? (baseAxios.defaults.headers.Authorization = `Bearer ${token}`)
      : delete baseAxios.defaults.headers.Authorization;
  }, [token]);

  useEffect(() => {
    if (token) {
      checkUser();
    } else {
      setUserLoading(false);
    }
  }, [pathname, token]);

  const values = {
    user,
    setBearerToken,
    userLoading,
    checkUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
