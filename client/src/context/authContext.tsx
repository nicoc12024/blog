import { createContext, useState, useEffect, ReactNode } from "react";
import { makeRequest } from "../axiosBaseUrl";

interface LoginInputs {
  username: string;
  password: string;
}

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContext {
  currentUser: User | null;
  login: (inputs: LoginInputs) => Promise<void>;
  logout: () => Promise<void>;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContext | null>(null);

export const AuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const login = async (inputs: LoginInputs) => {
    const res = await makeRequest.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await makeRequest.post("/auth/logout");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
