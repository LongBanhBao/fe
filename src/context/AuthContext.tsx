import React, { createContext, useContext, useState } from "react";
// import { onAuthStateChanged, User } from 'firebase/auth';
// import { auth } from '../firebaseConfig';

interface User {
  name: string;
}

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
