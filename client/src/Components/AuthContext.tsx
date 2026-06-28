import { createContext, useState, useContext, ReactNode, FC } from "react";
import type { User } from "../models/User";
type AuthResult = {
  success: boolean;
  error?: string;
};

type AuthContextType = {
  user: User | null;
  signUp: (email: string, password: string) => AuthResult;
  login: (email: string, password: string) => AuthResult;
  logout: () => void;
};

// export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  function signUp(username: string, email: string, password: string) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email already exists" };
    }

    const newUser = { username, email, password };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);

    setUser({ email });
    return { success: true };
  }

  function login(username: string, password: string): AuthResult {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = users.find(
      (u: User) => u.username === username && u.password === password,
    );

    if (!foundUser) {
      return { success: false, error: "Invalid username or password" };
    }

    localStorage.setItem("currentUserEmail", username);
    setUser(foundUser);

    return { success: true };
  }

  function logout() {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signUp, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}
