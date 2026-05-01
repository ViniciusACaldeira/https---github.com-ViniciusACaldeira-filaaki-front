import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const updateUser = (data) => {
        setUser((prev) => {
            const updated = { ...prev, ...data };
            localStorage.setItem("user", JSON.stringify(updated));
            return updated;
        });
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("filaaki_usuario");

        if (storedUser) {
        setUser(JSON.parse(storedUser));
        }
    }, []);

    function login(token, usuario) {
        localStorage.setItem("filaaki_token", token);
        localStorage.setItem("filaaki_usuario", JSON.stringify(usuario));
        setUser(usuario);
    }

    function logout() {
        localStorage.removeItem("filaaki_token");
        localStorage.removeItem("filaaki_usuario");
        setUser(null);
    }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext( AuthContext );
}