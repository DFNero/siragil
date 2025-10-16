import { createContext } from "react";

export type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "kasir";
};

export type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});
