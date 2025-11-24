import { createContext } from "react";

export type UserRole = "admin" | "kasir" | "operator" | "owner" | "superadmin";

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: () => {},
  logout: () => {},
});

export default AuthContext;