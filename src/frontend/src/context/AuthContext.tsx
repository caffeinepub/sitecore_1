import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User } from "../types";

interface AuthContextType {
  userId: string | null;
  user: User | null;
  language: string;
  setUser: (user: User | null) => void;
  setUserId: (id: string | null) => void;
  setLanguage: (lang: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserIdState] = useState<string | null>(() =>
    localStorage.getItem("sc_userId"),
  );
  const [user, setUserState] = useState<User | null>(() => {
    const s = localStorage.getItem("sc_user");
    return s ? JSON.parse(s) : null;
  });
  const [language, setLanguageState] = useState(
    () => localStorage.getItem("sc_lang") || "tr",
  );

  const setUser = (u: User | null) => {
    setUserState(u);
    if (u) localStorage.setItem("sc_user", JSON.stringify(u));
    else localStorage.removeItem("sc_user");
  };

  const setUserId = (id: string | null) => {
    setUserIdState(id);
    if (id) localStorage.setItem("sc_userId", id);
    else localStorage.removeItem("sc_userId");
  };

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem("sc_lang", lang);
  };

  const logout = () => {
    setUserState(null);
    setUserIdState(null);
    localStorage.removeItem("sc_user");
    localStorage.removeItem("sc_userId");
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        user,
        language,
        setUser,
        setUserId,
        setLanguage,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
