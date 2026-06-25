import { createContext, useState, useContext, ReactNode, FC } from "react";
import type { User } from "../models/User";
type AuthResult = {
  success: boolean;
  error?: string;
};

type AuthContextType = {
  user: User;
  signUp: (email: string, password: string) => AuthResult;
  login: (email: string, password: string) => AuthResult;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const storedEmail = localStorage.getItem("currentUserEmail");
    return storedEmail ? { email: storedEmail } : null;
  });

  function signUp(email: string, password: string): AuthResult {
    const users = JSON.parse(localStorage.getItem("users") || "[]") as {
      email: string;
      password: string;
    }[];

    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email already exists" };
    }

    const newUser = { email, password };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);

    setUser({ email });

    return { success: true };
  }

  function login(email: string, password: string): AuthResult {
    const users = JSON.parse(localStorage.getItem("users") || "[]") as {
      email: string;
      password: string;
    }[];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!foundUser) {
      return { success: false, error: "Invalid email or password" };
    }

    localStorage.setItem("currentUserEmail", email);
    setUser({ email });

    return { success: true };
  }

  function logout(): void {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signUp, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  //   if (!context) {
  //     // throw new Error("useAuth must be used within an AuthProvider");
  //   }

  //   return context;
}
